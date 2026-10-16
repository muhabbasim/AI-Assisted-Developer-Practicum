import { Routes, Route } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Toast from '../components/Toast';
import Home from '../pages/Home';
import Product from '../pages/Product';
import CartPage from '../pages/CartPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Notfound from '../pages/Notfound';

/**
 * Main Layout Component
 * Handles the overall page structure with header, footer, and routing
 */
function MainLayout() {
  const { totalCartCount, toast, setToast } = useCartContext();

  return (
    <div className="min-h-screen flex flex-col bg-warm overflow-x-hidden">
      <Header cartCount={totalCartCount} />
      <div className="flex-1 pt-16 sm:pt-18">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
      <Footer />
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default MainLayout;
