import React, { useEffect, useRef } from 'react';
import { useRecipes } from '../contexts/RecipesContext';

const RecipesTab: React.FC = () => {
  const {
    recipeCards,
    selectedRecipe,
    selectedCategory,
    searchQuery,
    hasMore,
    loading,
    loadingMore,
    loadingDetails,
    error,
    loadInitialRecipes,
    handleCategoryChange,
    handleSearch,
    handleLoadMore,
    handleRecipeClick,
    setSearchQuery,
    clearSelectedRecipe,
    clearError
  } = useRecipes();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement>(null);

  const categories = [
    'Todas', 
    'Chiapas', 
    'Oaxaca', 
    'Puebla', 
    'Yucatán', 
    'Antojitos', 
    'Sopas', 
    'Postres', 
    'Bebidas',
    'Tamales',
    'Mole',
    'Pozole',
    'Tacos'
  ];

  // Cargar recetas iniciales solo UNA vez cuando se monta el componente
  useEffect(() => {
    loadInitialRecipes();
  }, []); // Solo se ejecuta una vez al montar

  // Configurar intersection observer para infinite scroll
  useEffect(() => {
    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loadingMore && !loading) {
            handleLoadMore();
          }
        },
        { threshold: 0.1 }
      );

      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore, loading, handleLoadMore]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'fácil': return '#4CAF50';
      case 'intermedio': return '#FF9800';
      case 'difícil': return '#F44336';
      default: return '#666';
    }
  };

  return (
    <div className="recipes-tab">
      <div className="recipes-header">
        <h2>👨‍🍳 Recetas Tradicionales Mexicanas</h2>
        <p>Descubre los secretos de la cocina mexicana tradicional con IA</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-section">
        <div className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar recetas... (ej: tamales de Chiapas, mole poblano)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            className="search-button"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '🔍 Buscando...' : '🔍 Buscar'}
          </button>
        </div>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
            disabled={loading}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Mensaje de error */}
      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={loadInitialRecipes}>🔄 Reintentar</button>
        </div>
      )}

      {/* Loading inicial */}
      {loading && (
        <div className="loading-container">
          <div className="loading">
          
          </div>
        </div>
      )}

      <div className="recipes-content">
        <div className="recipes-grid">
          {recipeCards.map(recipeCard => (
            <div 
              key={recipeCard.id} 
              className="recipe-card"
              onClick={() => handleRecipeClick(recipeCard)}
            >
              {recipeCard.image && (
                <div className="recipe-image">
                  <img src={recipeCard.image} alt={recipeCard.name} />
                </div>
              )}
              <div className="recipe-header">
                <h3>{recipeCard.name}</h3>
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(recipeCard.difficulty) }}
                >
                  {recipeCard.difficulty}
                </span>
              </div>
              <p className="recipe-description">{recipeCard.description}</p>
              <div className="recipe-meta">
                <span>⏱️ {recipeCard.cookingTime}</span>
                <span>👥 {recipeCard.servings}</span>
                <span>🏷️ {recipeCard.category}</span>
                {recipeCard.region && <span>📍 {recipeCard.region}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Loading para más recetas (infinite scroll) */}
        {!loading && hasMore && (
          <div ref={loadingRef} className="loading-more-container">
            {loadingMore && (
              <div className="loading-more">
                <div className="spinner"></div>
                <p>🤖 Cargando más recetas...</p>
              </div>
            )}
          </div>
        )}

        {/* Mensaje cuando no hay más recetas */}
        {!loading && !hasMore && recipeCards.length > 0 && (
          <div className="no-more-recipes">
            <p>🎉 ¡Has visto todas las recetas disponibles!</p>
          </div>
        )}

        {(selectedRecipe || loadingDetails) && (
          <div className="recipe-modal">
            <div className="recipe-modal-content">
              <button 
                className="close-button"
                onClick={clearSelectedRecipe}
              >
                ✕
              </button>
              
              {loadingDetails && (
                <div className="loading-details-full">
                  <div className="loading-animation">
                    <div className="chef-hat">👨‍🍳</div>
                    <div className="spinner-large"></div>
                  </div>
                  <h2>🤖 Generando receta completa...</h2>
                  <p>Estamos preparando todos los ingredientes y pasos para ti</p>
                  <div className="loading-steps">
                    <div className="step">📝 Escribiendo instrucciones detalladas...</div>
                    <div className="step">🥕 Listando ingredientes exactos...</div>
                    <div className="step">💡 Agregando consejos de cocina...</div>
                    <div className="step">📚 Incluyendo historia cultural...</div>
                  </div>
                </div>
              )}
              
              {!loadingDetails && selectedRecipe && (
                <>
                  <h2>{selectedRecipe.name}</h2>
                  <p className="recipe-description">{selectedRecipe.description}</p>
                  
                  {selectedRecipe.history && (
                    <div className="recipe-history">
                      <h3>📚 Historia</h3>
                      <p>{selectedRecipe.history}</p>
                    </div>
                  )}
                  
                  <div className="recipe-details">
                    <div className="recipe-info">
                      <span>⏱️ {selectedRecipe.cookingTime}</span>
                      <span>👥 {selectedRecipe.servings}</span>
                      <span>🏷️ {selectedRecipe.category}</span>
                      {selectedRecipe.region && <span>📍 {selectedRecipe.region}</span>}
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

                  {selectedRecipe.tips && (
                    <div className="recipe-tips">
                      <h3>💡 Consejos de Cocina</h3>
                      <p>{selectedRecipe.tips}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesTab; 