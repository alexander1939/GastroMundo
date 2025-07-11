import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';
import TabNavigation from './components/TabNavigation';
import type { TabType } from './components/TabNavigation';
import RecipesTab from './components/RecipesTab';
import EventsTab from './components/EventsTab';
import type { Restaurant } from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('map');
  const [currentCity, setCurrentCity] = useState('Ciudad de México');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleSearch = (city: string) => {
    setCurrentCity(city);
    setSelectedRestaurant(null);
  };

  const handleRestaurantsFound = (foundRestaurants: Restaurant[]) => {
    setRestaurants(foundRestaurants);
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'map':
        return (
          <>
            <SearchBar onSearch={handleSearch} />
            
            <div className="content-container">
              <div className="map-section">
                <Map 
                  city={currentCity} 
                  onRestaurantsFound={handleRestaurantsFound}
                />
              </div>
            </div>

            {selectedRestaurant && (
              <div className="selected-restaurant">
                <h3>📍 {selectedRestaurant.name}</h3>
                <p>{selectedRestaurant.address}</p>
                {selectedRestaurant.rating && (
                  <p>⭐ Calificación: {selectedRestaurant.rating}/5</p>
                )}
              </div>
            )}
          </>
        );
      case 'recipes':
        return <RecipesTab />;
      case 'events':
        return <EventsTab />;
      default:
        return null;
    }
  };

  return (
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
  );
}

export default App;
