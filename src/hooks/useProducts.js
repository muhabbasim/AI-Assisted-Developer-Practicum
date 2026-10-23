import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import useDebounce from './useDebounce';

/**
 * Custom hook for managing product data fetching and filtering
 * @param {string} selectedCategory - Currently selected category filter
 * @param {string} search - Search query string
 * @returns {Object} Product state and methods
 */
function useProducts(selectedCategory, search) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Debounce search input to avoid excessive API calls
  const debouncedSearch = useDebounce(search, 1000);

  // Fetch products when filters change
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, debouncedSearch]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const filters = {};
      if (selectedCategory !== 'All') {
        filters.category = selectedCategory;
      }
      if (debouncedSearch.trim()) {
        filters.search = debouncedSearch;
      }

      const response = await productsAPI.getAll(filters);
      setProducts(response.products || []);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts
  };
}

export default useProducts;
