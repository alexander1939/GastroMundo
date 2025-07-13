import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Recipe, RecipeCard } from '../services/gemini';
import { searchRecipesByCategory, searchRecipesByQuery, getRecipeDetails, loadMoreRecipes } from '../services/gemini';

interface RecipesContextType {
  // Estado de las recetas
  recipeCards: RecipeCard[];
  selectedRecipe: Recipe | null;
  selectedCategory: string;
  searchQuery: string;
  currentQuery: string;
  hasMore: boolean;
  
  // Estados de carga
  loading: boolean;
  loadingMore: boolean;
  loadingDetails: boolean;
  error: string | null;
  
  // Acciones
  loadInitialRecipes: () => Promise<void>;
  handleCategoryChange: (category: string) => Promise<void>;
  handleSearch: () => Promise<void>;
  handleLoadMore: () => Promise<void>;
  handleRecipeClick: (recipeCard: RecipeCard) => Promise<void>;
  setSearchQuery: (query: string) => void;
  clearSelectedRecipe: () => void;
  clearError: () => void;
}

const RecipesContext = createContext<RecipesContextType | undefined>(undefined);

export const useRecipes = () => {
  const context = useContext(RecipesContext);
  if (context === undefined) {
    throw new Error('useRecipes debe ser usado dentro de un RecipesProvider');
  }
  return context;
};

interface RecipesProviderProps {
  children: ReactNode;
}

export const RecipesProvider: React.FC<RecipesProviderProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeCards, setRecipeCards] = useState<RecipeCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [hasMore, setHasMore] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastCategory, setLastCategory] = useState<string>('Todas');

  const loadInitialRecipes = useCallback(async () => {
    // Solo cargar si no se ha inicializado antes
    if (isInitialized && recipeCards.length > 0) {
      return;
    }
    setLoading(true);
    setError(null);
    setHasMore(true);
    setRecipeCards([]); // Limpiar recetas anteriores
    
    try {
      const initialCards = await searchRecipesByCategory('antojitos');
      setRecipeCards(initialCards);
      setCurrentQuery('antojitos'); // Guardar solo el término específico
      setIsInitialized(true);
      setLastCategory('Todas'); // Categoría por defecto
    } catch (err) {
      setError('Error al cargar las recetas iniciales');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [isInitialized, recipeCards.length]);

  const handleLoadMore = useCallback(async () => {
    if (loadingMore || !hasMore || !currentQuery) return;

    setLoadingMore(true);
    setError(null);
    
    try {
      const moreCards = await loadMoreRecipes(currentQuery, recipeCards.length);
      
      if (moreCards.length === 0) {
        setHasMore(false);
      } else {
        setRecipeCards(prev => [...prev, ...moreCards]);
      }
    } catch (err) {
      setError('Error al cargar más recetas');
      console.error('Error:', err);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, currentQuery, recipeCards.length]);

  const handleCategoryChange = useCallback(async (category: string) => {
    
    // Limpiar completamente el estado
    setSelectedCategory(category);
    setLoading(true);
    setError(null);
    setHasMore(true);
    setRecipeCards([]);
    setLastCategory(category);
    setIsInitialized(false); // Resetear para forzar nueva carga
    
    try {
      let query = '';
      if (category === 'Todas') {
        query = 'recetas mexicanas tradicionales variadas';
        const allCards = await searchRecipesByQuery(query);
        setRecipeCards(allCards);
      } else {
        const categoryCards = await searchRecipesByCategory(category.toLowerCase());
        setRecipeCards(categoryCards);
        // Guardar SOLO el término de categoría para mantener especificidad
        query = category.toLowerCase();
      }
      setCurrentQuery(query);
      setIsInitialized(true);
    } catch (err) {
      setError(`Error al cargar recetas de ${category}`);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) return;
    
    // Limpiar completamente el estado
    setLoading(true);
    setError(null);
    setSelectedCategory('Búsqueda');
    setHasMore(true);
    setRecipeCards([]);
    setLastCategory('Búsqueda');
    setIsInitialized(false); // Resetear para forzar nueva carga
    
    try {
      const searchResults = await searchRecipesByQuery(searchQuery);
      setRecipeCards(searchResults);
      // Guardar la query original para mantener el contexto en loadMoreRecipes
      setCurrentQuery(searchQuery);
      setIsInitialized(true);
    } catch (err) {
      setError('Error en la búsqueda de recetas');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  const handleRecipeClick = useCallback(async (recipeCard: RecipeCard) => {
    setLoadingDetails(true);
    setError(null);
    
    try {
      const fullRecipe = await getRecipeDetails(recipeCard.name, recipeCard.category);
      setSelectedRecipe(fullRecipe);
    } catch (err) {
      setError('Error al cargar los detalles de la receta');
      console.error('Error:', err);
    } finally {
      setLoadingDetails(false);
    }
  }, []);

  const clearSelectedRecipe = useCallback(() => {
    setSelectedRecipe(null);
    setLoadingDetails(false);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: RecipesContextType = {
    recipeCards,
    selectedRecipe,
    selectedCategory,
    searchQuery,
    currentQuery,
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
  };

  return (
    <RecipesContext.Provider value={value}>
      {children}
    </RecipesContext.Provider>
  );
}; 