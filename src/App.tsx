import React, { useState } from 'react';
import './App.css';
import TabNavigation from './components/TabNavigation';
import type { TabType } from './components/TabNavigation';
import RecipesTab from './components/RecipesTab';
import EventsTab from './components/EventsTab';
import MapContent from './components/MapContent';
import { RecipesProvider } from './contexts/RecipesContext';
import { MapProvider } from './contexts/MapContext';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('map');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return <MapContent />;
      case 'recipes':
        return <RecipesTab />;
      case 'events':
        return <EventsTab />;
      default:
        return null;
    }
  };

  return (
    <MapProvider>
      <RecipesProvider>
        <div className="App">
          <header className="app-header">
            <h1>🌮 GastroMundo - Cultura Mexicana</h1>
            <p>Descubre restaurantes, recetas y eventos de la cultura mexicana</p>
          </header>

          <main className="app-main">
            <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />
            {renderTabContent()}
          </main>

          <footer className="app-footer">
            <p>🌮 GastroMundo - Tu guía completa de la cultura mexicana</p>
          </footer>
        </div>
      </RecipesProvider>
    </MapProvider>
  );
}

export default App;
