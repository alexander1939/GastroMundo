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



export const searchMexicanRestaurants = async (city: string): Promise<Restaurant[]> => {
  try {
    console.log('🔍 Buscando restaurantes mexicanos en:', city);
    
    // Obtener coordenadas de la ciudad usando Nominatim (OpenStreetMap) - API gratuita
    const geocodeResponse = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`
    );
    
    if (!geocodeResponse.ok) {
      throw new Error('Error al obtener coordenadas de la ciudad');
    }
    
    const geocodeData = await geocodeResponse.json();
    console.log('📍 Coordenadas obtenidas:', geocodeData);
    
    if (!geocodeData || geocodeData.length === 0) {
      throw new Error('Ciudad no encontrada');
    }
    
    const lat = parseFloat(geocodeData[0].lat);
    const lng = parseFloat(geocodeData[0].lon);
    console.log('📍 Latitud:', lat, 'Longitud:', lng);
    
    // Buscar restaurantes usando Overpass API - API gratuita sin límites
    const radius = 10000; // 10km de radio para más resultados
    const overpassQuery = `
      [out:json][timeout:30];
      (
        node["amenity"="restaurant"](around:${radius},${lat},${lng});
        way["amenity"="restaurant"](around:${radius},${lat},${lng});
        relation["amenity"="restaurant"](around:${radius},${lat},${lng});
        node["cuisine"="mexican"](around:${radius},${lat},${lng});
        way["cuisine"="mexican"](around:${radius},${lat},${lng});
        relation["cuisine"="mexican"](around:${radius},${lat},${lng});
      );
      out body;
      >;
      out skel qt;
    `;
    
    console.log('🌐 Enviando consulta a Overpass API...');
    const overpassResponse = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(overpassQuery)}`
    });
    
    if (!overpassResponse.ok) {
      throw new Error('Error al buscar restaurantes en Overpass API');
    }
    
    const overpassData = await overpassResponse.json();
    console.log('🍽️ Restaurantes encontrados:', overpassData.elements?.length || 0);
    
    // Filtrar restaurantes mexicanos
    const mexicanRestaurants: Restaurant[] = [];
    const processedIds = new Set();
    
    for (const element of overpassData.elements) {
      if (element.type === 'node' && element.tags && !processedIds.has(element.id)) {
        processedIds.add(element.id);
        
        const name = element.tags.name?.toLowerCase() || '';
        const cuisine = element.tags.cuisine?.toLowerCase() || '';
        const tags = Object.values(element.tags).join(' ').toLowerCase();
        
        // Criterios más amplios para restaurantes mexicanos
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
            rating: undefined, // Overpass no proporciona ratings
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
    
    console.log('🎉 Total de restaurantes mexicanos encontrados:', mexicanRestaurants.length);
    return mexicanRestaurants;
    
  } catch (error) {
    console.error('❌ Error en la búsqueda:', error);
    throw error;
  }
};

 