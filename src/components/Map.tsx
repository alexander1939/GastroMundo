import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { searchMexicanRestaurants } from '../services/api';
import type { Restaurant } from '../services/api';
import { useMap as useMapContext } from '../contexts/MapContext';

// Fix para los iconos de Leaflet en React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  city: string;
  onRestaurantsFound: (restaurants: Restaurant[]) => void;
}

// Componente interno para controlar el mapa
const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  
  return null;
};

const Map: React.FC<MapProps> = ({ city, onRestaurantsFound }) => {
  const { handleRestaurantClick } = useMapContext();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.4326, -99.1332]);

  const searchRestaurants = async (searchCity: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('🚀 Iniciando búsqueda en API real para:', searchCity);
      
      // Primero obtener las coordenadas de la ciudad para centrar el mapa
      const geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchCity)}&format=json&limit=1`
      );
      
      if (geocodeResponse.ok) {
        const geocodeData = await geocodeResponse.json();
        if (geocodeData && geocodeData.length > 0) {
          const lat = parseFloat(geocodeData[0].lat);
          const lng = parseFloat(geocodeData[0].lon);
          console.log('📍 Centrando mapa en:', lat, lng);
          setMapCenter([lat, lng]);
        }
      }
      
      // Usar la API real para buscar restaurantes
      const apiRestaurants = await searchMexicanRestaurants(searchCity);
      
      if (apiRestaurants.length > 0) {
        console.log('✅ API exitosa, restaurantes encontrados:', apiRestaurants.length);
        setRestaurants(apiRestaurants);
        onRestaurantsFound(apiRestaurants);
      } else {
        console.log('⚠️ No se encontraron restaurantes mexicanos en la API');
        setError('No se encontraron restaurantes mexicanos en esta ciudad. Intenta con otra ciudad.');
        setRestaurants([]);
        onRestaurantsFound([]);
      }
    } catch (err) {
      console.error('❌ Error en API:', err);
      setError('Error al conectar con la API. Verifica tu conexión a internet.');
      setRestaurants([]);
      onRestaurantsFound([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      // Buscar restaurantes
      searchRestaurants(city);
    }
  }, [city]);

  return (
    <div className="map-container">
      {loading && <div className="loading">Buscando restaurantes mexicanos...</div>}
      {error && <div className="error">{error}</div>}
      
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        key={city}
      >
        <MapController center={mapCenter} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={[restaurant.geometry.location.lat, restaurant.geometry.location.lng]}
          >
            <Popup>
              <div>
                <h3>{restaurant.name}</h3>
                <p>{restaurant.address}</p>
                {restaurant.rating && (
                  <p>⭐ {restaurant.rating}/5</p>
                )}
                <button 
                  onClick={() => handleRestaurantClick(restaurant)}
                  style={{ 
                    marginTop: '8px', 
                    padding: '4px 8px', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px', 
                    cursor: 'pointer' 
                  }}
                >
                  Ver detalles
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map; 