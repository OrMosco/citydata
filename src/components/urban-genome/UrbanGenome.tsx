import { useAppStore } from '../../stores/appStore';
import { GaugeChart } from '../charts';
import { CITY_COMPARISONS } from '../../data/telAvivData';

export function UrbanGenome() {
  const { urbanGenome, comparisonCity, setComparisonCity } = useAppStore();

  const selectedComparison = CITY_COMPARISONS.find(c => c.city === comparisonCity);

  return (
    <div className="h-full overflow-y-auto bg-white shadow-xl">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-gradient-to-r from-emerald-600 to-teal-700 px-4 py-4">
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">🧬</span>
          Urban Genome Analysis
        </h1>
        <p className="text-emerald-100 text-sm mt-1">Quantitative Urbanism Assessment</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Overall Score */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 text-center">
          <h2 className="text-sm font-semibold text-gray-600 mb-2">Urban Genome Score</h2>
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="64"
                cy="64"
              />
              <circle
                className={`${
                  urbanGenome.overallScore >= 70 ? 'text-emerald-500' : 
                  urbanGenome.overallScore >= 50 ? 'text-yellow-500' : 'text-red-500'
                }`}
                strokeWidth="10"
                strokeDasharray={`${urbanGenome.overallScore * 3.14} 314`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="50"
                cx="64"
                cy="64"
              />
            </svg>
            <span className="absolute text-3xl font-bold text-gray-800">
              {urbanGenome.overallScore}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {urbanGenome.overallScore >= 80 ? '🌟 Excellent urban vitality' :
             urbanGenome.overallScore >= 60 ? '✅ Good human interaction potential' :
             '⚠️ Room for improvement'}
          </p>
        </section>

        {/* What is Urban Genome */}
        <section className="bg-blue-50 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span>ℹ️</span> What is Urban Genome?
          </h2>
          <p className="text-xs text-blue-700 leading-relaxed">
            Urban Genome is a quantitative "litmus paper test" of good urbanism. It analyzes 
            the <strong>human interaction potential</strong> of an area through three fundamental 
            parameters: public space allocation, network connectivity, and building entrance density.
          </p>
        </section>

        {/* PSA - Public Space Allocation */}
        <section className="border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <span>🏛️</span> Public Space Allocation (PSA)
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <GaugeChart
                value={urbanGenome.psa.psaValue}
                min={0}
                max={20}
                optimalMin={1}
                optimalMax={10}
                label="m² per person"
                unit="m²/person"
                status={urbanGenome.psa.status}
                width={180}
                height={120}
              />
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  {urbanGenome.psa.psaValue.toFixed(1)}
                </p>
                <p className="text-xs text-gray-500">m² per person</p>
                <StatusBadge status={urbanGenome.psa.status} />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Public Space Area</span>
                <span className="font-medium">{urbanGenome.psa.publicSpaceArea.toLocaleString()} m²</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Population</span>
                <span className="font-medium">{urbanGenome.psa.population.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Optimal Range</span>
                <span className="font-medium">1-10 m²/person</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mt-3">
              <strong>Purpose:</strong> Indicates density of people in public spaces and likelihood 
              of <em>mutual presence</em> – essential for spontaneous social interaction.
            </p>
          </div>
        </section>

        {/* ND - Network Density */}
        <section className="border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <span>🔗</span> Network Density (ND)
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <GaugeChart
                value={urbanGenome.nd.ndValue}
                min={0}
                max={600}
                optimalMin={200}
                optimalMax={400}
                label="junctions/km²"
                unit="jct/km²"
                status={urbanGenome.nd.status}
                width={180}
                height={120}
              />
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  {urbanGenome.nd.ndValue}
                </p>
                <p className="text-xs text-gray-500">junctions/km²</p>
                <StatusBadge status={urbanGenome.nd.status} />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Junction Count</span>
                <span className="font-medium">{urbanGenome.nd.junctionCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Area</span>
                <span className="font-medium">{urbanGenome.nd.areaKm2} km²</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Target Range</span>
                <span className="font-medium">200-400 jct/km²</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mt-3">
              <strong>Purpose:</strong> Higher junction density provides more route options, 
              allowing pedestrians to <em>maintain anonymity</em> while navigating public spaces.
            </p>
          </div>
        </section>

        {/* ADD - Average Destination Distance */}
        <section className="border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <span>📏</span> Average Destination Distance (ADD)
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <GaugeChart
                value={urbanGenome.add.averageDistance}
                min={0}
                max={60}
                optimalMin={0}
                optimalMax={30}
                label="meters"
                unit="m"
                status={urbanGenome.add.status}
                width={180}
                height={120}
              />
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">
                  {urbanGenome.add.averageDistance}m
                </p>
                <p className="text-xs text-gray-500">avg distance</p>
                <StatusBadge status={urbanGenome.add.status} />
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Building Entrances</span>
                <span className="font-medium">{urbanGenome.add.entranceCount}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Max Recommended</span>
                <span className="font-medium">≤ 30m</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-600 mt-3">
              <strong>Purpose:</strong> Shorter distances between entrances increase the likelihood 
              that <em>anonymity transforms into interaction</em> – neighbors greeting, vendors meeting clients.
            </p>
          </div>
        </section>

        {/* City Comparison */}
        <section className="border rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-3">
            <h2 className="text-white font-semibold flex items-center gap-2">
              <span>🏙️</span> City Comparison
            </h2>
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-600 mb-3">
              Compare your location with benchmark cities mapped at the same scale:
            </p>
            
            <select
              value={comparisonCity || ''}
              onChange={(e) => setComparisonCity(e.target.value || null)}
              className="w-full p-2 border rounded-lg text-sm mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a city to compare...</option>
              {CITY_COMPARISONS.map((city) => (
                <option key={city.city} value={city.city}>
                  {city.city}, {city.country}
                </option>
              ))}
            </select>

            {selectedComparison && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {selectedComparison.city}
                </h3>
                <div className="space-y-3">
                  <ComparisonRow
                    label="PSA"
                    localValue={urbanGenome.psa.psaValue}
                    compValue={selectedComparison.urbanGenome.psa.psaValue}
                    unit="m²/person"
                    optimal="1-10"
                  />
                  <ComparisonRow
                    label="ND"
                    localValue={urbanGenome.nd.ndValue}
                    compValue={selectedComparison.urbanGenome.nd.ndValue}
                    unit="jct/km²"
                    optimal="200-400"
                  />
                  <ComparisonRow
                    label="ADD"
                    localValue={urbanGenome.add.averageDistance}
                    compValue={selectedComparison.urbanGenome.add.averageDistance}
                    unit="m"
                    optimal="≤30"
                  />
                  <div className="pt-2 border-t">
                    <ComparisonRow
                      label="Overall"
                      localValue={urbanGenome.overallScore}
                      compValue={selectedComparison.urbanGenome.overallScore}
                      unit="pts"
                      optimal=""
                      highlight
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* How to Interpret */}
        <section className="bg-emerald-50 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-emerald-800 mb-2 flex items-center gap-2">
            <span>📖</span> How to Interpret
          </h2>
          <ul className="text-xs text-emerald-700 space-y-2">
            <li className="flex gap-2">
              <span className="text-green-500">✅</span>
              <span><strong>Optimal values</strong> indicate high human interaction potential</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500">⚠️</span>
              <span><strong>Low PSA</strong> means crowded public spaces, less comfort</span>
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500">⚠️</span>
              <span><strong>Low ND</strong> means fewer route choices, less pedestrian freedom</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">❌</span>
              <span><strong>High ADD</strong> means sparse entrances, less street activity</span>
            </li>
          </ul>
        </section>

        {/* Save & Export */}
        <section className="flex gap-3">
          <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <span>💾</span> Save Profile
          </button>
          <button className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <span>📤</span> Export
          </button>
        </section>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: 'optimal' | 'low' | 'high' }) {
  const styles = {
    optimal: 'bg-green-100 text-green-700',
    low: 'bg-orange-100 text-orange-700',
    high: 'bg-red-100 text-red-700'
  };

  const labels = {
    optimal: '✅ Optimal',
    low: '⚠️ Below target',
    high: '❌ Above target'
  };

  return (
    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function ComparisonRow({ 
  label, 
  localValue, 
  compValue, 
  unit, 
  highlight = false 
}: {
  label: string;
  localValue: number;
  compValue: number;
  unit: string;
  optimal: string;
  highlight?: boolean;
}) {
  const diff = localValue - compValue;
  const isPositive = label === 'ADD' ? diff < 0 : diff > 0;
  
  return (
    <div className={`flex items-center justify-between text-xs ${highlight ? 'text-sm font-semibold' : ''}`}>
      <span className="text-gray-600 w-16">{label}</span>
      <div className="flex items-center gap-4">
        <span className="text-gray-800 font-medium w-20 text-right">
          {typeof localValue === 'number' ? localValue.toFixed(1) : localValue} {unit}
        </span>
        <span className="text-gray-400">vs</span>
        <span className="text-gray-600 w-20">
          {typeof compValue === 'number' ? compValue.toFixed(1) : compValue} {unit}
        </span>
        <span className={`w-16 text-right ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {diff > 0 ? '+' : ''}{diff.toFixed(1)}
        </span>
      </div>
    </div>
  );
}

export default UrbanGenome;
