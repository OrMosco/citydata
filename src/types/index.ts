// Core types for Tel Aviv Urban Explorer

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface PedshedConfig {
  center: Coordinates;
  radius: number; // in meters
  walkTime: 5 | 10 | 15; // minutes
}

export interface LocationProfile {
  address: string;
  neighborhood: string;
  distanceToCenter: number; // km
  district: string;
}

export interface LandUseDistribution {
  residential: number;
  commercial: number;
  industrial: number;
  mixedUse: number;
  greenSpace: number;
  institutional: number;
}

export interface KeyMetrics {
  population: number;
  buildingCount: number;
  avgBuildingHeight: number;
  landUse: LandUseDistribution;
  walkabilityScore: number;
  transitScore: number;
  greenSpaceRatio: number;
}

// Urban Genome Types
export interface PSAData {
  publicSpaceArea: number; // m²
  population: number;
  psaValue: number; // m² per person
  benchmark: { min: number; max: number }; // 1-10 m²
  status: 'optimal' | 'low' | 'high';
}

export interface NDData {
  junctionCount: number;
  areaKm2: number;
  ndValue: number; // junctions per km²
  benchmark: { min: number; max: number }; // 200-400
  status: 'optimal' | 'low' | 'high';
}

export interface ADDData {
  entranceCount: number;
  averageDistance: number; // meters
  benchmark: number; // max 30m
  status: 'optimal' | 'high';
}

export interface UrbanGenomeScore {
  psa: PSAData;
  nd: NDData;
  add: ADDData;
  overallScore: number;
}

// Comparison cities
export interface CityComparison {
  city: string;
  country: string;
  urbanGenome: UrbanGenomeScore;
}

// Map layer types
export type MapStyle = 'streets' | 'light' | 'dark' | 'satellite';

export interface LayerVisibility {
  buildings: boolean;
  landUse: boolean;
  transit: boolean;
  greenSpaces: boolean;
  poi: boolean;
  demographics: boolean;
  intersections: boolean;
}

// Intersection / node types
export type IntersectionType = 'dead_end' | 'curve' | 'T_intersection' | 'cross' | 'complex';

export interface RawIntersection {
  id: string;
  coordinates: Coordinates;
  /** Number of street segments connected to this node */
  degree: number;
  streets: string[];
}

export interface Intersection extends RawIntersection {
  type: IntersectionType;
  /** Number of raw nodes that were merged into this one during deduplication */
  clusterSize: number;
}

// Building data
export interface Building {
  id: string;
  coordinates: Coordinates;
  height: number;
  floors: number;
  yearBuilt: number;
  landUse: string;
  area: number;
}

// Transit data
export interface TransitStation {
  id: string;
  name: string;
  type: 'metro' | 'bus' | 'train';
  coordinates: Coordinates;
  lines: string[];
}

// POI data
export interface PointOfInterest {
  id: string;
  name: string;
  type: string;
  coordinates: Coordinates;
}
