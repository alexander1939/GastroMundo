import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Restaurant } from '../services/api';

interface MapContextType {
  // Estado del mapa y restaurantes
  currentCity: string;
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  
  // Acciones
  handleSearch: (params: { estado?: string; municipio?: string; query?: string } | string) => void;
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

  const handleSearch = useCallback((params: { estado?: string; municipio?: string; query?: string } | string) => {
    let searchString = '';
    if (typeof params === 'string') {
      searchString = params;
    } else {
      if (params.municipio && params.estado) {
        searchString = `${params.municipio}, ${params.estado}`;
      } else if (params.estado) {
        searchString = params.estado;
      }
      if (params.query) {
        // Si hay municipio/estado, agregar el query al final
        if (searchString) {
          searchString = `${params.query}, ${searchString}`;
        } else {
          searchString = params.query;
        }
      }
      if (!searchString) {
        searchString = 'Ciudad de México';
      }
    }
    setCurrentCity(searchString);
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