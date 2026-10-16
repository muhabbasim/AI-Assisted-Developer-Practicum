import { useState, useEffect } from 'react';

/**
 * Custom hook for managing shopping cart logic
 * Handles cart state, localStorage sync, and all cart operations
 */
export function useCart() {
  const [cartItems, setCartItems] = useState(() => {
    // Initialize state from localStorage
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (e) {
        console.error('Error loading cart:', e);
        return [];
      }
    }
    return [];
  });

  const [toast, setToast] = useState(null);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add a product to the cart or update quantity if already exists
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   * @returns {Promise<{success: boolean, error?: Error}>}
   */
  const addToCart = async (product, quantity) => {
    try {
      // Simulate async operation (e.g., API call)
      await new Promise((resolve) => setTimeout(resolve, 500));

      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.product.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prevItems, { product, quantity }];
      });

      // Show success toast
      setToast({
        message: 'Added to cart successfully!',
        type: 'success',
      });

      return { success: true };
    } catch (error) {
      // Show error toast
      setToast({
        message: "Couldn't add this item. Please try again.",
        type: 'error',
      });

      return { success: false, error };
    }
  };

  /**
   * Update the quantity of a cart item
   * @param {string|number} productId - ID of the product
   * @param {number} newQuantity - New quantity value
   */
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Remove an item from the cart
   * @param {string|number} productId - ID of the product to remove
   */
  const removeItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  /**
   * Clear the cart and complete checkout
   */
  const checkout = () => {
    alert('Thank you for your order!');
    setCartItems([]);
    localStorage.removeItem('shopping-cart');
  };

  /**
   * Clear the cart without checkout
   */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('shopping-cart');
  };

  // Calculate total items in cart
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    cartItems,
    totalCartCount,
    totalPrice,
    toast,
    setToast,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
    clearCart,
  };
}
