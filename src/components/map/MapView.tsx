import { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppStore } from '../../stores/appStore';
import { TEL_AVIV_CENTER, TRANSIT_STATIONS, GREEN_SPACES, POINTS_OF_INTEREST } from '../../data/telAvivData';

// Mapbox access token should be configured via environment variable VITE_MAPBOX_TOKEN
// For production, create a .env file with: VITE_MAPBOX_TOKEN=your_token_here
// Get your token at https://account.mapbox.com/
const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN || '';
if (mapboxToken) {
  mapboxgl.accessToken = mapboxToken;
}

const MAP_STYLES: Record<string, string> = {
  streets: 'mapbox://styles/mapbox/streets-v12',
  light: 'mapbox://styles/mapbox/light-v11',
  dark: 'mapbox://styles/mapbox/dark-v11',
  satellite: 'mapbox://styles/mapbox/satellite-streets-v12'
};

export function MapView() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const pedshedMarker = useRef<mapboxgl.Marker | null>(null);
  const pedshedCircle = useRef<string | null>(null);
  
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  const { pedshed, setPedshedCenter, mapStyle, layers } = useAppStore();

  // Handle marker drag
  const handleMarkerDrag = useCallback(() => {
    if (!pedshedMarker.current) return;
    const lngLat = pedshedMarker.current.getLngLat();
    setPedshedCenter({ lng: lngLat.lng, lat: lngLat.lat });
  }, [setPedshedCenter]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAP_STYLES[mapStyle],
      center: [TEL_AVIV_CENTER.lng, TEL_AVIV_CENTER.lat],
      zoom: 14,
      pitch: 45,
      bearing: -17.6
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

    map.current.on('load', () => {
      setIsMapLoaded(true);
      
      // Add 3D buildings layer
      if (map.current) {
        const style = map.current.getStyle();
        const layers = style?.layers;
        const labelLayerId = layers?.find(
          layer => layer.type === 'symbol' && layer.layout?.['text-field']
        )?.id;

        map.current.addLayer(
          {
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 12,
            paint: {
              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['get', 'height'],
                0, '#e0e7f1',
                50, '#7eb5d6',
                100, '#2d7dad',
                200, '#1a5276'
              ],
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.8
            }
          },
          labelLayerId
        );
      }
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update map style
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;
    map.current.setStyle(MAP_STYLES[mapStyle]);
  }, [mapStyle, isMapLoaded]);

  // Create and update pedshed marker and circle
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    // Create marker if it doesn't exist
    if (!pedshedMarker.current) {
      const el = document.createElement('div');
      el.className = 'pedshed-marker';
      el.innerHTML = `
        <div class="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
          <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
        </div>
      `;
      
      pedshedMarker.current = new mapboxgl.Marker({
        element: el,
        draggable: true
      })
        .setLngLat([pedshed.center.lng, pedshed.center.lat])
        .addTo(map.current);

      pedshedMarker.current.on('drag', handleMarkerDrag);
      pedshedMarker.current.on('dragend', handleMarkerDrag);
    } else {
      // Update marker position
      pedshedMarker.current.setLngLat([pedshed.center.lng, pedshed.center.lat]);
    }

    // Create or update pedshed circle
    const circleGeoJSON = createCircleGeoJSON(pedshed.center, pedshed.radius);
    
    if (map.current.getSource('pedshed-circle')) {
      (map.current.getSource('pedshed-circle') as mapboxgl.GeoJSONSource).setData(circleGeoJSON);
    } else {
      map.current.addSource('pedshed-circle', {
        type: 'geojson',
        data: circleGeoJSON
      });

      map.current.addLayer({
        id: 'pedshed-circle-fill',
        type: 'fill',
        source: 'pedshed-circle',
        paint: {
          'fill-color': '#3b82f6',
          'fill-opacity': 0.15
        }
      });

      map.current.addLayer({
        id: 'pedshed-circle-border',
        type: 'line',
        source: 'pedshed-circle',
        paint: {
          'line-color': '#3b82f6',
          'line-width': 3,
          'line-dasharray': [3, 2]
        }
      });
      
      pedshedCircle.current = 'pedshed-circle';
    }
  }, [isMapLoaded, pedshed.center, pedshed.radius, handleMarkerDrag]);

  // Add transit stations layer
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    const sourceId = 'transit-stations';
    
    if (layers.transit) {
      if (!map.current.getSource(sourceId)) {
        map.current.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: TRANSIT_STATIONS.map(station => ({
              type: 'Feature',
              properties: { 
                name: station.name, 
                type: station.type,
                lines: station.lines.join(', ')
              },
              geometry: {
                type: 'Point',
                coordinates: [station.coordinates.lng, station.coordinates.lat]
              }
            }))
          }
        });

        map.current.addLayer({
          id: 'transit-points',
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-radius': [
              'match',
              ['get', 'type'],
              'metro', 10,
              'train', 9,
              'bus', 6,
              6
            ],
            'circle-color': [
              'match',
              ['get', 'type'],
              'metro', '#ef4444',
              'train', '#8b5cf6',
              'bus', '#22c55e',
              '#6b7280'
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });

        map.current.addLayer({
          id: 'transit-labels',
          type: 'symbol',
          source: sourceId,
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 11,
            'text-offset': [0, 1.5],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': '#374151',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1
          }
        });
      }
      
      map.current.setLayoutProperty('transit-points', 'visibility', 'visible');
      map.current.setLayoutProperty('transit-labels', 'visibility', 'visible');
    } else if (map.current.getLayer('transit-points')) {
      map.current.setLayoutProperty('transit-points', 'visibility', 'none');
      map.current.setLayoutProperty('transit-labels', 'visibility', 'none');
    }
  }, [isMapLoaded, layers.transit]);

  // Add green spaces layer
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    const sourceId = 'green-spaces';
    
    if (layers.greenSpaces) {
      if (!map.current.getSource(sourceId)) {
        map.current.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: GREEN_SPACES.map((space) => ({
              type: 'Feature',
              properties: { name: space.name, area: space.area },
              geometry: {
                type: 'Point',
                coordinates: [space.coordinates.lng, space.coordinates.lat]
              }
            }))
          }
        });

        map.current.addLayer({
          id: 'green-points',
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-radius': [
              'interpolate',
              ['linear'],
              ['get', 'area'],
              20000, 15,
              100000, 25,
              350000, 40
            ],
            'circle-color': '#22c55e',
            'circle-opacity': 0.3,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#16a34a'
          }
        });
      }
      
      map.current.setLayoutProperty('green-points', 'visibility', 'visible');
    } else if (map.current.getLayer('green-points')) {
      map.current.setLayoutProperty('green-points', 'visibility', 'none');
    }
  }, [isMapLoaded, layers.greenSpaces]);

  // Add POI layer
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    const sourceId = 'poi-data';
    
    if (layers.poi) {
      if (!map.current.getSource(sourceId)) {
        map.current.addSource(sourceId, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: POINTS_OF_INTEREST.map(poi => ({
              type: 'Feature',
              properties: { name: poi.name, type: poi.type },
              geometry: {
                type: 'Point',
                coordinates: [poi.coordinates.lng, poi.coordinates.lat]
              }
            }))
          }
        });

        map.current.addLayer({
          id: 'poi-points',
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-radius': 7,
            'circle-color': [
              'match',
              ['get', 'type'],
              'culture', '#a855f7',
              'shopping', '#f97316',
              'recreation', '#06b6d4',
              'historic', '#eab308',
              'education', '#3b82f6',
              'green', '#22c55e',
              '#6b7280'
            ],
            'circle-stroke-width': 2,
            'circle-stroke-color': '#ffffff'
          }
        });

        map.current.addLayer({
          id: 'poi-labels',
          type: 'symbol',
          source: sourceId,
          layout: {
            'text-field': ['get', 'name'],
            'text-size': 10,
            'text-offset': [0, 1.2],
            'text-anchor': 'top'
          },
          paint: {
            'text-color': '#6b7280',
            'text-halo-color': '#ffffff',
            'text-halo-width': 1
          }
        });
      }
      
      map.current.setLayoutProperty('poi-points', 'visibility', 'visible');
      map.current.setLayoutProperty('poi-labels', 'visibility', 'visible');
    } else if (map.current.getLayer('poi-points')) {
      map.current.setLayoutProperty('poi-points', 'visibility', 'none');
      map.current.setLayoutProperty('poi-labels', 'visibility', 'none');
    }
  }, [isMapLoaded, layers.poi]);

  // Toggle 3D buildings
  useEffect(() => {
    if (!map.current || !isMapLoaded) return;
    
    if (map.current.getLayer('3d-buildings')) {
      map.current.setLayoutProperty(
        '3d-buildings', 
        'visibility', 
        layers.buildings ? 'visible' : 'none'
      );
    }
  }, [isMapLoaded, layers.buildings]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Map controls overlay */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-white rounded-lg shadow-lg px-3 py-2">
          <span className="text-sm font-medium text-gray-700">
            🚶 {pedshed.walkTime}-min walk ({Math.round(pedshed.radius)}m)
          </span>
        </div>
      </div>
      
      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to create a circle GeoJSON
function createCircleGeoJSON(center: { lng: number; lat: number }, radiusMeters: number) {
  const points = 64;
  const km = radiusMeters / 1000;
  const coordinates: number[][] = [];
  
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 360;
    const radians = (angle * Math.PI) / 180;
    
    const dx = km * Math.cos(radians);
    const dy = km * Math.sin(radians);
    
    const lat = center.lat + (dy / 110.574);
    const lng = center.lng + (dx / (111.320 * Math.cos(center.lat * Math.PI / 180)));
    
    coordinates.push([lng, lat]);
  }
  
  return {
    type: 'Feature' as const,
    properties: {},
    geometry: {
      type: 'Polygon' as const,
      coordinates: [coordinates]
    }
  };
}

export default MapView;
