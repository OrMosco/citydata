import { MapView } from './components/map';
import { Sidebar } from './components/sidebar';
import { UrbanGenome } from './components/urban-genome';
import { useAppStore } from './stores/appStore';
import './App.css';

function App() {
  const { activeView } = useAppStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 min-w-80 h-full flex-shrink-0">
        {activeView === 'explorer' ? <Sidebar /> : <UrbanGenome />}
      </div>
      
      {/* Map */}
      <div className="flex-1 h-full relative">
        <MapView />
      </div>
    </div>
  );
}

export default App;
