import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../stores/appStore';

describe('appStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useAppStore.setState({
      pedshed: {
        center: { lng: 34.7818, lat: 32.0853 },
        radius: 416.67,
        walkTime: 5
      },
      activeView: 'explorer',
      mapStyle: 'light',
      comparisonCity: null,
      language: 'en'
    });
  });

  describe('pedshed management', () => {
    it('should initialize with Tel Aviv center coordinates', () => {
      const state = useAppStore.getState();
      expect(state.pedshed.center.lat).toBeCloseTo(32.0853, 2);
      expect(state.pedshed.center.lng).toBeCloseTo(34.7818, 2);
    });

    it('should update pedshed center when setPedshedCenter is called', () => {
      const { setPedshedCenter } = useAppStore.getState();
      const newCenter = { lng: 34.7700, lat: 32.0600 };
      
      setPedshedCenter(newCenter);
      
      const state = useAppStore.getState();
      expect(state.pedshed.center.lng).toBe(newCenter.lng);
      expect(state.pedshed.center.lat).toBe(newCenter.lat);
    });

    it('should update radius when walk time changes', () => {
      const { setPedshedRadius } = useAppStore.getState();
      
      setPedshedRadius(10);
      expect(useAppStore.getState().pedshed.walkTime).toBe(10);
      expect(useAppStore.getState().pedshed.radius).toBeGreaterThan(400);

      setPedshedRadius(15);
      expect(useAppStore.getState().pedshed.walkTime).toBe(15);
      expect(useAppStore.getState().pedshed.radius).toBeGreaterThan(800);
    });
  });

  describe('metrics calculation', () => {
    it('should calculate metrics when pedshed moves', () => {
      const { setPedshedCenter } = useAppStore.getState();
      
      setPedshedCenter({ lng: 34.7736, lat: 32.0636 }); // Rothschild area
      
      const state = useAppStore.getState();
      expect(state.metrics.population).toBeGreaterThan(0);
      expect(state.metrics.buildingCount).toBeGreaterThan(0);
      expect(state.metrics.walkabilityScore).toBeGreaterThanOrEqual(0);
      expect(state.metrics.walkabilityScore).toBeLessThanOrEqual(100);
    });

    it('should have valid land use distribution totaling 100%', () => {
      const state = useAppStore.getState();
      const { landUse } = state.metrics;
      
      const total = landUse.residential + landUse.commercial + landUse.industrial + 
                   landUse.mixedUse + landUse.greenSpace + landUse.institutional;
      
      // Allow for rounding differences
      expect(total).toBeGreaterThanOrEqual(98);
      expect(total).toBeLessThanOrEqual(102);
    });
  });

  describe('urban genome calculation', () => {
    it('should calculate PSA within reasonable bounds', () => {
      const state = useAppStore.getState();
      const { psa } = state.urbanGenome;
      
      expect(psa.psaValue).toBeGreaterThan(0);
      expect(psa.publicSpaceArea).toBeGreaterThan(0);
      expect(psa.population).toBeGreaterThan(0);
      expect(psa.benchmark.min).toBe(1);
      expect(psa.benchmark.max).toBe(10);
    });

    it('should calculate ND within reasonable bounds', () => {
      const state = useAppStore.getState();
      const { nd } = state.urbanGenome;
      
      expect(nd.ndValue).toBeGreaterThan(0);
      expect(nd.junctionCount).toBeGreaterThan(0);
      expect(nd.areaKm2).toBeGreaterThan(0);
      expect(nd.benchmark.min).toBe(200);
      expect(nd.benchmark.max).toBe(400);
    });

    it('should calculate ADD within reasonable bounds', () => {
      const state = useAppStore.getState();
      const { add } = state.urbanGenome;
      
      expect(add.averageDistance).toBeGreaterThan(0);
      expect(add.entranceCount).toBeGreaterThan(0);
      expect(add.benchmark).toBe(30);
    });

    it('should calculate overall score between 0 and 100', () => {
      const state = useAppStore.getState();
      
      expect(state.urbanGenome.overallScore).toBeGreaterThanOrEqual(0);
      expect(state.urbanGenome.overallScore).toBeLessThanOrEqual(100);
    });
  });

  describe('view management', () => {
    it('should toggle between explorer and urban-genome views', () => {
      const { setActiveView } = useAppStore.getState();
      
      expect(useAppStore.getState().activeView).toBe('explorer');
      
      setActiveView('urban-genome');
      expect(useAppStore.getState().activeView).toBe('urban-genome');
      
      setActiveView('explorer');
      expect(useAppStore.getState().activeView).toBe('explorer');
    });
  });

  describe('map style management', () => {
    it('should change map style', () => {
      const { setMapStyle } = useAppStore.getState();
      
      setMapStyle('dark');
      expect(useAppStore.getState().mapStyle).toBe('dark');
      
      setMapStyle('satellite');
      expect(useAppStore.getState().mapStyle).toBe('satellite');
    });
  });

  describe('layer toggles', () => {
    it('should toggle layer visibility', () => {
      const { toggleLayer } = useAppStore.getState();
      
      const initialPoi = useAppStore.getState().layers.poi;
      toggleLayer('poi');
      expect(useAppStore.getState().layers.poi).toBe(!initialPoi);
      
      toggleLayer('poi');
      expect(useAppStore.getState().layers.poi).toBe(initialPoi);
    });
  });

  describe('city comparison', () => {
    it('should set and clear comparison city', () => {
      const { setComparisonCity } = useAppStore.getState();
      
      setComparisonCity('Manhattan, NYC');
      expect(useAppStore.getState().comparisonCity).toBe('Manhattan, NYC');
      
      setComparisonCity(null);
      expect(useAppStore.getState().comparisonCity).toBeNull();
    });
  });
});
