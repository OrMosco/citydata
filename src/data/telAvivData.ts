// Tel Aviv sample data for demonstration
// Based on real Tel Aviv urban characteristics

import type { Building, TransitStation, PointOfInterest, CityComparison } from '../types';

// Tel Aviv center coordinates
export const TEL_AVIV_CENTER = {
  lng: 34.7818,
  lat: 32.0853
};

// Neighborhoods data with approximate centers
export const NEIGHBORHOODS = [
  { name: 'Rothschild', center: { lng: 34.7736, lat: 32.0636 }, district: 'Center' },
  { name: 'Neve Tzedek', center: { lng: 34.7678, lat: 32.0587 }, district: 'South' },
  { name: 'Florentin', center: { lng: 34.7700, lat: 32.0558 }, district: 'South' },
  { name: 'Old North', center: { lng: 34.7800, lat: 32.0900 }, district: 'North' },
  { name: 'Sarona', center: { lng: 34.7875, lat: 32.0722 }, district: 'Center' },
  { name: 'Jaffa', center: { lng: 34.7525, lat: 32.0500 }, district: 'South' },
  { name: 'Ramat Aviv', center: { lng: 34.8050, lat: 32.1100 }, district: 'North' },
  { name: 'HaTikva', center: { lng: 34.8050, lat: 32.0567 }, district: 'East' },
  { name: 'White City', center: { lng: 34.7750, lat: 32.0750 }, district: 'Center' },
  { name: 'Port Area', center: { lng: 34.7700, lat: 32.0950 }, district: 'North' },
];

// Generate sample buildings around a point
export function generateBuildingsInArea(center: { lng: number; lat: number }, radius: number): Building[] {
  const buildings: Building[] = [];
  const count = Math.floor(radius / 10); // Roughly one building per 10m of radius
  
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * radius;
    const offsetLng = (distance * Math.cos(angle)) / 111320;
    const offsetLat = (distance * Math.sin(angle)) / 110540;
    
    const landUseTypes = ['residential', 'commercial', 'mixed-use', 'institutional', 'green-space'];
    const landUse = landUseTypes[Math.floor(Math.random() * landUseTypes.length)];
    
    buildings.push({
      id: `building-${i}`,
      coordinates: {
        lng: center.lng + offsetLng,
        lat: center.lat + offsetLat
      },
      height: Math.floor(Math.random() * 40) + 5, // 5-45m
      floors: Math.floor(Math.random() * 12) + 1, // 1-12 floors
      yearBuilt: Math.floor(Math.random() * 100) + 1920, // 1920-2020
      landUse,
      area: Math.floor(Math.random() * 2000) + 200 // 200-2200 m²
    });
  }
  
  return buildings;
}

// Tel Aviv Light Rail (Dankal) Red Line stations
export const TRANSIT_STATIONS: TransitStation[] = [
  { id: 'lrt-1', name: 'Petah Tikva Central', type: 'metro', coordinates: { lng: 34.8850, lat: 32.0900 }, lines: ['Red'] },
  { id: 'lrt-2', name: 'Bnei Brak', type: 'metro', coordinates: { lng: 34.8350, lat: 32.0880 }, lines: ['Red'] },
  { id: 'lrt-3', name: 'Arlozorov', type: 'metro', coordinates: { lng: 34.7850, lat: 32.0880 }, lines: ['Red'] },
  { id: 'lrt-4', name: 'Carlebach', type: 'metro', coordinates: { lng: 34.7800, lat: 32.0700 }, lines: ['Red'] },
  { id: 'lrt-5', name: 'Allenby', type: 'metro', coordinates: { lng: 34.7700, lat: 32.0650 }, lines: ['Red'] },
  { id: 'lrt-6', name: 'Jaffa', type: 'metro', coordinates: { lng: 34.7550, lat: 32.0530 }, lines: ['Red'] },
  // Bus stations (sample)
  { id: 'bus-1', name: 'Dizengoff Center', type: 'bus', coordinates: { lng: 34.7750, lat: 32.0775 }, lines: ['5', '18', '25'] },
  { id: 'bus-2', name: 'Rabin Square', type: 'bus', coordinates: { lng: 34.7800, lat: 32.0850 }, lines: ['5', '25', '72'] },
  { id: 'bus-3', name: 'Rothschild', type: 'bus', coordinates: { lng: 34.7750, lat: 32.0640 }, lines: ['5', '18'] },
  // Train stations
  { id: 'train-1', name: 'Tel Aviv Savidor', type: 'train', coordinates: { lng: 34.7920, lat: 32.0900 }, lines: ['Israel Railways'] },
  { id: 'train-2', name: 'Tel Aviv HaShalom', type: 'train', coordinates: { lng: 34.7870, lat: 32.0700 }, lines: ['Israel Railways'] },
];

// Sample Points of Interest
export const POINTS_OF_INTEREST: PointOfInterest[] = [
  { id: 'poi-1', name: 'Tel Aviv Museum of Art', type: 'culture', coordinates: { lng: 34.7900, lat: 32.0775 } },
  { id: 'poi-2', name: 'Sarona Market', type: 'shopping', coordinates: { lng: 34.7870, lat: 32.0720 } },
  { id: 'poi-3', name: 'Dizengoff Center', type: 'shopping', coordinates: { lng: 34.7750, lat: 32.0775 } },
  { id: 'poi-4', name: 'Gordon Beach', type: 'recreation', coordinates: { lng: 34.7650, lat: 32.0850 } },
  { id: 'poi-5', name: 'Carmel Market', type: 'shopping', coordinates: { lng: 34.7700, lat: 32.0670 } },
  { id: 'poi-6', name: 'Habima Theatre', type: 'culture', coordinates: { lng: 34.7825, lat: 32.0740 } },
  { id: 'poi-7', name: 'Yarkon Park', type: 'green', coordinates: { lng: 34.7950, lat: 32.1000 } },
  { id: 'poi-8', name: 'Jaffa Port', type: 'historic', coordinates: { lng: 34.7500, lat: 32.0520 } },
  { id: 'poi-9', name: 'Tel Aviv University', type: 'education', coordinates: { lng: 34.8000, lat: 32.1130 } },
  { id: 'poi-10', name: 'Independence Hall', type: 'historic', coordinates: { lng: 34.7736, lat: 32.0640 } },
];

// Green spaces / Parks
export const GREEN_SPACES = [
  { name: 'Yarkon Park', coordinates: { lng: 34.7950, lat: 32.1000 }, area: 350000 },
  { name: 'Rothschild Boulevard', coordinates: { lng: 34.7736, lat: 32.0650 }, area: 45000 },
  { name: 'HaYarkon Park', coordinates: { lng: 34.7850, lat: 32.0950 }, area: 180000 },
  { name: 'Independence Park', coordinates: { lng: 34.7650, lat: 32.0900 }, area: 40000 },
  { name: 'Sarona Garden', coordinates: { lng: 34.7875, lat: 32.0725 }, area: 30000 },
  { name: 'Charles Clore Park', coordinates: { lng: 34.7600, lat: 32.0600 }, area: 55000 },
  { name: 'Meir Park', coordinates: { lng: 34.7790, lat: 32.0750 }, area: 25000 },
];

// City comparison data for Urban Genome benchmarking
export const CITY_COMPARISONS: CityComparison[] = [
  {
    city: 'Manhattan, NYC',
    country: 'USA',
    urbanGenome: {
      psa: { publicSpaceArea: 50000, population: 12000, psaValue: 4.2, benchmark: { min: 1, max: 10 }, status: 'optimal' },
      nd: { junctionCount: 380, areaKm2: 1.2, ndValue: 317, benchmark: { min: 200, max: 400 }, status: 'optimal' },
      add: { entranceCount: 450, averageDistance: 18, benchmark: 30, status: 'optimal' },
      overallScore: 85
    }
  },
  {
    city: 'Chicago Loop',
    country: 'USA',
    urbanGenome: {
      psa: { publicSpaceArea: 65000, population: 8000, psaValue: 8.1, benchmark: { min: 1, max: 10 }, status: 'optimal' },
      nd: { junctionCount: 280, areaKm2: 1.2, ndValue: 233, benchmark: { min: 200, max: 400 }, status: 'optimal' },
      add: { entranceCount: 320, averageDistance: 25, benchmark: 30, status: 'optimal' },
      overallScore: 78
    }
  },
  {
    city: 'Seattle Downtown',
    country: 'USA',
    urbanGenome: {
      psa: { publicSpaceArea: 42000, population: 6500, psaValue: 6.5, benchmark: { min: 1, max: 10 }, status: 'optimal' },
      nd: { junctionCount: 220, areaKm2: 1.2, ndValue: 183, benchmark: { min: 200, max: 400 }, status: 'low' },
      add: { entranceCount: 280, averageDistance: 32, benchmark: 30, status: 'high' },
      overallScore: 68
    }
  },
  {
    city: 'Barcelona Eixample',
    country: 'Spain',
    urbanGenome: {
      psa: { publicSpaceArea: 38000, population: 15000, psaValue: 2.5, benchmark: { min: 1, max: 10 }, status: 'optimal' },
      nd: { junctionCount: 420, areaKm2: 1.2, ndValue: 350, benchmark: { min: 200, max: 400 }, status: 'optimal' },
      add: { entranceCount: 520, averageDistance: 12, benchmark: 30, status: 'optimal' },
      overallScore: 92
    }
  }
];

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(coord1: { lng: number; lat: number }, coord2: { lng: number; lat: number }): number {
  const R = 6371000; // Earth's radius in meters
  const lat1 = coord1.lat * Math.PI / 180;
  const lat2 = coord2.lat * Math.PI / 180;
  const deltaLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const deltaLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  return R * c;
}

// Get neighborhood name from coordinates
export function getNeighborhoodFromCoordinates(coords: { lng: number; lat: number }): { name: string; district: string } {
  let closest = NEIGHBORHOODS[0];
  let minDistance = calculateDistance(coords, closest.center);
  
  for (const neighborhood of NEIGHBORHOODS) {
    const distance = calculateDistance(coords, neighborhood.center);
    if (distance < minDistance) {
      minDistance = distance;
      closest = neighborhood;
    }
  }
  
  return { name: closest.name, district: closest.district };
}
