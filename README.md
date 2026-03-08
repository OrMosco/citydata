# Tel Aviv Urban Explorer

🏙️ An interactive urban analytics platform for Tel Aviv-Yafo, inspired by [Morphocode Explorer](https://morphocode.com/morphocode-explorer-overview/).

## Features

- **Interactive Map**: Mapbox GL JS with 3D buildings, transit stations, and green spaces
- **Draggable Pedshed**: Analyze walkable areas with 5/10/15 minute walk radius
- **Real-time Analytics**: Population, building counts, land use distribution
- **Urban Genome Analysis**: 
  - PSA (Public Space Allocation): 1-10 m²/person benchmark
  - ND (Network Density): 200-400 junctions/km² benchmark  
  - ADD (Average Destination Distance): ≤30m benchmark
- **City Comparisons**: Compare with NYC, Chicago, Seattle, Barcelona

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Mapbox account (free tier: 50,000 map loads/month)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/OrMosco/citydata.git
cd citydata
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your Mapbox token:
```bash
cp .env.example .env
# Edit .env and add your Mapbox access token
# Get one at https://account.mapbox.com/
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run preview` - Preview production build

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build**: Vite 7
- **Mapping**: Mapbox GL JS
- **Charts**: D3.js
- **State**: Zustand
- **Styling**: Tailwind CSS 4
- **Testing**: Vitest

## Architecture

The application follows a **Flux-style architecture** as specified in the PRD:

```
┌─────────────────────────────────────────────────────────────────┐
│  User Interaction (Drag Pedshed) → Action Dispatcher → Stores  │
│                                           ↓                     │
│                                    View Components              │
│                                    (Charts, Maps)               │
└─────────────────────────────────────────────────────────────────┘
```

## Data Sources

- **Tel Aviv Municipality** - Building permits, GIS data
- **Israel CBS** - Demographics, population
- **OpenStreetMap** - POIs, street networks
- **NTA** - Light Rail (Dankal) routes

## License

MIT
