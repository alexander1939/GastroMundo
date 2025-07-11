import React from 'react';
import type { Restaurant } from '../services/api';

interface RestaurantListProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

const RestaurantList: React.FC<RestaurantListProps> = ({ restaurants, onRestaurantClick }) => {
  if (restaurants.length === 0) {
    return (
      <div className="restaurant-list empty">
        <p>No se encontraron restaurantes mexicanos en esta ubicación.</p>
      </div>
    );
  }

  return (
    <div className="restaurant-list">
      <h3>🍽️ Restaurantes Mexicanos Encontrados ({restaurants.length})</h3>
      <div className="restaurants-grid">
        {restaurants.map((restaurant) => (
          <div 
            key={restaurant.id} 
            className="restaurant-card"
            onClick={() => onRestaurantClick(restaurant)}
          >
            <h4>{restaurant.name}</h4>
            <p className="address">{restaurant.address}</p>
            {restaurant.rating && (
              <div className="rating">
                <span>⭐ {restaurant.rating}/5</span>
              </div>
            )}
            <div className="types">
              {restaurant.types.slice(0, 3).map((type, index) => (
                <span key={index} className="type-tag">
                  {type.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList; 