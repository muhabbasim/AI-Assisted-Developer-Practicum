import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { products } from '../data/products';

/**
 * Custom hook for managing product details and cart operations
 * @returns {Object} Product state and methods
 */
function useProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Find product by ID (memoized to avoid recalculation)
  const product = useMemo(() => {
    return products.find((p) => p.id === Number(id));
  }, [id]);

  // Handle adding product to cart
  const handleAddToCart = async () => {
    if (!isAdding && product) {
      setIsAdding(true);
      try {
        await addToCart(product, quantity);
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
    handleAddToCart
  };
}

export default useProductDetails;
