import { useState, useEffect } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const GUEST_CART_KEY = 'guest_cart';

/**
 * Custom hook for managing shopping cart
 * Supports both authenticated users (backend) and guest users (localStorage)
 */
export function useCart() {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Initialize cart on mount and when auth status changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      loadGuestCart();
    }
  }, [isAuthenticated]);

  /**
   * Load guest cart from localStorage
   */
  const loadGuestCart = () => {
    try {
      const savedCart = localStorage.getItem(GUEST_CART_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error loading guest cart:', error);
      setCartItems([]);
    }
  };

  /**
   * Save guest cart to localStorage
   */
  const saveGuestCart = (cart) => {
    try {
      localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving guest cart:', error);
    }
  };

  /**
   * Fetch cart from backend (authenticated users)
   */
  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      
      // Transform backend cart format to frontend format
      const transformedCart = response.cart.items.map((item) => ({
        product: {
          id: item.product_id,
          name: item.name,
          price: parseFloat(item.price),
          category: item.category,
          image: item.image,
          stock_quantity: item.stock_quantity,
        },
        quantity: item.quantity,
      }));
      
      setCartItems(transformedCart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Add a product to the cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add
   * @returns {Promise<{success: boolean, error?: Error}>}
   */
  const addToCart = async (product, quantity) => {
    try {
      if (isAuthenticated) {
        // Authenticated user: use backend API
        await cartAPI.addItem(product.id, quantity);
        await fetchCart();
      } else {
        // Guest user: use localStorage
        setCartItems((prevItems) => {
          const existingItem = prevItems.find((item) => item.product.id === product.id);
          
          let newCart;
          if (existingItem) {
            // Update quantity if item exists
            newCart = prevItems.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // Add new item
            newCart = [...prevItems, { product, quantity }];
          }
          
          // Save to localStorage
          saveGuestCart(newCart);
          return newCart;
        });
      }

      // Show success toast
      setToast({
        message: 'Added to cart successfully!',
        type: 'success',
      });

      return { success: true };
    } catch (error) {
      // Show error toast
      setToast({
        message: error.message || "Couldn't add this item. Please try again.",
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
  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (isAuthenticated) {
        // Authenticated user: use backend API
        await cartAPI.updateItem(productId, newQuantity);
        
        // Update local state optimistically
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        // Guest user: update localStorage
        setCartItems((prevItems) => {
          const newCart = prevItems.map((item) =>
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
          );
          saveGuestCart(newCart);
          return newCart;
        });
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setToast({
        message: error.message || 'Failed to update quantity',
        type: 'error',
      });
      
      // Refresh cart on error (authenticated users only)
      if (isAuthenticated) {
        await fetchCart();
      }
    }
  };

  /**
   * Remove an item from the cart
   * @param {string|number} productId - ID of the product to remove
   */
  const removeItem = async (productId) => {
    try {
      if (isAuthenticated) {
        // Authenticated user: use backend API
        await cartAPI.removeItem(productId);
        
        // Update local state optimistically
        setCartItems((prevItems) => 
          prevItems.filter((item) => item.product.id !== productId)
        );
      } else {
        // Guest user: update localStorage
        setCartItems((prevItems) => {
          const newCart = prevItems.filter((item) => item.product.id !== productId);
          saveGuestCart(newCart);
          return newCart;
        });
      }

      setToast({
        message: 'Item removed from cart',
        type: 'success',
      });
    } catch (error) {
      console.error('Error removing item:', error);
      setToast({
        message: error.message || 'Failed to remove item',
        type: 'error',
      });
      
      // Refresh cart on error (authenticated users only)
      if (isAuthenticated) {
        await fetchCart();
      }
    }
  };

  /**
   * Clear the entire cart
   */
  const clearCart = async () => {
    try {
      if (isAuthenticated) {
        // Authenticated user: use backend API
        await cartAPI.clearCart();
        setCartItems([]);
      } else {
        // Guest user: clear localStorage
        localStorage.removeItem(GUEST_CART_KEY);
        setCartItems([]);
      }
      
      setToast({
        message: 'Cart cleared',
        type: 'success',
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
      setToast({
        message: error.message || 'Failed to clear cart',
        type: 'error',
      });
    }
  };

  /**
   * Checkout - will be handled by order API
   * For now, just clear the cart (order creation will be separate)
   */
  const checkout = async () => {
    if (!isAuthenticated) {
      setToast({
        message: 'Please login to checkout',
        type: 'error',
      });
      return { success: false };
    }

    // This will be replaced with actual order creation
    return { success: true };
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
    loading,
    addToCart,
    updateQuantity,
    removeItem,
    checkout,
    clearCart,
    fetchCart,
  };
}
