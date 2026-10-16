import { Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import QuantityStepper from '../components/QuantityStepper';

function CartPage() {
  const { cartItems, totalPrice, updateQuantity, removeItem, checkout } = useCartContext();

  if (cartItems.length === 0) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="max-w-md mx-auto text-center space-y-6 bg-white rounded-2xl border border-border p-12 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-medium text-text-primary">Your cart is empty</h2>
            <p className="text-base text-text-secondary leading-relaxed">Start adding products to your cart.</p>
            <Link
              to="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mb-8 sm:mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            {cartItems.map((item, index) => (
              <div
                key={item.product.id}
                className={`p-6 sm:p-8 flex flex-col sm:flex-row gap-6 ${
                  index !== cartItems.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                {/* Product Image */}
                <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                  <div className="w-full sm:w-32 h-32 bg-warm-ivory rounded-xl overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-base font-medium text-text-primary hover:text-primary transition-colors"
                    >
                      {item.product.title}
                    </Link>
                    <p className="text-sm text-text-tertiary mt-1.5 uppercase tracking-wide">{item.product.category}</p>
                  </div>

                  <div className="flex items-end justify-between gap-4 flex-wrap">
                    <div className="max-w-[140px]">
                      <QuantityStepper
                        initialValue={item.quantity}
                        onQuantityChange={(newQty) => updateQuantity(item.product.id, newQty)}
                      />
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-text-primary">
                        SAR {(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id)}
                  className="text-text-tertiary hover:text-primary text-sm font-medium self-start sm:self-center transition-colors px-3 py-2 rounded-lg hover:bg-warm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-warm-ivory rounded-2xl p-8 sticky top-24 space-y-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-text-primary">Order Summary</h2>

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
                onClick={checkout}
                className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Proceed to Checkout
              </button>

              <Link to="/" className="block text-center text-sm text-text-secondary hover:text-primary transition-colors py-2 rounded-lg hover:bg-white">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CartPage;
