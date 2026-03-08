import { useAppStore } from '../../stores/appStore';
import { DonutChart, BarChart } from '../charts';

export function Sidebar() {
  const { 
    location, 
    metrics, 
    pedshed, 
    setPedshedRadius,
    mapStyle,
    setMapStyle,
    layers,
    toggleLayer,
    activeView,
    setActiveView
  } = useAppStore();

  const buildingHeightData = [
    { label: '1-3', value: 25, color: '#93c5fd' },
    { label: '4-6', value: 35, color: '#60a5fa' },
    { label: '7-10', value: 25, color: '#3b82f6' },
    { label: '11-15', value: 10, color: '#2563eb' },
    { label: '15+', value: 5, color: '#1d4ed8' }
  ];

  return (
    <div className="h-full overflow-y-auto bg-white shadow-xl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🏙️</span>
          Tel Aviv Explorer
        </h1>
        <p className="text-blue-100 text-sm mt-1">Urban Analytics Platform</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveView('explorer')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeView === 'explorer' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          📊 Explorer
        </button>
        <button 
          onClick={() => setActiveView('urban-genome')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
            activeView === 'urban-genome' 
              ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
        >
          🧬 Urban Genome
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Location Profile */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📍</span> Location Profile
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Neighborhood</span>
              <span className="text-sm font-medium text-gray-800">{location.neighborhood}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">District</span>
              <span className="text-sm font-medium text-gray-800">{location.district}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">From Center</span>
              <span className="text-sm font-medium text-gray-800">{location.distanceToCenter} km</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Coordinates</span>
              <span className="text-xs font-mono text-gray-600">{location.address}</span>
            </div>
          </div>
        </section>

        {/* Walk Time Selector */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>🚶</span> Walk Time Radius
          </h2>
          <div className="flex gap-2">
            {([5, 10, 15] as const).map((time) => (
              <button
                key={time}
                onClick={() => setPedshedRadius(time)}
                className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pedshed.walkTime === time
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {time} min
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Radius: {Math.round(pedshed.radius)}m
          </p>
        </section>

        {/* Key Metrics */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📈</span> Key Metrics
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard 
              label="Population" 
              value={metrics.population.toLocaleString()} 
              icon="👥"
              color="blue"
            />
            <MetricCard 
              label="Buildings" 
              value={metrics.buildingCount.toString()} 
              icon="🏢"
              color="purple"
            />
            <MetricCard 
              label="Avg Height" 
              value={`${metrics.avgBuildingHeight}m`} 
              icon="📐"
              color="orange"
            />
            <MetricCard 
              label="Green Space" 
              value={`${metrics.greenSpaceRatio}%`} 
              icon="🌳"
              color="green"
            />
          </div>
        </section>

        {/* Score Cards */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>⭐</span> Urban Scores
          </h2>
          <div className="space-y-2">
            <ScoreBar label="Walkability" score={metrics.walkabilityScore} color="blue" />
            <ScoreBar label="Transit Access" score={metrics.transitScore} color="purple" />
            <ScoreBar label="Green Coverage" score={Math.min(100, metrics.greenSpaceRatio * 4)} color="green" />
          </div>
        </section>

        {/* Land Use Chart */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>🗺️</span> Land Use Distribution
          </h2>
          <div className="flex justify-center">
            <DonutChart data={metrics.landUse} width={180} height={180} />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <LegendItem color="#3b82f6" label="Residential" value={metrics.landUse.residential} />
            <LegendItem color="#f97316" label="Commercial" value={metrics.landUse.commercial} />
            <LegendItem color="#a855f7" label="Mixed Use" value={metrics.landUse.mixedUse} />
            <LegendItem color="#22c55e" label="Green Space" value={metrics.landUse.greenSpace} />
            <LegendItem color="#6b7280" label="Industrial" value={metrics.landUse.industrial} />
            <LegendItem color="#eab308" label="Institutional" value={metrics.landUse.institutional} />
          </div>
        </section>

        {/* Building Heights Chart */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>🏗️</span> Building Heights (floors)
          </h2>
          <div className="flex justify-center">
            <BarChart data={buildingHeightData} width={260} height={120} />
          </div>
        </section>

        {/* Map Style */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>🎨</span> Map Style
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {(['light', 'dark', 'streets', 'satellite'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setMapStyle(style)}
                className={`px-2 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                  mapStyle === style
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </section>

        {/* Layer Toggles */}
        <section>
          <h2 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span>📚</span> Data Layers
          </h2>
          <div className="space-y-2">
            <LayerToggle 
              label="3D Buildings" 
              checked={layers.buildings} 
              onChange={() => toggleLayer('buildings')}
              icon="🏢"
            />
            <LayerToggle 
              label="Transit Stations" 
              checked={layers.transit} 
              onChange={() => toggleLayer('transit')}
              icon="🚇"
            />
            <LayerToggle 
              label="Green Spaces" 
              checked={layers.greenSpaces} 
              onChange={() => toggleLayer('greenSpaces')}
              icon="🌳"
            />
            <LayerToggle 
              label="Points of Interest" 
              checked={layers.poi} 
              onChange={() => toggleLayer('poi')}
              icon="📍"
            />
          </div>
        </section>

        {/* Instructions */}
        <section className="bg-blue-50 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span>💡</span> How to Use
          </h2>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• <strong>Drag</strong> the blue marker to explore different areas</li>
            <li>• <strong>Scroll</strong> through sidebar to see data stories</li>
            <li>• Change walk time to adjust analysis area</li>
            <li>• Toggle layers to customize the map view</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

// Helper components
function MetricCard({ label, value, icon, color }: { 
  label: string; 
  value: string; 
  icon: string;
  color: 'blue' | 'purple' | 'orange' | 'green';
}) {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200',
    purple: 'from-purple-50 to-purple-100 border-purple-200',
    orange: 'from-orange-50 to-orange-100 border-orange-200',
    green: 'from-green-50 to-green-100 border-green-200'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-3`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">{icon}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  );
}

function ScoreBar({ label, score, color }: { 
  label: string; 
  score: number;
  color: 'blue' | 'purple' | 'green';
}) {
  const colorClasses = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500'
  };

  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-800">{score}/100</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

function LegendItem({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
      <span className="text-gray-600 truncate">{label}</span>
      <span className="font-medium text-gray-800 ml-auto">{value}%</span>
    </div>
  );
}

function LayerToggle({ label, checked, onChange, icon }: {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon: string;
}) {
  return (
    <label className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-sm text-gray-700">{label}</span>
      </div>
      <div 
        className={`w-10 h-5 rounded-full transition-colors ${
          checked ? 'bg-blue-600' : 'bg-gray-300'
        }`}
        onClick={onChange}
      >
        <div 
          className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform mt-0.5 ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </div>
    </label>
  );
}

export default Sidebar;
