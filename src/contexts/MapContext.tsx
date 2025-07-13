import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Restaurant } from '../services/api';

interface MapContextType {
  // Estado del mapa y restaurantes
  currentCity: string;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  
  // Acciones
  handleSearch: (city: string) => void;
  handleRestaurantsFound: (foundRestaurants: Restaurant[]) => void;
  handleRestaurantClick: (restaurant: Restaurant) => void;
  clearSelectedRestaurant: () => void;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMap = () => {
  const context = useContext(MapContext);
  if (context === undefined) {
    throw new Error('useMap debe ser usado dentro de un MapProvider');
  }
  return context;
};

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [currentCity, setCurrentCity] = useState('Ciudad de México');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  const handleSearch = useCallback((city: string) => {
    setCurrentCity(city);
    setSelectedRestaurant(null);
  }, []);

  const handleRestaurantsFound = useCallback((foundRestaurants: Restaurant[]) => {
    setRestaurants(foundRestaurants);
  }, []);

  const handleRestaurantClick = useCallback((restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
  }, []);

  const clearSelectedRestaurant = useCallback(() => {
    setSelectedRestaurant(null);
  }, []);

  const value: MapContextType = {
    currentCity,
    restaurants,
    selectedRestaurant,
    handleSearch,
    handleRestaurantsFound,
    handleRestaurantClick,
    clearSelectedRestaurant
  };

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
}; 