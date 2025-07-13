import React from 'react';
import Map from './Map';
import SearchBar from './SearchBar';
import { useMap } from '../contexts/MapContext';

const MapContent: React.FC = () => {
  const {
    currentCity,
    selectedRestaurant,
    handleSearch,
    handleRestaurantsFound
  } = useMap();

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
};

export default MapContent; 