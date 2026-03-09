// Tel Aviv sample data for demonstration
// Based on real Tel Aviv urban characteristics

import type { Building, TransitStation, PointOfInterest, CityComparison, RawIntersection, Intersection, IntersectionType } from '../types';

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

// ===========================================================================
// Intersection / Node data layer
// ===========================================================================

/**
 * Classify an intersection by its node degree (number of connected street segments).
 *
 * Standard Urban-Genome / OSMnx thresholds:
 *   1 → dead end   (cul-de-sac, no outgoing connections)
 *   2 → curve      (bend or split carriageway, not a true intersection)
 *   3 → T-junction (three-way intersection)
 *   4 → cross      (four-way intersection – the most common grid type)
 *   5+ → complex   (roundabout, five-way star, etc.)
 */
function classifyIntersection(degree: number): IntersectionType {
  if (degree <= 1) return 'dead_end';
  if (degree === 2) return 'curve';
  if (degree === 3) return 'T_intersection';
  if (degree === 4) return 'cross';
  return 'complex';
}

/**
 * Deduplicate raw intersection nodes using a proximity-based merge.
 *
 * Standard approach (based on OSMnx / geospatial best practices):
 *  - Any two nodes closer than `toleranceMeters` are considered the same
 *    physical intersection (often caused by GPS drift, digitisation errors,
 *    or the way OSM encodes split carriageways).
 *  - All nodes within the tolerance bubble are merged into a single node
 *    whose position is the centroid of the cluster.
 *  - The resulting degree is the sum of the cluster members' degrees.
 *  - Duplicate street names inside a cluster are deduplicated.
 */
export function deduplicateIntersections(
  nodes: RawIntersection[],
  toleranceMeters: number = 15,
): Intersection[] {
  const visited = new Set<number>();
  const result: Intersection[] = [];

  for (let i = 0; i < nodes.length; i++) {
    if (visited.has(i)) continue;

    const cluster: RawIntersection[] = [nodes[i]];
    visited.add(i);

    for (let j = i + 1; j < nodes.length; j++) {
      if (visited.has(j)) continue;
      if (calculateDistance(nodes[i].coordinates, nodes[j].coordinates) <= toleranceMeters) {
        cluster.push(nodes[j]);
        visited.add(j);
      }
    }

    const avgLng = cluster.reduce((s, n) => s + n.coordinates.lng, 0) / cluster.length;
    const avgLat = cluster.reduce((s, n) => s + n.coordinates.lat, 0) / cluster.length;
    const degree = cluster.reduce((s, n) => s + n.degree, 0);
    const streets = [...new Set(cluster.flatMap(n => n.streets))];

    result.push({
      id: nodes[i].id,
      coordinates: { lng: avgLng, lat: avgLat },
      degree,
      type: classifyIntersection(degree),
      streets,
      clusterSize: cluster.length,
    });
  }

  return result;
}

/**
 * Raw intersection nodes for Tel Aviv.
 * Intentionally includes near-duplicate pairs to demonstrate the
 * deduplication problem (marked with a `-dup` suffix in the id).
 *
 * Coordinate system note:
 *   1° lat  ≈ 110 574 m
 *   1° lng  ≈  93 850 m  (at latitude 32 °N)
 *   15 m tolerance ≈ 0.000136° lat / 0.000160° lng
 */
export const RAW_INTERSECTIONS: RawIntersection[] = [
  // --- Jaffa ---
  { id: 'j-1', coordinates: { lng: 34.7523, lat: 32.0535 }, degree: 5, streets: ['Yefet', 'Clock Tower Square'] },
  { id: 'j-2', coordinates: { lng: 34.7550, lat: 32.0530 }, degree: 4, streets: ['Yefet', 'Beit Eshel'] },
  { id: 'j-3', coordinates: { lng: 34.7572, lat: 32.0558 }, degree: 3, streets: ['Yefet', 'Louis Pasteur'] },

  // --- Neve Tzedek ---
  { id: 'nt-1', coordinates: { lng: 34.7678, lat: 32.0587 }, degree: 3, streets: ['Shabazi', 'Pines'] },
  { id: 'nt-2', coordinates: { lng: 34.7700, lat: 32.0558 }, degree: 4, streets: ['Eilat', 'Florentin'] },

  // --- Florentin ---
  { id: 'fl-1', coordinates: { lng: 34.7718, lat: 32.0602 }, degree: 4, streets: ['Levinsky', 'HaAliyah'] },
  { id: 'fl-2', coordinates: { lng: 34.7740, lat: 32.0598 }, degree: 3, streets: ['Florentin', 'Abarbanel'] },

  // --- Allenby / Rothschild corridor ---
  { id: 'ar-1', coordinates: { lng: 34.7722, lat: 32.0631 }, degree: 4, streets: ['Rothschild', 'Allenby'] },
  { id: 'ar-2', coordinates: { lng: 34.7743, lat: 32.0635 }, degree: 4, streets: ['Rothschild', 'Herzl'] },
  { id: 'ar-3', coordinates: { lng: 34.7760, lat: 32.0638 }, degree: 3, streets: ['Rothschild', 'Shadal'] },
  { id: 'ar-4', coordinates: { lng: 34.7750, lat: 32.0655 }, degree: 4, streets: ['King George', 'Allenby'] },
  { id: 'ar-5', coordinates: { lng: 34.7704, lat: 32.0640 }, degree: 3, streets: ['Allenby', 'Nahalat Binyamin'] },
  // DUPLICATE PAIR 1 – near Rothschild/Allenby (≈12 m away from ar-1)
  { id: 'ar-1-dup', coordinates: { lng: 34.7723, lat: 32.0632 }, degree: 1, streets: ['Rothschild', 'Allenby'] },

  // --- Central / Carmel ---
  { id: 'c-1', coordinates: { lng: 34.7700, lat: 32.0670 }, degree: 4, streets: ['HaCarmel', 'King George'] },
  { id: 'c-2', coordinates: { lng: 34.7780, lat: 32.0700 }, degree: 3, streets: ['Bialik', 'Rothschild'] },
  { id: 'c-3', coordinates: { lng: 34.7793, lat: 32.0715 }, degree: 4, streets: ['Ben Tzion', 'King George'] },
  { id: 'c-4', coordinates: { lng: 34.7755, lat: 32.0740 }, degree: 3, streets: ['Marmorek', 'Dizengoff'] },
  { id: 'c-5', coordinates: { lng: 34.7800, lat: 32.0725 }, degree: 4, streets: ['HaShalom', 'Jabotinsky'] },

  // --- Dizengoff area ---
  { id: 'd-1', coordinates: { lng: 34.7737, lat: 32.0772 }, degree: 5, streets: ['Dizengoff', 'Frishman', 'Gordon'] },
  { id: 'd-2', coordinates: { lng: 34.7703, lat: 32.0805 }, degree: 4, streets: ['Ben Yehuda', 'Frishman'] },
  { id: 'd-3', coordinates: { lng: 34.7753, lat: 32.0805 }, degree: 4, streets: ['Dizengoff', 'Frishman'] },
  { id: 'd-4', coordinates: { lng: 34.7703, lat: 32.0838 }, degree: 4, streets: ['Ben Yehuda', 'Gordon'] },
  { id: 'd-5', coordinates: { lng: 34.7753, lat: 32.0838 }, degree: 4, streets: ['Dizengoff', 'Gordon'] },
  // DUPLICATE PAIR 2 – near Dizengoff Circle (≈10 m from d-1)
  { id: 'd-1-dup', coordinates: { lng: 34.7738, lat: 32.0773 }, degree: 2, streets: ['Dizengoff'] },

  // --- Ben Gurion / Rabin Square ---
  { id: 'bg-1', coordinates: { lng: 34.7670, lat: 32.0874 }, degree: 4, streets: ['HaYarkon', 'Ben Gurion'] },
  { id: 'bg-2', coordinates: { lng: 34.7700, lat: 32.0875 }, degree: 4, streets: ['Ben Yehuda', 'Ben Gurion'] },
  { id: 'bg-3', coordinates: { lng: 34.7800, lat: 32.0853 }, degree: 5, streets: ['Ibn Gvirol', 'Ben Gurion', 'Arlozorov'] },
  { id: 'bg-4', coordinates: { lng: 34.7842, lat: 32.0879 }, degree: 4, streets: ['Arlozorov', 'Ibn Gvirol'] },
  { id: 'bg-5', coordinates: { lng: 34.7753, lat: 32.0874 }, degree: 4, streets: ['Dizengoff', 'Ben Gurion'] },
  // DUPLICATE PAIR 3 – near Rabin Square (≈10 m from bg-3)
  { id: 'bg-3-dup', coordinates: { lng: 34.7801, lat: 32.0854 }, degree: 2, streets: ['Ibn Gvirol'] },

  // --- Arlozorov area ---
  { id: 'al-1', coordinates: { lng: 34.7710, lat: 32.0879 }, degree: 3, streets: ['Arlozorov', 'Ben Yehuda'] },
  { id: 'al-2', coordinates: { lng: 34.7775, lat: 32.0879 }, degree: 4, streets: ['Arlozorov', 'Dizengoff'] },
  { id: 'al-3', coordinates: { lng: 34.7850, lat: 32.0880 }, degree: 4, streets: ['Arlozorov', 'Jabotinsky'] },

  // --- North Tel Aviv ---
  { id: 'n-1', coordinates: { lng: 34.7710, lat: 32.0922 }, degree: 4, streets: ['Nordau', 'Ben Yehuda'] },
  { id: 'n-2', coordinates: { lng: 34.7842, lat: 32.0922 }, degree: 4, streets: ['Nordau', 'Ibn Gvirol'] },
  { id: 'n-3', coordinates: { lng: 34.7775, lat: 32.0944 }, degree: 4, streets: ['Basel', 'Dizengoff'] },
  { id: 'n-4', coordinates: { lng: 34.7842, lat: 32.0944 }, degree: 4, streets: ['Basel', 'Ibn Gvirol'] },
  { id: 'n-5', coordinates: { lng: 34.7920, lat: 32.0900 }, degree: 4, streets: ['HaYarkon', 'Arlozorov'] },
  // DUPLICATE PAIR 4 – near Nordau/Ibn Gvirol (≈10 m from n-2)
  { id: 'n-2-dup', coordinates: { lng: 34.7843, lat: 32.0923 }, degree: 1, streets: ['Nordau', 'Ibn Gvirol'] },

  // --- East Tel Aviv ---
  { id: 'e-1', coordinates: { lng: 34.8050, lat: 32.0567 }, degree: 3, streets: ['HaTikva', 'Kaf Tet BeNovember'] },
  { id: 'e-2', coordinates: { lng: 34.7960, lat: 32.0640 }, degree: 4, streets: ['Begin', 'Hashmonaim'] },
  { id: 'e-3', coordinates: { lng: 34.7915, lat: 32.0700 }, degree: 4, streets: ['HaShalom', 'Begin'] },
  // DUPLICATE PAIR 5 – near HaShalom/Begin (≈11 m from e-3)
  { id: 'e-3-dup', coordinates: { lng: 34.7916, lat: 32.0701 }, degree: 1, streets: ['HaShalom'] },

  // --- Ramat Aviv (far north) ---
  { id: 'ra-1', coordinates: { lng: 34.8000, lat: 32.1100 }, degree: 4, streets: ['Einstein', 'HaUniversita'] },
  { id: 'ra-2', coordinates: { lng: 34.8050, lat: 32.1050 }, degree: 3, streets: ['Rokach', 'HaUniversita'] },
  { id: 'ra-3', coordinates: { lng: 34.7950, lat: 32.1100 }, degree: 4, streets: ['Einstein', 'Namir'] },
];

/** Deduplicated Tel Aviv intersections (the clean layer shown on the map). */
export const TEL_AVIV_INTERSECTIONS: Intersection[] = deduplicateIntersections(RAW_INTERSECTIONS);
