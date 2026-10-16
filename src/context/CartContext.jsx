import { createContext, useContext } from 'react';
import { useCart } from '../hooks/useCart';

/**
 * Context for shopping cart state and operations
 */
const CartContext = createContext(null);

/**
 * Provider component that wraps the app and provides cart functionality
 */
export function CartProvider({ children }) {
  const cart = useCart();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

/**
 * Hook to access cart context
 * Must be used within CartProvider
 * @throws {Error} If used outside CartProvider
 */
export function useCartContext() {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error('useCartContext must be used within CartProvider');
  }
  
  return context;
}
