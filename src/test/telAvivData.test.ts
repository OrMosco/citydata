import { describe, it, expect } from 'vitest';
import { 
  TEL_AVIV_CENTER, 
  NEIGHBORHOODS, 
  TRANSIT_STATIONS,
  GREEN_SPACES,
  CITY_COMPARISONS,
  calculateDistance,
  getNeighborhoodFromCoordinates,
  generateBuildingsInArea,
  RAW_INTERSECTIONS,
  TEL_AVIV_INTERSECTIONS,
  deduplicateIntersections,
} from '../data/telAvivData';

describe('telAvivData', () => {
  describe('TEL_AVIV_CENTER', () => {
    it('should have valid Tel Aviv coordinates', () => {
      expect(TEL_AVIV_CENTER.lat).toBeCloseTo(32.0853, 2);
      expect(TEL_AVIV_CENTER.lng).toBeCloseTo(34.7818, 2);
    });
  });

  describe('NEIGHBORHOODS', () => {
    it('should have multiple neighborhoods defined', () => {
      expect(NEIGHBORHOODS.length).toBeGreaterThan(5);
    });

    it('should have valid coordinates for each neighborhood', () => {
      NEIGHBORHOODS.forEach(neighborhood => {
        expect(neighborhood.name).toBeTruthy();
        expect(neighborhood.district).toBeTruthy();
        expect(neighborhood.center.lat).toBeGreaterThan(31);
        expect(neighborhood.center.lat).toBeLessThan(33);
        expect(neighborhood.center.lng).toBeGreaterThan(34);
        expect(neighborhood.center.lng).toBeLessThan(36);
      });
    });
  });

  describe('TRANSIT_STATIONS', () => {
    it('should have transit stations defined', () => {
      expect(TRANSIT_STATIONS.length).toBeGreaterThan(5);
    });

    it('should have valid station types', () => {
      const validTypes = ['metro', 'bus', 'train'];
      TRANSIT_STATIONS.forEach(station => {
        expect(validTypes).toContain(station.type);
        expect(station.lines.length).toBeGreaterThan(0);
      });
    });
  });

  describe('GREEN_SPACES', () => {
    it('should have green spaces defined', () => {
      expect(GREEN_SPACES.length).toBeGreaterThan(0);
    });

    it('should have valid areas for each green space', () => {
      GREEN_SPACES.forEach(space => {
        expect(space.area).toBeGreaterThan(0);
        expect(space.name).toBeTruthy();
      });
    });
  });

  describe('CITY_COMPARISONS', () => {
    it('should have comparison cities defined', () => {
      expect(CITY_COMPARISONS.length).toBeGreaterThan(0);
    });

    it('should have valid Urban Genome data for each city', () => {
      CITY_COMPARISONS.forEach(city => {
        expect(city.city).toBeTruthy();
        expect(city.country).toBeTruthy();
        
        // PSA validation
        expect(city.urbanGenome.psa.psaValue).toBeGreaterThan(0);
        expect(city.urbanGenome.psa.benchmark.min).toBe(1);
        expect(city.urbanGenome.psa.benchmark.max).toBe(10);
        
        // ND validation
        expect(city.urbanGenome.nd.ndValue).toBeGreaterThan(0);
        expect(city.urbanGenome.nd.benchmark.min).toBe(200);
        expect(city.urbanGenome.nd.benchmark.max).toBe(400);
        
        // ADD validation
        expect(city.urbanGenome.add.averageDistance).toBeGreaterThan(0);
        expect(city.urbanGenome.add.benchmark).toBe(30);
        
        // Overall score
        expect(city.urbanGenome.overallScore).toBeGreaterThanOrEqual(0);
        expect(city.urbanGenome.overallScore).toBeLessThanOrEqual(100);
      });
    });
  });

  describe('calculateDistance', () => {
    it('should return 0 for same coordinates', () => {
      const distance = calculateDistance(TEL_AVIV_CENTER, TEL_AVIV_CENTER);
      expect(distance).toBe(0);
    });

    it('should calculate reasonable distance between Tel Aviv locations', () => {
      const rothschild = { lng: 34.7736, lat: 32.0636 };
      const distance = calculateDistance(TEL_AVIV_CENTER, rothschild);
      
      // Distance should be a few kilometers
      expect(distance).toBeGreaterThan(1000);
      expect(distance).toBeLessThan(10000);
    });

    it('should be symmetric', () => {
      const point1 = TEL_AVIV_CENTER;
      const point2 = { lng: 34.7700, lat: 32.0600 };
      
      const distance1 = calculateDistance(point1, point2);
      const distance2 = calculateDistance(point2, point1);
      
      expect(distance1).toBeCloseTo(distance2, 5);
    });
  });

  describe('getNeighborhoodFromCoordinates', () => {
    it('should return a neighborhood name and district', () => {
      const result = getNeighborhoodFromCoordinates(TEL_AVIV_CENTER);
      
      expect(result.name).toBeTruthy();
      expect(result.district).toBeTruthy();
    });

    it('should find Rothschild for Rothschild coordinates', () => {
      const rothschildCoords = { lng: 34.7736, lat: 32.0636 };
      const result = getNeighborhoodFromCoordinates(rothschildCoords);
      
      expect(result.name).toBe('Rothschild');
    });

    it('should find Jaffa for southern coordinates', () => {
      const jaffaCoords = { lng: 34.7525, lat: 32.0500 };
      const result = getNeighborhoodFromCoordinates(jaffaCoords);
      
      expect(result.name).toBe('Jaffa');
    });
  });

  describe('generateBuildingsInArea', () => {
    it('should generate buildings within the specified radius', () => {
      const center = TEL_AVIV_CENTER;
      const radius = 400;
      const buildings = generateBuildingsInArea(center, radius);
      
      expect(buildings.length).toBeGreaterThan(0);
      
      buildings.forEach(building => {
        const distance = calculateDistance(center, building.coordinates);
        expect(distance).toBeLessThanOrEqual(radius * 1.1); // Allow small margin
      });
    });

    it('should generate buildings with valid properties', () => {
      const buildings = generateBuildingsInArea(TEL_AVIV_CENTER, 200);
      
      buildings.forEach(building => {
        expect(building.id).toBeTruthy();
        expect(building.height).toBeGreaterThan(0);
        expect(building.floors).toBeGreaterThanOrEqual(1);
        expect(building.yearBuilt).toBeGreaterThanOrEqual(1920);
        expect(building.yearBuilt).toBeLessThanOrEqual(2020);
        expect(building.area).toBeGreaterThan(0);
        expect(building.landUse).toBeTruthy();
      });
    });
  });

  describe('RAW_INTERSECTIONS', () => {
    it('should have a meaningful number of raw nodes', () => {
      expect(RAW_INTERSECTIONS.length).toBeGreaterThan(30);
    });

    it('should include duplicate pairs (for deduplication demonstration)', () => {
      const dupIds = RAW_INTERSECTIONS.filter(n => n.id.endsWith('-dup'));
      expect(dupIds.length).toBeGreaterThanOrEqual(5);
    });

    it('should have valid Tel Aviv coordinates for every node', () => {
      RAW_INTERSECTIONS.forEach(node => {
        expect(node.coordinates.lat).toBeGreaterThan(32.04);
        expect(node.coordinates.lat).toBeLessThan(32.15);
        expect(node.coordinates.lng).toBeGreaterThan(34.74);
        expect(node.coordinates.lng).toBeLessThan(34.82);
        expect(node.degree).toBeGreaterThanOrEqual(1);
        expect(node.streets.length).toBeGreaterThanOrEqual(1);
      });
    });
  });

  describe('deduplicateIntersections', () => {
    it('should merge nodes that are within the tolerance', () => {
      const nodes = [
        { id: 'a', coordinates: { lng: 34.770, lat: 32.080 }, degree: 3, streets: ['Street A'] },
        // 8 m away from 'a' – should be merged
        { id: 'b', coordinates: { lng: 34.7701, lat: 32.0801 }, degree: 2, streets: ['Street B'] },
      ];
      const result = deduplicateIntersections(nodes, 15);
      expect(result.length).toBe(1);
      expect(result[0].clusterSize).toBe(2);
      expect(result[0].degree).toBe(5);
      expect(result[0].streets).toContain('Street A');
      expect(result[0].streets).toContain('Street B');
    });

    it('should not merge nodes that are farther apart than the tolerance', () => {
      const nodes = [
        { id: 'a', coordinates: { lng: 34.770, lat: 32.080 }, degree: 3, streets: ['Street A'] },
        { id: 'b', coordinates: { lng: 34.772, lat: 32.082 }, degree: 3, streets: ['Street B'] },
      ];
      const result = deduplicateIntersections(nodes, 15);
      expect(result.length).toBe(2);
      expect(result.every(n => n.clusterSize === 1)).toBe(true);
    });

    it('should deduplicate street names within a merged cluster', () => {
      const nodes = [
        { id: 'a', coordinates: { lng: 34.770, lat: 32.080 }, degree: 3, streets: ['Dizengoff', 'Gordon'] },
        { id: 'b', coordinates: { lng: 34.7701, lat: 32.0801 }, degree: 1, streets: ['Dizengoff'] },
      ];
      const result = deduplicateIntersections(nodes, 15);
      expect(result[0].streets.filter(s => s === 'Dizengoff').length).toBe(1);
    });

    it('should assign the correct intersection type after merge', () => {
      const nodes = [
        { id: 'a', coordinates: { lng: 34.770, lat: 32.080 }, degree: 2, streets: ['A'] },
        { id: 'b', coordinates: { lng: 34.7701, lat: 32.0801 }, degree: 2, streets: ['B'] },
      ];
      const [merged] = deduplicateIntersections(nodes, 15);
      expect(merged.type).toBe('cross'); // 2+2 = 4 → cross
    });
  });

  describe('TEL_AVIV_INTERSECTIONS (deduplicated)', () => {
    it('should be smaller than the raw array (duplicates removed)', () => {
      expect(TEL_AVIV_INTERSECTIONS.length).toBeLessThan(RAW_INTERSECTIONS.length);
    });

    it('every node should have a valid intersection type', () => {
      const validTypes = ['dead_end', 'curve', 'T_intersection', 'cross', 'complex'];
      TEL_AVIV_INTERSECTIONS.forEach(node => {
        expect(validTypes).toContain(node.type);
      });
    });

    it('every node should have clusterSize >= 1', () => {
      TEL_AVIV_INTERSECTIONS.forEach(node => {
        expect(node.clusterSize).toBeGreaterThanOrEqual(1);
      });
    });

    it('should include nodes representing merged duplicate pairs', () => {
      const merged = TEL_AVIV_INTERSECTIONS.filter(n => n.clusterSize > 1);
      expect(merged.length).toBeGreaterThanOrEqual(5);
    });
  });
});
