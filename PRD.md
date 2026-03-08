# Tel Aviv Urban Explorer - Product Requirements Document (PRD)

## 1. Executive Summary

This document outlines the product requirements for **Tel Aviv Urban Explorer**, a browser-based urban analytics and visualization platform inspired by [Morphocode Explorer](https://morphocode.com/morphocode-explorer-overview/). The application will provide interactive urban analysis tools for Tel Aviv-Yafo, enabling urban planners, designers, real estate professionals, researchers, and city agencies to conduct fast, data-driven analysis of the city's urban environment.

---

## 2. Product Overview

### 2.1 Vision
Create a world-class, browser-based urban analytics platform focused on Tel Aviv-Yafo that allows users to explore and analyze the city's urban fabric through interactive maps, data visualizations, and pedestrian-scale analysis tools.

### 2.2 Inspiration: Morphocode Explorer
Morphocode Explorer is the benchmark for this product. Key features that inspire our design include:
- **Browser-based platform** - No software installation required
- **Interactive map interface** - Drag-and-drop pedestrian shed (pedshed) tool
- **Multi-layer data visualization** - Land use, density, transit, demographics, morphology
- **Real-time analytics** - Instant updates as users interact with the map
- **Rich charting** - Area charts, histograms, donut charts, bar graphs, dot matrices
- **Contextual sidebar** - Displays relevant data and visualizations based on selected location

### 2.3 Target Users
| User Type | Primary Needs |
|-----------|---------------|
| Urban Planners | Site analysis, zoning insights, development patterns |
| Architects & Designers | Context understanding, neighborhood analysis |
| Real Estate Professionals | Location analysis, market insights, walkability scores |
| Researchers & Academics | Urban studies, data-driven research |
| Municipal Agencies | Policy planning, public engagement, decision support |
| General Public | Neighborhood exploration, civic engagement |

---

## 3. Core Features

### 3.1 Interactive Map Interface

#### 3.1.1 Base Map
- High-quality, customizable basemap centered on Tel Aviv-Yafo
- Support for multiple map styles (streets, satellite, light, dark modes)
- Smooth zoom levels from city-wide to building-level
- Hebrew and English language support for labels

#### 3.1.2 Pedestrian Shed Tool (Pedshed)
- Draggable circular analysis area
- Configurable radius (5-minute, 10-minute, 15-minute walk)
- Real-time calculation of walkable area
- Network-based walking distance (not just Euclidean)
- Instant update of all metrics when moved

### 3.2 Data Layers

| Layer | Description | Data Source |
|-------|-------------|-------------|
| **Land Use** | Residential, commercial, industrial, mixed-use zones | Tel Aviv GIS Portal |
| **Building Footprints** | All buildings with height/floor data | Tel Aviv Municipality |
| **Development Density** | FAR, building coverage, dwelling units per hectare | Calculated from open data |
| **Transit Network** | Bus routes, light rail, train stations | MTA Israel, Tel Aviv Municipality |
| **Points of Interest** | Schools, parks, shops, cafes, cultural venues | OpenStreetMap, Tel Aviv Open Data |
| **Demographics** | Population density, age distribution | CBS Israel, Tel Aviv Statistics |
| **Green Spaces** | Parks, gardens, urban nature areas | Tel Aviv Parks Authority |
| **Urban Morphology** | Block patterns, street networks, building types | Derived analysis |
| **Historical Data** | Heritage buildings, conservation areas | Tel Aviv Preservation |

### 3.3 Analytics Dashboard (Sidebar)

#### 3.3.1 Location Profile
- Address/location display
- Neighborhood name
- Distance to city center
- Administrative district

#### 3.3.2 Key Metrics Panel
- Population within pedshed
- Building count
- Average building height
- Land use breakdown (%)
- Walkability score
- Transit accessibility score
- Green space ratio

#### 3.3.3 Interactive Charts
| Chart Type | Data Displayed |
|------------|----------------|
| Donut Chart | Land use distribution |
| Bar Chart | Building height distribution |
| Histogram | Year of construction |
| Area Chart | Population density gradient |
| Dot Matrix | Amenity types and counts |

### 3.4 Comparative Analysis
- Save multiple locations for comparison
- Side-by-side metric comparison
- Export comparison reports
- Share analysis via URL

---

## 4. Technical Architecture

### 4.1 Technology Stack (Recommended)

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Mapping Engine** | **Mapbox GL JS** | Best for vector tiles, 3D buildings, high-performance rendering |
| **Frontend Framework** | React.js or Vue.js | Modern, component-based, large ecosystem |
| **Data Visualization** | D3.js | Industry standard for custom charts |
| **Geospatial Operations** | Turf.js | Client-side spatial analysis |
| **Spatial Indexing** | Kdbush | Fast nearest-neighbor queries |
| **State Management** | Redux or Zustand | Predictable state management |
| **Styling** | Tailwind CSS | Utility-first, responsive design |
| **Build Tool** | Vite | Fast development and build times |

### 4.2 Data Pipeline

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                              │
├─────────────────────────────────────────────────────────────────┤
│  Tel Aviv Open Data  │  OpenStreetMap  │  CBS Israel  │  Other │
└──────────┬────────────────────┬──────────────┬──────────────────┘
           │                    │              │
           ▼                    ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ETL PIPELINE                                │
│  • Data collection (APIs, downloads)                             │
│  • Cleaning & normalization                                      │
│  • Spatial indexing & optimization                               │
│  • Aggregation & pre-calculation                                 │
│  • Export to vector tiles                                        │
└──────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                                │
│  • Vector tiles (Mapbox format / PMTiles)                       │
│  • GeoJSON files (small datasets)                                │
│  • Pre-computed statistics JSON                                  │
└──────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BROWSER APPLICATION                            │
│  • Mapbox GL JS rendering                                        │
│  • Turf.js spatial queries                                       │
│  • D3.js visualization                                           │
│  • Real-time metric calculation                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 4.3 Data Sources - Tel Aviv Specific

| Source | URL | Data Available |
|--------|-----|----------------|
| Tel Aviv Open Data Portal | https://opendatasource.tel-aviv.gov.il/en/ | Building permits, construction, housing, demographics |
| Tel Aviv GIS Portal | https://gisn.tel-aviv.gov.il/arcgis/rest/services/OpenData | All GIS layers, map services |
| Developer API | https://opendatasource.tel-aviv.gov.il/en/Pages/developer.aspx | RESTful APIs, API keys |
| OpenStreetMap | https://www.openstreetmap.org | POIs, streets, building footprints |
| CBS Israel | https://www.cbs.gov.il | Census data, demographics, statistics |

---

## 5. Mapbox vs Leaflet Decision

### 5.1 Recommendation: **Use Mapbox GL JS**

For a Morphocode Explorer-style application, **Mapbox GL JS is strongly recommended** over Leaflet.

### 5.2 Comparison Matrix

| Feature | Mapbox GL JS | Leaflet |
|---------|--------------|---------|
| **Vector Tiles** | ✅ Native support | ❌ Plugin required |
| **3D Buildings** | ✅ Built-in | ❌ Limited/plugins |
| **Performance (large data)** | ✅ Excellent (WebGL) | ⚠️ Can be slow |
| **Real-time styling** | ✅ Dynamic | ❌ Limited |
| **Custom styling (Mapbox Studio)** | ✅ Full control | ❌ Not available |
| **Smooth animations** | ✅ 60fps | ⚠️ Can be choppy |
| **Learning curve** | ⚠️ Steeper | ✅ Easier |
| **Cost** | ⚠️ Paid (free tier available) | ✅ Free (open source) |
| **Open source** | ⚠️ Partial (license changes) | ✅ Fully open source |

### 5.3 Why Mapbox for This Project

1. **Morphocode uses Mapbox GL JS** - Following the proven approach
2. **Vector tile performance** - Essential for smooth, interactive urban analysis
3. **3D building extrusions** - Important for visualizing urban density
4. **Data-driven styling** - Color buildings/areas based on attributes
5. **Mapbox Studio** - Create custom Tel Aviv basemap styles
6. **High performance** - Required for real-time pedshed calculations

### 5.4 Account Requirements

#### Required: Mapbox Account
- **Sign up at:** https://account.mapbox.com/auth/signup/
- **Free tier includes:**
  - 50,000 map loads/month (web)
  - 50,000 geocoding requests/month
  - Mapbox Studio access
  - All GL JS features
- **What you'll need:**
  - Public access token (for client-side map rendering)
  - Secret access token (for Mapbox Studio uploads)

#### Optional: Leaflet (Fallback/Alternative)
If budget constraints require avoiding Mapbox costs:
- No account needed (fully open source)
- Use with free tile providers (OpenStreetMap, Stamen, etc.)
- Consider MapLibre GL JS (open-source Mapbox GL fork)

### 5.5 Cost Projection

| Usage Level | Monthly Map Loads | Estimated Cost |
|-------------|-------------------|----------------|
| Development | < 10,000 | $0 (free tier) |
| Soft Launch | 10,000 - 50,000 | $0 (free tier) |
| Growth | 50,000 - 100,000 | ~$250/month |
| Scale | 100,000+ | Contact Mapbox |

---

## 6. User Interface Design

### 6.1 Layout Structure

```
┌───────────────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Search Bar | Language Toggle (HE/EN) | Menu          │
├───────────────────────────────────────────────────────────────────────┤
│                              │                                        │
│                              │                                        │
│                              │      INTERACTIVE MAP                   │
│       SIDEBAR                │      - Pedshed circle                  │
│       - Location info        │      - Data layers                     │
│       - Metrics              │      - Building footprints             │
│       - Charts               │      - Transit routes                  │
│       - Layer toggles        │                                        │
│                              │                                        │
│                              │                                        │
│                              ├────────────────────────────────────────┤
│                              │  MAP CONTROLS: Zoom | Style | Layers   │
└───────────────────────────────────────────────────────────────────────┘
```

### 6.2 Design Principles
- **Clean & Minimal** - Focus on data, not UI chrome
- **Responsive** - Works on desktop, tablet, mobile
- **Accessible** - WCAG 2.1 AA compliance
- **Bilingual** - Full Hebrew and English support
- **Fast** - Sub-second response to interactions

---

## 7. Development Phases

### Phase 1: Foundation (8 weeks)
- [ ] Set up development environment
- [ ] Acquire and process core Tel Aviv datasets
- [ ] Implement basic map with Mapbox GL JS
- [ ] Create data pipeline for building footprints
- [ ] Build basic sidebar structure

### Phase 2: Core Features (10 weeks)
- [ ] Implement pedshed tool with network analysis
- [ ] Add land use layer with styling
- [ ] Build key metrics calculations
- [ ] Create interactive charts (D3.js)
- [ ] Implement transit layer

### Phase 3: Enhancement (6 weeks)
- [ ] Add additional data layers
- [ ] Implement comparative analysis
- [ ] Build export/share functionality
- [ ] Optimize performance
- [ ] Add 3D building visualization

### Phase 4: Launch (4 weeks)
- [ ] User testing and feedback
- [ ] Bug fixes and optimization
- [ ] Documentation
- [ ] Public launch
- [ ] Monitoring and analytics setup

---

## 8. Success Metrics

| Metric | Target (Year 1) |
|--------|-----------------|
| Monthly Active Users | 5,000+ |
| Average Session Duration | > 5 minutes |
| Locations Analyzed | 100,000+ |
| User Satisfaction (NPS) | > 40 |
| Page Load Time | < 3 seconds |
| Map Interaction Latency | < 100ms |

---

## 9. Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data availability | High | Engage early with Tel Aviv Municipality; use OSM as backup |
| Data quality | Medium | Implement validation pipeline; manual QA for critical layers |
| Mapbox costs | Medium | Monitor usage; implement caching; consider MapLibre fallback |
| Performance issues | High | Optimize data pipeline; use spatial indexing; lazy loading |
| Hebrew text rendering | Low | Test thoroughly; use proper RTL CSS support |

---

## 10. Appendix

### A. Technology Resources

**Mapbox:**
- Documentation: https://docs.mapbox.com/mapbox-gl-js/
- Mapbox Studio: https://studio.mapbox.com/
- Pricing: https://www.mapbox.com/pricing/

**D3.js:**
- Documentation: https://d3js.org/
- Examples: https://observablehq.com/@d3/gallery

**Turf.js:**
- Documentation: https://turfjs.org/
- API Reference: https://turfjs.org/docs/

**Tel Aviv Data:**
- Open Data Portal: https://opendatasource.tel-aviv.gov.il/en/
- GIS Services: https://gisn.tel-aviv.gov.il/arcgis/rest/services/OpenData
- Developer Docs: https://opendatasource.tel-aviv.gov.il/en/Pages/developer.aspx

### B. Morphocode Explorer Reference

The following aspects of Morphocode Explorer inform this design:
- **Technology:** Mapbox GL JS, D3.js, Choo framework, Turf.js, Kdbush
- **Design:** Clean UI, focus on data visualization, interactive exploration
- **Features:** Pedshed tool, multi-layer analysis, contextual metrics
- **Performance:** Browser-first, pre-processed data, client-side calculations

---

## 11. Summary: Required Accounts

### Must Have ✅
| Service | Purpose | Cost |
|---------|---------|------|
| **Mapbox** | Map rendering, vector tiles, styling | Free tier (50K loads/month), then pay-as-you-go |

### Nice to Have (Optional)
| Service | Purpose | Cost |
|---------|---------|------|
| **Leaflet** | No account needed | Free (open source) |
| **MapLibre GL JS** | Open-source alternative to Mapbox | Free (open source) |
| **Tel Aviv Developer API** | Higher rate limits | Free (requires registration) |

### Recommendation
**Start with Mapbox's free tier** - it provides 50,000 map loads per month which is sufficient for development and initial launch. As the application scales, evaluate costs and consider MapLibre GL JS as a cost-effective alternative if needed.

---

*Document Version: 1.0*  
*Last Updated: March 2026*  
*Author: Tel Aviv Urban Explorer Team*
