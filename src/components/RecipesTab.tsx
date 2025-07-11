import React, { useState } from 'react';

interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  difficulty: 'Fácil' | 'Medio' | 'Difícil';
  time: string;
  servings: number;
  image?: string;
  category: string;
}

const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Tacos al Pastor',
    description: 'Tacos de cerdo marinado con piña y especias, servidos con cilantro y cebolla',
    ingredients: [
      '1 kg de carne de cerdo',
      'Piña fresca',
      'Chiles guajillo',
      'Achiote',
      'Orégano',
      'Tortillas de maíz',
      'Cilantro',
      'Cebolla',
      'Limón'
    ],
    instructions: [
      'Marinar la carne con achiote, chiles y especias',
      'Cocinar en trompo o plancha',
      'Cortar la carne en tiras finas',
      'Calentar las tortillas',
      'Servir con piña, cilantro y cebolla'
    ],
    difficulty: 'Medio',
    time: '2 horas',
    servings: 6,
    category: 'Tacos'
  },
  {
    id: '2',
    name: 'Mole Poblano',
    description: 'Salsa tradicional de Puebla con chocolate y especias',
    ingredients: [
      'Chiles mulato, ancho y pasilla',
      'Chocolate amargo',
      'Ajonjolí',
      'Cacahuates',
      'Pollo',
      'Tortillas',
      'Especias variadas'
    ],
    instructions: [
      'Tostar los chiles y especias',
      'Preparar la pasta de mole',
      'Cocinar el pollo',
      'Mezclar todo y cocinar',
      'Servir con arroz y tortillas'
    ],
    difficulty: 'Difícil',
    time: '4 horas',
    servings: 8,
    category: 'Platos Principales'
  },
  {
    id: '3',
    name: 'Guacamole Tradicional',
    description: 'Guacamole fresco con ingredientes básicos',
    ingredients: [
      'Aguacates maduros',
      'Tomate',
      'Cebolla',
      'Cilantro',
      'Limón',
      'Sal'
    ],
    instructions: [
      'Moler los aguacates',
      'Picar finamente los vegetales',
      'Mezclar todos los ingredientes',
      'Ajustar sal y limón al gusto'
    ],
    difficulty: 'Fácil',
    time: '15 minutos',
    servings: 4,
    category: 'Aperitivos'
  },
  {
    id: '4',
    name: 'Pozole Rojo',
    description: 'Sopa tradicional con maíz y carne de cerdo',
    ingredients: [
      'Maíz pozolero',
      'Carne de cerdo',
      'Chiles rojos',
      'Lechuga',
      'Rábanos',
      'Orégano',
      'Limón'
    ],
    instructions: [
      'Cocinar el maíz hasta que reviente',
      'Cocinar la carne de cerdo',
      'Preparar la salsa roja',
      'Mezclar todo y cocinar',
      'Servir con guarniciones'
    ],
    difficulty: 'Medio',
    time: '3 horas',
    servings: 10,
    category: 'Sopas'
  },
  {
    id: '5',
    name: 'Chiles en Nogada',
    description: 'Chiles poblanos rellenos con nogada y granada',
    ingredients: [
      'Chiles poblanos',
      'Carne molida',
      'Nueces',
      'Granada',
      'Crema',
      'Queso fresco',
      'Hierbas de olor'
    ],
    instructions: [
      'Asar y pelar los chiles',
      'Preparar el relleno',
      'Rellenar los chiles',
      'Preparar la nogada',
      'Servir con granada'
    ],
    difficulty: 'Difícil',
    time: '2.5 horas',
    servings: 6,
    category: 'Platos Principales'
  }
];

const RecipesTab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const categories = ['Todas', ...Array.from(new Set(mockRecipes.map(r => r.category)))];
  
  const filteredRecipes = selectedCategory === 'Todas' 
    ? mockRecipes 
    : mockRecipes.filter(recipe => recipe.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Fácil': return '#4CAF50';
      case 'Medio': return '#FF9800';
      case 'Difícil': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className="recipes-tab">
      <div className="recipes-header">
        <h2>👨‍🍳 Recetas Tradicionales Mexicanas</h2>
        <p>Descubre los secretos de la cocina mexicana tradicional</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="recipes-content">
        <div className="recipes-grid">
          {filteredRecipes.map(recipe => (
            <div 
              key={recipe.id} 
              className="recipe-card"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="recipe-header">
                <h3>{recipe.name}</h3>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(recipe.difficulty) }}
                >
                  {recipe.difficulty}
                </span>
              </div>
              <p className="recipe-description">{recipe.description}</p>
              <div className="recipe-meta">
                <span>⏱️ {recipe.time}</span>
                <span>👥 {recipe.servings} personas</span>
                <span>🏷️ {recipe.category}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedRecipe && (
          <div className="recipe-modal">
            <div className="recipe-modal-content">
              <button 
                className="close-button"
                onClick={() => setSelectedRecipe(null)}
              >
                ✕
              </button>
              
              <h2>{selectedRecipe.name}</h2>
              <p className="recipe-description">{selectedRecipe.description}</p>
              
              <div className="recipe-details">
                <div className="recipe-info">
                  <span>⏱️ {selectedRecipe.time}</span>
                  <span>👥 {selectedRecipe.servings} personas</span>
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(selectedRecipe.difficulty) }}
                  >
                    {selectedRecipe.difficulty}
                  </span>
                </div>
              </div>

              <div className="recipe-sections">
                <div className="ingredients-section">
                  <h3>🥕 Ingredientes</h3>
                  <ul>
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <div className="instructions-section">
                  <h3>📝 Instrucciones</h3>
                  <ol>
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesTab; 