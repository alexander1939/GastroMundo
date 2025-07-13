// Servicio para integrar con Gemini API para recetas tradicionales mexicanas

const GEMINI_API_KEY = 'AIzaSyBcdZ3psIszYZu0d-8COxah1BYoqZNVzu0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
  servings: string;
  region?: string;
  category: string;
  tips?: string;
  history?: string;
  image?: string;
}

export interface RecipeCard {
  id: string;
  name: string;
  description: string;
  cookingTime: string;
  difficulty: string;
  servings: string;
  region?: string;
  category: string;
  image?: string;
}

export interface GeminiRecipeResponse {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cookingTime: string;
  difficulty: string;
  servings: string;
  region?: string;
  category: string;
  tips?: string;
  history?: string;
}

export interface GeminiCardResponse {
  name: string;
  description: string;
  cookingTime: string;
  difficulty: string;
  servings: string;
  region?: string;
  category: string;
}

// Función para obtener imagen específica del platillo
const getRecipeImage = (name: string, category: string): string => {
  // Mapeo de platillos específicos a imágenes reales de comida mexicana
  const specificImages: { [key: string]: string } = {
    // Tacos
    'tacos': 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?w=400',
    'tacos al pastor': 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?w=400',
    'tacos de cochinita': 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?w=400',
    'tacos de carnitas': 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?w=400',
    'tacos de pescado': 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?w=400',
    
    // Mole
    'mole': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'mole poblano': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'mole negro': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'mole verde': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Pozole
    'pozole': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'pozole rojo': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'pozole verde': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'pozole blanco': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Tamales
    'tamales': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tamales de chiapas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tamales oaxaqueños': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tamales de dulce': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Antojitos
    'sopes': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'gorditas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tlacoyos': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'quesadillas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'enchiladas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'chilaquiles': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'flautas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tostadas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Sopas
    'sopa': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'caldo': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'menudo': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'birria': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'caldo de pollo': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'sopa de tortilla': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Postres
    'flan': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'arroz con leche': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'churros': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tres leches': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'pay de limón': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'capirotada': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'buñuelos': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Bebidas
    'agua de': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'horchata': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tamarindo': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'jamaica': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'tequila': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'mezcal': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'margarita': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Platos principales
    'chiles en nogada': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'cochinita pibil': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'barbacoa': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'carnitas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'cabrito': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'pescado': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'mariscos': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Salsas y guacamole
    'guacamole': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'salsa': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'pico de gallo': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    
    // Especialidades regionales
    'tlayudas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'memelas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'chalupas': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'esquites': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'elote': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400'
  };

  const nameLower = name.toLowerCase();
  
  // Buscar coincidencias específicas
  for (const [key, image] of Object.entries(specificImages)) {
    if (nameLower.includes(key)) {
      return image;
    }
  }

  // Si no hay coincidencia específica, usar por categoría
  const categoryImages = {
    'Plato Principal': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'Antojito': 'https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?w=400',
    'Sopa': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'Postre': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400',
    'Bebida': 'https://images.pexels.com/photos/5737374/pexels-photo-5737374.jpeg?w=400'
  };

  return categoryImages[category as keyof typeof categoryImages] || categoryImages['Plato Principal'];
};

// Función para procesar ingredientes (maneja tanto strings como objetos)
const processIngredients = (ingredients: any[]): string[] => {
  return ingredients.map(ingredient => {
    if (typeof ingredient === 'string') {
      return ingredient;
    } else if (typeof ingredient === 'object' && ingredient.item) {
      let result = `${ingredient.quantity || ''} ${ingredient.item}`.trim();
      if (ingredient.preparation) {
        result += ` (${ingredient.preparation})`;
      }
      if (ingredient.optional) {
        result += ' (opcional)';
      }
      return result;
    }
    return String(ingredient);
  });
};

// Función para validar que las recetas sean específicas a la búsqueda
const validateRecipeSpecificity = (recipeCards: RecipeCard[], query: string): RecipeCard[] => {
  // Extraer el término de búsqueda principal
  const searchTerm = query.toLowerCase().replace(/\s+mexicanos\s+tradicionales\s+específicos?/gi, '').trim();
  
  const validRecipes = recipeCards.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    
    // REGLA ESTRICTA: El nombre DEBE contener el término de búsqueda
    const isSpecific = recipeName.includes(searchTerm);
    
    return isSpecific;
  });
  
  return validRecipes;
};

// Función para obtener recetas básicas (solo para tarjetas)
export const getRecipeCards = async (query: string, offset: number = 0): Promise<RecipeCard[]> => {
  try {
    
    const prompt = `
      Eres un experto chef mexicano especializado en recetas tradicionales. 
      
      INSTRUCCIÓN CRÍTICA: Genera EXCLUSIVAMENTE recetas de "${query}". NADA MÁS.
      
      REGLAS ABSOLUTAS:
      1. SOLO genera recetas que contengan "${query}" en el nombre
      2. NO generes ningún otro tipo de comida mexicana
      3. Si buscan "tamales", SOLO tamales. Si buscan "tacos", SOLO tacos.
      4. Cada receta DEBE tener "${query}" en su nombre
      5. NO hay excepciones. SOLO "${query}".
      
      FORMATO DE NOMBRES:
      - Para "tamales": "Tamales de Chiapas", "Tamales Oaxaqueños", "Tamales de Dulce"
      - Para "tacos": "Tacos al Pastor", "Tacos de Carnitas", "Tacos de Pescado"
      - Para "mole": "Mole Poblano", "Mole Negro", "Mole Verde"
      - Para "bebidas": "Tepache Fermentado", "Horchata", "Agua de Jamaica"
      
      IMPORTANTE: Los nombres deben ser SIMPLES y DIRECTOS. NO agregues "mexicanos tradicionales específicos" ni texto extra.
      
      Ejemplos de lo que NO debes generar:
      - Para "tamales": NO sopes, NO tlacoyos, NO enchiladas
      - Para "tacos": NO pozole, NO mole, NO tamales
      
      Genera 12 recetas diferentes en formato JSON. Cada receta debe incluir SOLO:
      - name: Nombre del platillo (OBLIGATORIO: debe contener "${query}" pero ser simple)
      - description: Descripción breve del platillo (máximo 2 líneas)
      - cookingTime: Tiempo aproximado de preparación
      - difficulty: Nivel de dificultad (Fácil, Intermedio, Difícil)
      - servings: Número de porciones
      - region: Región de México donde es típico (opcional)
      - category: Categoría apropiada
      
      VALIDACIÓN FINAL: Antes de responder, verifica que TODAS las 12 recetas contengan "${query}" en su nombre.
      Si alguna no lo contiene, reemplázala con una que sí lo contenga.
      
      Responde SOLO con el JSON válido, sin texto adicional.
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Error en Gemini API: ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Respuesta inválida de Gemini API');
    }

    const responseText = data.candidates[0].content.parts[0].text;

    // Extraer JSON de la respuesta
    const jsonMatch = responseText.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer JSON de la respuesta. Respuesta recibida: ' + responseText);
    }

    const cardsData: GeminiCardResponse[] = JSON.parse(jsonMatch[0]);
    
    // Función para limpiar nombres largos
    const cleanRecipeName = (name: string, query: string): string => {
      // Si el nombre contiene "mexicanos tradicionales específicos", limpiarlo
      if (name.includes('mexicanos tradicionales específicos')) {
        // Extraer solo la parte relevante
        const cleanName = name.replace(/\s*:\s*.*?mexicanos tradicionales específicos.*?$/i, '');
        return cleanName.trim();
      }
      
      // Si el nombre es muy largo, intentar simplificarlo
      if (name.length > 50) {
        // Buscar el patrón "Query de/al/para Algo"
        const queryLower = query.toLowerCase();
        const nameLower = name.toLowerCase();
        
        if (nameLower.includes(queryLower)) {
          // Extraer desde el inicio hasta después del query
          const startIndex = nameLower.indexOf(queryLower);
          const endIndex = name.indexOf(':', startIndex);
          if (endIndex > startIndex) {
            return name.substring(0, endIndex).trim();
          }
        }
      }
      
      return name;
    };

    // Convertir a formato RecipeCard con offset para IDs únicos
    const recipeCards: RecipeCard[] = cardsData.map((card, index) => ({
      id: `card-${Date.now()}-${offset + index}`,
      name: card.name,
      description: card.description,
      cookingTime: card.cookingTime,
      difficulty: card.difficulty,
      servings: card.servings,
      region: card.region,
      category: card.category,
      image: getRecipeImage(card.name, card.category)
    }));

    // Validar que las recetas sean específicas a la búsqueda
    const validatedCards = validateRecipeSpecificity(recipeCards, query);
    
    // Si menos del 90% son específicas, regenerar con un prompt más agresivo
    if (validatedCards.length < recipeCards.length * 0.9) {
      
      const aggressivePrompt = `
        Eres un chef mexicano. SOLO genera recetas de "${query}". NADA MÁS.
        
        REGLA ÚNICA: Cada receta DEBE tener "${query}" en su nombre.
        
        FORMATO DE NOMBRES SIMPLES:
        - Para "tamales": "Tamales de Chiapas", "Tamales Oaxaqueños", "Tamales de Dulce"
        - Para "tacos": "Tacos al Pastor", "Tacos de Carnitas", "Tacos de Pescado"
        - Para "bebidas": "Tepache Fermentado", "Horchata", "Agua de Jamaica"
        
        IMPORTANTE: Nombres SIMPLES. NO agregues "mexicanos tradicionales específicos".
        
        NO generes sopes, tlacoyos, enchiladas, ni nada más.
        
        Genera 12 recetas en JSON. Cada una DEBE contener "${query}" en el nombre.
        Responde SOLO con JSON válido.
      `;
      
      // Intentar de nuevo con prompt más agresivo
      const aggressiveResponse = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: aggressivePrompt
            }]
          }]
        })
      });

      if (aggressiveResponse.ok) {
        const aggressiveData = await aggressiveResponse.json();
        const aggressiveText = aggressiveData.candidates[0].content.parts[0].text;
        const aggressiveJsonMatch = aggressiveText.match(/\[[\s\S]*\]/);
        
        if (aggressiveJsonMatch) {
          const aggressiveCardsData: GeminiCardResponse[] = JSON.parse(aggressiveJsonMatch[0]);
          const aggressiveRecipeCards: RecipeCard[] = aggressiveCardsData.map((card, index) => ({
            id: `card-aggressive-${offset + index}`,
            name: card.name,
            description: card.description,
            cookingTime: card.cookingTime,
            difficulty: card.difficulty,
            servings: card.servings,
            region: card.region,
            category: card.category,
            image: getRecipeImage(card.name, card.category)
          }));
          
          const aggressiveValidated = validateRecipeSpecificity(aggressiveRecipeCards, query);
          return aggressiveValidated;
        }
      }
    }
    
    return validatedCards;

  } catch (error) {
    console.error('❌ Error obteniendo tarjetas de recetas:', error);
    throw error;
  }
};

// Función para cargar más recetas (para infinite scroll)
export const loadMoreRecipes = async (query: string, currentCount: number): Promise<RecipeCard[]> => {
  // El query ya viene limpio del contexto, usarlo directamente
  
  // Agregar contexto adicional al prompt para mantener especificidad
  const result = await getRecipeCards(query, currentCount);
  
  // Validación adicional: verificar que al menos el 80% de las recetas sean específicas
  const specificRecipes = result.filter(recipe => {
    const recipeName = recipe.name.toLowerCase();
    const recipeDescription = recipe.description.toLowerCase();
    const searchTerm = query.toLowerCase();
    return recipeName.includes(searchTerm) || recipeDescription.includes(searchTerm);
  });
  
  // Si menos del 80% son específicas, intentar de nuevo con un prompt más específico
  if (specificRecipes.length < result.length * 0.8) {
    return await getRecipeCards(`${query} - SOLO ${query}`, currentCount);
  }
  
  return result;
};

// Función para obtener detalles completos de una receta específica
export const getRecipeDetails = async (recipeName: string, category: string): Promise<Recipe> => {
  try {
    
    const prompt = `
      Eres un experto chef mexicano especializado en recetas tradicionales. 
      Necesito que generes la receta completa y detallada para: "${recipeName}" (categoría: ${category})
      
      Por favor genera la receta en formato JSON con TODOS estos campos:
      - name: Nombre del platillo
      - description: Descripción detallada del platillo
      - ingredients: Array con ingredientes y cantidades exactas (puedes usar strings simples como "1 kg de carne de cerdo" o objetos como {"item": "carne de cerdo", "quantity": "1 kg"})
      - instructions: Array con pasos detallados de preparación
      - cookingTime: Tiempo aproximado de preparación
      - difficulty: Nivel de dificultad (Fácil, Intermedio, Difícil)
      - servings: Número de porciones
      - region: Región de México donde es típico
      - category: Categoría (Plato Principal, Antojito, Sopa, Postre, Bebida)
      - tips: Consejos de cocina tradicional detallados
      - history: Breve historia cultural del platillo
      
      La receta debe ser auténtica, tradicional y muy detallada.
      Responde SOLO con el JSON válido de UN SOLO objeto, sin texto adicional.
    `;

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Error en Gemini API: ${response.status}`);
    }

    const data = await response.json();

    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Respuesta inválida de Gemini API');
    }

    const responseText = data.candidates[0].content.parts[0].text;

    // Extraer JSON de la respuesta (buscar objeto individual)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No se pudo extraer JSON de la respuesta. Respuesta recibida: ' + responseText);
    }

    const recipeData: GeminiRecipeResponse = JSON.parse(jsonMatch[0]);
    
    // Convertir a formato Recipe
    const recipe: Recipe = {
      id: `recipe-${Date.now()}`,
      name: recipeData.name,
      description: recipeData.description,
      ingredients: processIngredients(recipeData.ingredients),
      instructions: recipeData.instructions,
      cookingTime: recipeData.cookingTime,
      difficulty: recipeData.difficulty,
      servings: recipeData.servings,
      region: recipeData.region,
      category: recipeData.category,
      tips: recipeData.tips,
      history: recipeData.history,
      image: getRecipeImage(recipeData.name, recipeData.category)
    };

    return recipe;

  } catch (error) {
    console.error('❌ Error obteniendo detalles de receta:', error);
    throw error;
  }
};

// Función para buscar recetas por categoría (ahora devuelve tarjetas)
export const searchRecipesByCategory = async (category: string): Promise<RecipeCard[]> => {
  const categories = {
    'chiapas': 'recetas de Chiapas',
    'oaxaca': 'recetas de Oaxaca',
    'puebla': 'recetas de Puebla',
    'yucatan': 'recetas de Yucatán',
    'antojitos': 'antojitos',
    'sopas': 'sopas',
    'postres': 'postres',
    'bebidas': 'bebidas',
    'tamales': 'tamales',
    'mole': 'mole',
    'pozole': 'pozole',
    'tacos': 'tacos'
  };

  const query = categories[category as keyof typeof categories] || category;
  return getRecipeCards(query);
};

// Función para búsqueda libre de recetas (ahora devuelve tarjetas)
export const searchRecipesByQuery = async (query: string): Promise<RecipeCard[]> => {
  // Usar la query directamente sin modificadores
  return getRecipeCards(query);
}; 