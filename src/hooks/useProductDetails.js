import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { products } from '../data/products';
import { productsAPI } from '../services/api';

/**
 * Custom hook for managing product details and cart operations
 * @returns {Object} Product state and methods
 */
function useProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchSingleProduct();
  }, [id]);

  const fetchSingleProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productsAPI.getById(id);
      setProduct(response.product || {});
    } catch (err) {
      setError(err.message || 'Failed to load products');
      setProduct([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding product to cart
  const handleAddToCart = async () => {
    if (!isAdding && product) {
      setIsAdding(true);
      try {
        await addToCart(product, quantity);``
        setQuantity(1); // Reset quantity after successful add
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  return {
    product,
    quantity,
    setQuantity,
    isAdding,
    handleAddToCart,
    loading,
    error
  };
}

export default useProductDetails;
