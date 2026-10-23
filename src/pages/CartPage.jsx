import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import CartItemList from '../components/CartItemList';
import OrderSummary from '../components/OrderSummary';

function CartPage() {
  const { cartItems, totalPrice, updateQuantity, removeItem, loading } = useCartContext();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect guests to login before checkout
      navigate('/login', { 
        state: { 
          from: '/cart', 
          message: 'Please login to proceed with checkout' 
        } 
      });
    } else {
      // Navigate to checkout page for authenticated users
      navigate('/checkout');
    }
  };

  // Loading state
  if (loading) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <LoadingSpinner size="md" message="Loading cart..." />
        </div>
      </main>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="max-w-md mx-auto">
            <EmptyState
              title="Your cart is empty"
              description="Start adding products to your cart."
              actionLabel="Continue Shopping"
              actionLink="/"
              variant="compact"
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mb-8 sm:mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Cart Items */}
          <CartItemList
            items={cartItems}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
          />

          {/* Order Summary */}
          <OrderSummary
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
            isAuthenticated={isAuthenticated}
          />
        </div>
      </div>
    </main>
  );
}

export default CartPage;
