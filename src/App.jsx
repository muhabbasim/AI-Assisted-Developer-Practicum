import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';

/**
 * Root App Component
 * Wraps the app with providers and routing
 */
function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainLayout />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
