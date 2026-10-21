import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { ordersAPI } from '../services/api';

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalPrice, fetchCart } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handlePlaceOrder = async () => {
    try {
      setIsProcessing(true);
      setError('');

      const response = await ordersAPI.createOrder();

      if (response.success) {
        // Refresh cart (should be empty now)
        await fetchCart();
        
        // Navigate to order confirmation
        navigate(`/orders/${response.order.id}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mb-8 sm:mb-12">
          Checkout
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Order Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-4 border-b border-border last:border-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-warm-ivory"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">{item.product.name}</p>
                    <p className="text-xs text-text-secondary mt-1">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold text-text-primary">
                    SAR {(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-warm-ivory rounded-2xl p-8 sticky top-24 space-y-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-text-primary">Payment Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex justify-between text-text-secondary text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">SAR {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-secondary text-sm">
                  <span>Shipping</span>
                  <span className="font-medium text-primary">Free</span>
                </div>
                <div className="flex justify-between text-text-secondary text-sm">
                  <span>Tax</span>
                  <span className="font-medium">SAR 0.00</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold text-text-primary">
                <span>Total</span>
                <span>SAR {totalPrice.toFixed(2)}</span>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>

              <p className="text-xs text-text-secondary text-center">
                By placing this order, you agree to our terms and conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
