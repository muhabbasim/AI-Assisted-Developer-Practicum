import { Link } from 'react-router-dom';

function OrderSummary({ 
  totalPrice, 
  onCheckout, 
  isAuthenticated, 
  continueShopping = true 
}) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-warm-ivory rounded-2xl p-8 sticky top-24 space-y-6 shadow-sm border border-border">
        <h2 className="text-xl font-semibold text-text-primary">
          Order Summary
        </h2>

        <div className="space-y-4 pb-6 border-b border-border">
          <div className="flex justify-between text-text-secondary text-sm">
            <span>Subtotal</span>
            <span className="font-medium">SAR {totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-text-secondary text-sm">
            <span>Shipping</span>
            <span className="font-medium text-primary">Free</span>
          </div>
        </div>

        <div className="flex justify-between text-lg font-semibold text-text-primary">
          <span>Total</span>
          <span>SAR {totalPrice.toFixed(2)}</span>
        </div>

        <button
          type="button"
          onClick={onCheckout}
          className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
        >
          {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
        </button>

        {!isAuthenticated && (
          <p className="text-xs text-text-tertiary text-center">
            You need to login to complete your purchase
          </p>
        )}

        {continueShopping && (
          <Link 
            to="/" 
            className="block text-center text-sm text-text-secondary hover:text-primary transition-colors py-2 rounded-lg hover:bg-white cursor-pointer"
          >
            ← Continue Shopping
          </Link>
        )}
      </div>
    </div>
  );
}

export default OrderSummary;
