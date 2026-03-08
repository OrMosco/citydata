# Tel Aviv Urban Explorer - Product Requirements Document (PRD)

## 1. Executive Summary

This document outlines the product requirements for **Tel Aviv Urban Explorer** (also referred to as **Morphocode Explorer – Tel Aviv**), a browser-based urban analytics and visualization platform inspired by [Morphocode Explorer](https://morphocode.com/morphocode-explorer-overview/). The application serves as an **interactive urban atlas tailored for Tel Aviv**, allowing users to assess site conditions, measure key urban indicators, and perform spatial research directly in the browser. It enables urban planners, designers, real estate professionals, researchers, and city agencies to conduct fast, data-driven analysis of the city's urban environment.

### Quick Reference: Key Requirements Summary

| Category | Feature / Requirement | Description |
| :--- | :--- | :--- |
| **Product Overview** | **Core Purpose** | An interactive urban atlas tailored for Tel Aviv, allowing users to assess site conditions, measure key urban indicators, and perform spatial research directly in the browser. |
| **Target Audience** | **Primary Users** | Urban planners, real estate professionals, and Tel Aviv municipal officials. |
| **Problem Statement** | **Pain Points Addressed** | Bypassing the cognitive load of traditional GIS tools (which rely on complex checkboxes and drop-downs) to provide a simple, powerful interface for analyzing Tel Aviv's fast-changing urban landscape. |
| **Core Features & UX** | **The Interactive "Pedshed"** | A draggable "pedestrian shed" representing a 5-minute walk area. Dragging this tool across Tel Aviv updates the location and triggers real-time data calculations. |
| **Core Features & UX** | **Simplified Navigation** | The interface uses two core actions: **dragging** (to maintain control of the mapped location) and **scrolling** (to advance through associative, pre-defined data stories about the city). |
| **Core Features & UX** | **Real-Time Visualization** | Custom interactive DataViz components built with D3 calculate metrics "on the fly" as users move the pedshed around different Tel Aviv neighborhoods. |
| **Technical Architecture** | **State Management** | A Flux-style architecture manages complex UI dependencies, organizing code into data stores, view components, and a central action dispatcher. |
| **Technical Architecture** | **Custom Data Pipeline** | A custom Python pipeline processes raw spatial data into web-friendly vector map tiles. |
| **Technical Architecture** | **Optimized Vector Tiles** | The application relies on highly customized `.mvt` (Mapbox Vector Tile) formats configured to store only attributes for rapid browser analysis. |
| **Data Integration** | **Demographics & Local Data** | Demographic data is pulled from the Israel Central Bureau of Statistics (CBS). Tabular data is mapped to local statistical areas to create dot density maps showing population distribution. |
| **Thematic Map Layers** | **Urban Indicators** | Layers evaluate existing conditions such as land use, development intensity, demographics, and urban morphology. Transit network maps integrate the Tel Aviv Light Rail (Dankal) and local bus networks. |
| **Location Profiles** | **City Comparisons** | Tel Aviv can be mapped at the same scale as other cities in the Morphocode database (like NYC, Chicago, or Seattle), allowing unfamiliar conditions in Tel Aviv to be understood by comparing them to familiar situations elsewhere. |

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
| Real Estate Professionals | Location analysis, market insights, walkability scores |
| Tel Aviv Municipal Officials | Policy planning, public engagement, decision support |
| Architects & Designers | Context understanding, neighborhood analysis |
| Researchers & Academics | Urban studies, data-driven research |
| General Public | Neighborhood exploration, civic engagement |

### 2.4 Problem Statement & Pain Points Addressed
Traditional GIS tools impose significant **cognitive load** on users through complex interfaces filled with checkboxes, drop-downs, and layered menus. Tel Aviv Urban Explorer bypasses this complexity to provide a **simple, powerful interface** for analyzing Tel Aviv's fast-changing urban landscape. By replacing traditional GIS navigation with intuitive drag-and-scroll interactions, the platform democratizes urban data access for professionals and citizens alike.

---

## 3. Core Features

### 3.1 Interactive Map Interface

#### 3.1.1 Base Map
- High-quality, customizable basemap centered on Tel Aviv-Yafo
- Support for multiple map styles (streets, satellite, light, dark modes)
- Smooth zoom levels from city-wide to building-level
- Hebrew and English language support for labels

#### 3.1.2 Pedestrian Shed Tool (Pedshed) – The Interactive "Pedshed"
The pedshed is a **draggable "pedestrian shed"** representing a **5-minute walk area**. This is the core interaction tool of the platform:
- Draggable circular analysis area that users can position anywhere in Tel Aviv
- Dragging this tool across Tel Aviv updates the location and **triggers real-time data calculations**
- Configurable radius (5-minute, 10-minute, 15-minute walk)
- Real-time calculation of walkable area
- Network-based walking distance (not just Euclidean)
- Instant update of all metrics when moved

#### 3.1.3 Simplified Navigation
The interface uses **two core actions** to minimize complexity:
- **Dragging** – Maintains control of the mapped location; users drag the pedshed to explore different areas
- **Scrolling** – Advances through associative, pre-defined **data stories** about the city, revealing contextual information and visualizations

This simplified interaction model bypasses traditional GIS complexity (checkboxes, drop-downs) and provides an intuitive exploration experience.

### 3.2 Data Layers

| Layer | Description | Data Source |
|-------|-------------|-------------|
| **Land Use** | Residential, commercial, industrial, mixed-use zones | Tel Aviv GIS Portal |
| **Building Footprints** | All buildings with height/floor data | Tel Aviv Municipality |
| **Development Density** | FAR, building coverage, dwelling units per hectare | Calculated from open data |
| **Transit Network** | Bus routes, **Tel Aviv Light Rail (Dankal)**, train stations | MTA Israel, Tel Aviv Municipality, NTA |
| **Points of Interest** | Schools, parks, shops, cafes, cultural venues | OpenStreetMap, Tel Aviv Open Data |
| **Demographics** | Population density, age distribution, dot density maps | **Israel Central Bureau of Statistics (CBS)**, Tel Aviv Statistics |
| **Green Spaces** | Parks, gardens, urban nature areas | Tel Aviv Parks Authority |
| **Urban Morphology** | Block patterns, street networks, building types | Derived analysis |
| **Historical Data** | Heritage buildings, conservation areas | Tel Aviv Preservation |

#### 3.2.1 Thematic Map Layers – Urban Indicators
Layers evaluate existing conditions across multiple urban dimensions:
- **Land Use** – Zoning and current use patterns
- **Development Intensity** – FAR, coverage, height distributions
- **Demographics** – Population characteristics mapped to local statistical areas
- **Urban Morphology** – Building typologies, block structures, street networks
- **Transit Networks** – Specifically integrating the **Tel Aviv Light Rail (Dankal)** and local bus networks

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

#### 3.3.3 Real-Time Visualization & Interactive Charts
**Custom interactive DataViz components built with D3.js** calculate metrics **"on the fly"** as users move the pedshed around different Tel Aviv neighborhoods. All charts update in real-time based on the current pedshed position.

| Chart Type | Data Displayed |
|------------|----------------|
| Donut Chart | Land use distribution |
| Bar Chart | Building height distribution |
| Histogram | Year of construction |
| Area Chart | Population density gradient |
| Dot Matrix | Amenity types and counts |

### 3.4 Comparative Analysis

#### 3.4.1 Local Comparisons
- Save multiple locations within Tel Aviv for comparison
- Side-by-side metric comparison
- Export comparison reports
- Share analysis via URL

#### 3.4.2 City Comparisons – Location Profiles
Tel Aviv can be **mapped at the same scale as other cities** in the Morphocode database, enabling global urban comparison:
- Compare Tel Aviv neighborhoods to equivalent areas in **NYC, Chicago, Seattle**, and other cities
- Allows unfamiliar conditions in Tel Aviv to be understood by comparing them to familiar situations elsewhere
- Same-scale mapping ensures accurate visual and metric comparisons
- Supports cross-city benchmarking for density, walkability, and urban form

---

## 4. Technical Architecture

### 4.1 State Management – Flux-Style Architecture
The application employs a **Flux-style architecture** to manage complex UI dependencies. This pattern organizes code into three main components:
- **Data Stores** – Centralized data repositories that hold application state
- **View Components** – React/Vue components that render the UI based on store data
- **Central Action Dispatcher** – Coordinates actions and ensures predictable state updates

This architecture ensures that complex interactions (e.g., dragging the pedshed while multiple charts update simultaneously) remain performant and maintainable.

### 4.2 Technology Stack (Recommended)

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Mapping Engine** | **Mapbox GL JS** | Best for vector tiles, 3D buildings, high-performance rendering |
| **Frontend Framework** | React.js or Vue.js | Modern, component-based, large ecosystem |
| **Data Visualization** | D3.js | Industry standard for custom, real-time interactive charts |
| **Geospatial Operations** | Turf.js | Client-side spatial analysis |
| **Spatial Indexing** | Kdbush | Fast nearest-neighbor queries |
| **State Management** | Redux (Flux-style) or Zustand | Predictable state management with action dispatcher pattern |
| **Styling** | Tailwind CSS | Utility-first, responsive design |
| **Build Tool** | Vite | Fast development and build times |

### 4.3 Custom Data Pipeline (Python)

A **custom Python pipeline** processes raw spatial data into web-friendly vector map tiles. This pipeline handles:
- Data collection from multiple sources (APIs, file downloads)
- Data cleaning, normalization, and validation
- Spatial indexing and optimization
- Aggregation and pre-calculation of statistics
- Export to optimized vector tile formats

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA SOURCES                              │
├─────────────────────────────────────────────────────────────────┤
│  Tel Aviv Open Data  │  OpenStreetMap  │  CBS Israel  │  Other │
└──────────┬────────────────────┬──────────────┬──────────────────┘
           │                    │              │
           ▼                    ▼              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  PYTHON ETL PIPELINE                             │
│  • Data collection (APIs, downloads)                             │
│  • Cleaning & normalization                                      │
│  • Spatial indexing & optimization                               │
│  • Aggregation & pre-calculation                                 │
│  • Export to .mvt vector tiles                                   │
└──────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                                │
│  • Vector tiles (.mvt Mapbox Vector Tile format)                │
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

### 4.4 Optimized Vector Tiles (.mvt Format)

The application relies on highly customized **`.mvt` (Mapbox Vector Tile)** formats, configured to:
- Store only the attributes necessary for rapid browser-based analysis
- Minimize file size while maximizing query performance
- Support efficient filtering and styling in the browser
- Enable real-time data-driven visualization

### 4.5 Data Sources - Tel Aviv Specific

| Source | URL | Data Available |
|--------|-----|----------------|
| Tel Aviv Open Data Portal | https://opendatasource.tel-aviv.gov.il/en/ | Building permits, construction, housing, demographics |
| Tel Aviv GIS Portal | https://gisn.tel-aviv.gov.il/arcgis/rest/services/OpenData | All GIS layers, map services |
| Developer API | https://opendatasource.tel-aviv.gov.il/en/Pages/developer.aspx | RESTful APIs, API keys |
| OpenStreetMap | https://www.openstreetmap.org | POIs, streets, building footprints |
| **Israel Central Bureau of Statistics (CBS)** | https://www.cbs.gov.il | Census data, demographics, statistics |
| NTA Metropolitan Mass Transit System | https://www.nta.co.il | Tel Aviv Light Rail (Dankal) routes and stations |

### 4.6 Demographics & Local Data Integration

Unlike tools that use the U.S. Census API, this version pulls demographic data from the **Israel Central Bureau of Statistics (CBS)**:
- Tabular demographic data mapped to local statistical areas
- **Dot density maps** showing population distribution across Tel Aviv
- Age distribution, household composition, and socioeconomic indicators
- Regular updates aligned with CBS publication schedules

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

*Document Version: 1.1*  
*Last Updated: March 2026*  
*Author: Tel Aviv Urban Explorer Team*

---

## Changelog

### Version 1.1 (March 2026)
- Added Quick Reference table aligning with Morphocode Explorer PRD format
- Enhanced Problem Statement section with cognitive load pain points
- Added Simplified Navigation section (dragging + scrolling paradigm)
- Updated State Management to specify Flux-style architecture
- Clarified Python-based custom data pipeline
- Added explicit .mvt (Mapbox Vector Tile) format specification
- Enhanced Demographics section with CBS Israel integration and dot density maps
- Added Tel Aviv Light Rail (Dankal) to transit network layer
- Added City Comparisons feature for cross-city benchmarking (NYC, Chicago, Seattle)
- Added NTA data source for light rail integration
