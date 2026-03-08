// Zustand store for application state management (Flux-style architecture)
import { create } from 'zustand';
import type { 
  Coordinates, 
  PedshedConfig, 
  LocationProfile, 
  KeyMetrics, 
  UrbanGenomeScore,
  LandUseDistribution,
  MapStyle,
  LayerVisibility 
} from '../types';
import { 
  TEL_AVIV_CENTER, 
  getNeighborhoodFromCoordinates, 
  calculateDistance,
  GREEN_SPACES,
  TRANSIT_STATIONS
} from '../data/telAvivData';

interface AppState {
  // Pedshed state
  pedshed: PedshedConfig;
  setPedshedCenter: (center: Coordinates) => void;
  setPedshedRadius: (walkTime: 5 | 10 | 15) => void;
  
  // Location state
  location: LocationProfile;
  
  // Metrics state
  metrics: KeyMetrics;
  
  // Urban Genome state
  urbanGenome: UrbanGenomeScore;
  
  // Map state
  mapStyle: MapStyle;
  setMapStyle: (style: MapStyle) => void;
  
  // Layer visibility
  layers: LayerVisibility;
  toggleLayer: (layer: keyof LayerVisibility) => void;
  
  // Active view
  activeView: 'explorer' | 'urban-genome';
  setActiveView: (view: 'explorer' | 'urban-genome') => void;
  
  // Comparison mode
  comparisonCity: string | null;
  setComparisonCity: (city: string | null) => void;
  
  // Language
  language: 'en' | 'he';
  setLanguage: (lang: 'en' | 'he') => void;
}

// Walk time to radius conversion (based on average walking speed of 5 km/h)
const walkTimeToRadius = (walkTime: 5 | 10 | 15): number => {
  const walkingSpeed = 5000 / 60; // meters per minute (~83.3 m/min)
  return walkTime * walkingSpeed;
};

// Calculate metrics based on pedshed position
const calculateMetrics = (center: Coordinates, radius: number): KeyMetrics => {
  // Simulated calculations based on position
  // In production, this would query actual vector tile data
  
  const distanceFromCenter = calculateDistance(center, TEL_AVIV_CENTER);
  const isUrban = distanceFromCenter < 2000;
  
  // Population density varies by area (higher in center)
  const basePopulation = isUrban ? 8000 : 4000;
  const population = Math.floor(basePopulation * (radius / 400) * (0.8 + Math.random() * 0.4));
  
  // Building count
  const buildingCount = Math.floor((radius / 10) * (isUrban ? 1.5 : 0.8));
  
  // Average building height (higher in city center)
  const avgBuildingHeight = isUrban ? 
    Math.floor(15 + Math.random() * 20) : 
    Math.floor(8 + Math.random() * 12);
  
  // Land use distribution varies by location
  const landUse: LandUseDistribution = {
    residential: 35 + Math.floor(Math.random() * 15),
    commercial: isUrban ? 25 + Math.floor(Math.random() * 10) : 10 + Math.floor(Math.random() * 10),
    industrial: isUrban ? 5 : 15 + Math.floor(Math.random() * 10),
    mixedUse: 15 + Math.floor(Math.random() * 10),
    greenSpace: 8 + Math.floor(Math.random() * 7),
    institutional: 5 + Math.floor(Math.random() * 5)
  };
  
  // Normalize to 100%
  const total = Object.values(landUse).reduce((a, b) => a + b, 0);
  Object.keys(landUse).forEach(key => {
    landUse[key as keyof LandUseDistribution] = Math.round((landUse[key as keyof LandUseDistribution] / total) * 100);
  });
  
  // Walkability score (0-100)
  const walkabilityScore = Math.min(100, Math.floor(60 + (isUrban ? 25 : 10) + Math.random() * 15));
  
  // Transit score - based on proximity to stations
  const nearbyStations = TRANSIT_STATIONS.filter(s => 
    calculateDistance(center, s.coordinates) < radius
  ).length;
  const transitScore = Math.min(100, Math.floor(30 + nearbyStations * 15 + Math.random() * 10));
  
  // Green space ratio
  const nearbyGreenSpaces = GREEN_SPACES.filter(g => 
    calculateDistance(center, g.coordinates) < radius * 1.5
  );
  const greenSpaceRatio = Math.min(25, Math.floor(5 + nearbyGreenSpaces.length * 3 + Math.random() * 5));
  
  return {
    population,
    buildingCount,
    avgBuildingHeight,
    landUse,
    walkabilityScore,
    transitScore,
    greenSpaceRatio
  };
};

// Calculate Urban Genome scores
const calculateUrbanGenome = (center: Coordinates, radius: number): UrbanGenomeScore => {
  const areaKm2 = (Math.PI * radius * radius) / 1000000;
  const distanceFromCenter = calculateDistance(center, TEL_AVIV_CENTER);
  const isUrban = distanceFromCenter < 2000;
  
  // PSA Calculation
  const publicSpaceArea = Math.floor(
    (isUrban ? 25000 : 40000) * (radius / 400) * (0.7 + Math.random() * 0.6)
  );
  const population = Math.floor((isUrban ? 6000 : 3500) * (radius / 400) * (0.8 + Math.random() * 0.4));
  const psaValue = publicSpaceArea / population;
  
  const psa = {
    publicSpaceArea,
    population,
    psaValue: Math.round(psaValue * 10) / 10,
    benchmark: { min: 1, max: 10 },
    status: psaValue >= 1 && psaValue <= 10 ? 'optimal' as const : 
            psaValue < 1 ? 'low' as const : 'high' as const
  };
  
  // ND Calculation
  const junctionCount = Math.floor(
    (isUrban ? 350 : 200) * areaKm2 * (0.8 + Math.random() * 0.4)
  );
  const ndValue = junctionCount / areaKm2;
  
  const nd = {
    junctionCount,
    areaKm2: Math.round(areaKm2 * 100) / 100,
    ndValue: Math.round(ndValue),
    benchmark: { min: 200, max: 400 },
    status: ndValue >= 200 && ndValue <= 400 ? 'optimal' as const : 
            ndValue < 200 ? 'low' as const : 'high' as const
  };
  
  // ADD Calculation
  const entranceCount = Math.floor(
    (isUrban ? 400 : 200) * (radius / 400) * (0.7 + Math.random() * 0.6)
  );
  const averageDistance = isUrban ? 
    Math.floor(15 + Math.random() * 20) : 
    Math.floor(25 + Math.random() * 20);
  
  const add = {
    entranceCount,
    averageDistance,
    benchmark: 30,
    status: averageDistance <= 30 ? 'optimal' as const : 'high' as const
  };
  
  // Overall score calculation
  const psaScore = psa.status === 'optimal' ? 100 : 50;
  const ndScore = nd.status === 'optimal' ? 100 : nd.status === 'low' ? 40 : 60;
  const addScore = add.status === 'optimal' ? 100 : 50;
  const overallScore = Math.round((psaScore + ndScore + addScore) / 3);
  
  return { psa, nd, add, overallScore };
};

// Calculate location profile
const calculateLocation = (center: Coordinates): LocationProfile => {
  const neighborhood = getNeighborhoodFromCoordinates(center);
  const distanceToCenter = calculateDistance(center, TEL_AVIV_CENTER) / 1000;
  
  return {
    address: `${center.lat.toFixed(4)}°N, ${center.lng.toFixed(4)}°E`,
    neighborhood: neighborhood.name,
    distanceToCenter: Math.round(distanceToCenter * 10) / 10,
    district: neighborhood.district
  };
};

// Initial state
const initialCenter = TEL_AVIV_CENTER;
const initialWalkTime: 5 | 10 | 15 = 5;
const initialRadius = walkTimeToRadius(initialWalkTime);

export const useAppStore = create<AppState>((set, get) => ({
  // Pedshed
  pedshed: {
    center: initialCenter,
    radius: initialRadius,
    walkTime: initialWalkTime
  },
  
  setPedshedCenter: (center: Coordinates) => {
    const { pedshed } = get();
    const newMetrics = calculateMetrics(center, pedshed.radius);
    const newLocation = calculateLocation(center);
    const newUrbanGenome = calculateUrbanGenome(center, pedshed.radius);
    
    set({
      pedshed: { ...pedshed, center },
      metrics: newMetrics,
      location: newLocation,
      urbanGenome: newUrbanGenome
    });
  },
  
  setPedshedRadius: (walkTime: 5 | 10 | 15) => {
    const { pedshed } = get();
    const newRadius = walkTimeToRadius(walkTime);
    const newMetrics = calculateMetrics(pedshed.center, newRadius);
    const newUrbanGenome = calculateUrbanGenome(pedshed.center, newRadius);
    
    set({
      pedshed: { ...pedshed, radius: newRadius, walkTime },
      metrics: newMetrics,
      urbanGenome: newUrbanGenome
    });
  },
  
  // Location
  location: calculateLocation(initialCenter),
  
  // Metrics
  metrics: calculateMetrics(initialCenter, initialRadius),
  
  // Urban Genome
  urbanGenome: calculateUrbanGenome(initialCenter, initialRadius),
  
  // Map style
  mapStyle: 'light',
  setMapStyle: (style: MapStyle) => set({ mapStyle: style }),
  
  // Layers
  layers: {
    buildings: true,
    landUse: true,
    transit: true,
    greenSpaces: true,
    poi: false,
    demographics: false
  },
  toggleLayer: (layer: keyof LayerVisibility) => {
    const { layers } = get();
    set({ layers: { ...layers, [layer]: !layers[layer] } });
  },
  
  // Active view
  activeView: 'explorer',
  setActiveView: (view: 'explorer' | 'urban-genome') => set({ activeView: view }),
  
  // Comparison
  comparisonCity: null,
  setComparisonCity: (city: string | null) => set({ comparisonCity: city }),
  
  // Language
  language: 'en',
  setLanguage: (lang: 'en' | 'he') => set({ language: lang })
}));
