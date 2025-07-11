// Usando Overpass API (OpenStreetMap) - Completamente gratuita y sin API key
// Documentación: https://overpass-turbo.eu/

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating?: number;
  types: string[];
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  image?: string;
  description?: string;
}

// Función para obtener coordenadas con búsqueda más flexible
const getCoordinates = async (city: string): Promise<{lat: number, lng: number, displayName: string} | null> => {
  try {
    // Primera búsqueda: buscar la ciudad exacta
    let geocodeResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1&countrycodes=mx`
    );
    
    if (!geocodeResponse.ok) {
      throw new Error('Error en la búsqueda de coordenadas');
    }
    
    let geocodeData = await geocodeResponse.json();
    
    // Si no encuentra la ciudad exacta, buscar en un radio más amplio
    if (!geocodeData || geocodeData.length === 0) {
      console.log('🔍 Ciudad no encontrada, buscando en área más amplia...');
      
      // Buscar solo el nombre principal sin estado
      const cityName = city.split(',')[0].trim();
      geocodeResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=5&countrycodes=mx`
      );
      
      if (geocodeResponse.ok) {
        geocodeData = await geocodeResponse.json();
      }
    }
    
    // Si aún no encuentra, buscar en el estado
    if (!geocodeData || geocodeData.length === 0) {
      console.log('🔍 Buscando en el estado...');
      const stateMatch = city.match(/(chiapas|oaxaca|veracruz|puebla|guerrero|michoacan|jalisco|sonora|sinaloa|nayarit|colima|durango|zacatecas|aguascalientes|san luis potosi|queretaro|hidalgo|tlaxcala|morelos|mexico|cdmx|df|nuevo leon|tamaulipas|coahuila|chihuahua|baja california|baja california sur|yucatan|quintana roo|campeche|tabasco)/i);
      
      if (stateMatch) {
        geocodeResponse = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(stateMatch[1])}&format=json&limit=1&countrycodes=mx`
        );
        
        if (geocodeResponse.ok) {
          geocodeData = await geocodeResponse.json();
        }
      }
    }
    
    if (!geocodeData || geocodeData.length === 0) {
      return null;
    }
    
    const result = geocodeData[0];
    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      displayName: result.display_name
    };
    
  } catch (error) {
    console.error('❌ Error al obtener coordenadas:', error);
    return null;
  }
};

// Función para buscar restaurantes con diferentes estrategias
const searchRestaurantsWithStrategy = async (lat: number, lng: number, strategy: 'exact' | 'broad' | 'state'): Promise<Restaurant[]> => {
  const radius = strategy === 'exact' ? 5000 : strategy === 'broad' ? 15000 : 25000;
  
  const overpassQuery = `
    [out:json][timeout:30];
    (
      node["amenity"="restaurant"](around:${radius},${lat},${lng});
      way["amenity"="restaurant"](around:${radius},${lat},${lng});
      relation["amenity"="restaurant"](around:${radius},${lat},${lng});
      node["cuisine"="mexican"](around:${radius},${lat},${lng});
      way["cuisine"="mexican"](around:${radius},${lat},${lng});
      relation["cuisine"="mexican"](around:${radius},${lat},${lng});
      node["amenity"="fast_food"](around:${radius},${lat},${lng});
      way["amenity"="fast_food"](around:${radius},${lat},${lng});
      relation["amenity"="fast_food"](around:${radius},${lat},${lng});
      node["amenity"="food_court"](around:${radius},${lat},${lng});
      way["amenity"="food_court"](around:${radius},${lat},${lng});
      relation["amenity"="food_court"](around:${radius},${lat},${lng});
    );
    out body;
    >;
    out skel qt;
  `;
  
  try {
    const overpassResponse = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(overpassQuery)}`
    });
    
    if (!overpassResponse.ok) {
      throw new Error('Error en Overpass API');
    }
    
    const overpassData = await overpassResponse.json();
    return overpassData.elements || [];
    
  } catch (error) {
    console.error(`❌ Error en búsqueda ${strategy}:`, error);
    return [];
  }
};

export const searchMexicanRestaurants = async (city: string): Promise<Restaurant[]> => {
  try {
    console.log('🔍 Buscando restaurantes mexicanos en:', city);
    
    // Obtener coordenadas con búsqueda flexible
    const coords = await getCoordinates(city);
    
    if (!coords) {
      throw new Error('No se pudo encontrar la ubicación especificada');
    }
    
    console.log('📍 Coordenadas obtenidas:', coords);
    
    // Estrategia 1: Búsqueda exacta en la ciudad
    console.log('🌐 Estrategia 1: Búsqueda exacta...');
    let restaurants = await searchRestaurantsWithStrategy(coords.lat, coords.lng, 'exact');
    let mexicanRestaurants = filterMexicanRestaurants(restaurants);
    
    // Si no hay suficientes resultados, usar estrategia más amplia
    if (mexicanRestaurants.length < 3) {
      console.log('🌐 Estrategia 2: Búsqueda más amplia...');
      restaurants = await searchRestaurantsWithStrategy(coords.lat, coords.lng, 'broad');
      mexicanRestaurants = filterMexicanRestaurants(restaurants);
      
      // Si aún no hay suficientes, buscar en todo el estado
      if (mexicanRestaurants.length < 3) {
        console.log('🌐 Estrategia 3: Búsqueda en todo el estado...');
        restaurants = await searchRestaurantsWithStrategy(coords.lat, coords.lng, 'state');
        mexicanRestaurants = filterMexicanRestaurants(restaurants);
      }
    }
    
    // Si no hay restaurantes mexicanos específicos, incluir restaurantes generales
    if (mexicanRestaurants.length === 0) {
      console.log('🍽️ No se encontraron restaurantes mexicanos específicos, incluyendo restaurantes generales...');
      mexicanRestaurants = filterGeneralRestaurants(restaurants);
    }
    
    console.log('🎉 Total de restaurantes encontrados:', mexicanRestaurants.length);
    return mexicanRestaurants;
    
  } catch (error) {
    console.error('❌ Error en la búsqueda:', error);
    throw error;
  }
};

// Función para filtrar restaurantes mexicanos
const filterMexicanRestaurants = (elements: any[]): Restaurant[] => {
  const mexicanRestaurants: Restaurant[] = [];
  const processedIds = new Set();
  
  for (const element of elements) {
    if (element.type === 'node' && element.tags && !processedIds.has(element.id)) {
      processedIds.add(element.id);
      
      const name = element.tags.name?.toLowerCase() || '';
      const cuisine = element.tags.cuisine?.toLowerCase() || '';
      const tags = Object.values(element.tags).join(' ').toLowerCase();
      
      // Criterios ampliados para restaurantes mexicanos
      const isMexican = 
        name.includes('mexicano') || 
        name.includes('mexican') || 
        name.includes('taco') ||
        name.includes('burrito') ||
        name.includes('enchilada') ||
        name.includes('quesadilla') ||
        name.includes('tamal') ||
        name.includes('pozole') ||
        name.includes('mole') ||
        name.includes('guacamole') ||
        name.includes('salsa') ||
        name.includes('chile') ||
        name.includes('frijol') ||
        name.includes('maiz') ||
        name.includes('tortilla') ||
        name.includes('carnitas') ||
        name.includes('barbacoa') ||
        name.includes('cochinita') ||
        name.includes('chiles') ||
        name.includes('nopal') ||
        name.includes('elote') ||
        name.includes('esquite') ||
        name.includes('tlayuda') ||
        name.includes('memela') ||
        name.includes('gordita') ||
        name.includes('sope') ||
        name.includes('tlacoyo') ||
        name.includes('chalupa') ||
        name.includes('flauta') ||
        name.includes('tostada') ||
        name.includes('chilaquiles') ||
        name.includes('huevos') ||
        name.includes('machaca') ||
        name.includes('birria') ||
        name.includes('menudo') ||
        name.includes('cabrito') ||
        name.includes('carne') ||
        name.includes('pollo') ||
        name.includes('pescado') ||
        name.includes('mariscos') ||
        cuisine.includes('mexican') ||
        tags.includes('mexican') ||
        tags.includes('taco') ||
        tags.includes('mexican_restaurant') ||
        element.tags.cuisine === 'mexican';
      
      if (isMexican) {
        console.log('✅ Restaurante mexicano encontrado:', element.tags.name);
        mexicanRestaurants.push({
          id: element.id.toString(),
          name: element.tags.name || 'Restaurante Mexicano',
          address: element.tags['addr:street'] || element.tags['addr:city'] || 'Dirección no disponible',
          rating: undefined,
          types: Object.keys(element.tags),
          geometry: {
            location: {
              lat: element.lat,
              lng: element.lon
            }
          }
        });
      }
    }
  }
  
  return mexicanRestaurants;
};

// Función para filtrar restaurantes generales cuando no hay mexicanos específicos
const filterGeneralRestaurants = (elements: any[]): Restaurant[] => {
  const restaurants: Restaurant[] = [];
  const processedIds = new Set();
  
  for (const element of elements) {
    if (element.type === 'node' && element.tags && !processedIds.has(element.id)) {
      processedIds.add(element.id);
      
      const name = element.tags.name;
      if (name && name.trim() !== '') {
        console.log('🍽️ Restaurante general encontrado:', name);
        restaurants.push({
          id: element.id.toString(),
          name: name,
          address: element.tags['addr:street'] || element.tags['addr:city'] || 'Dirección no disponible',
          rating: undefined,
          types: Object.keys(element.tags),
          geometry: {
            location: {
              lat: element.lat,
              lng: element.lon
            }
          }
        });
      }
    }
  }
  
  return restaurants.slice(0, 10); // Limitar a 10 resultados
};

 