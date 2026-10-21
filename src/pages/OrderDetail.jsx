import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated && id) {
      fetchOrder();
    }
  }, [isAuthenticated, id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getOrderById(id);
      setOrder(response.order);
    } catch (err) {
      setError(err.message || 'Failed to load order details');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  // Not authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading order details...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="max-w-md mx-auto text-center space-y-6 bg-white rounded-2xl border border-border p-12 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-medium text-text-primary">Order Not Found</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              {error || 'This order does not exist or you do not have access to it.'}
            </p>
            <Link
              to="/orders"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-6 transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                  Order #{order.id}
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                Placed on {formatDate(order.createdAt)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="bg-warm hover:bg-warm-ivory text-text-primary border border-border py-3 px-6 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 cursor-pointer"
            >
              Print Receipt
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
            <div className="p-6 sm:p-8 border-b border-border">
              <h2 className="text-xl font-semibold text-text-primary">Order Items</h2>
            </div>
            
            <div className="divide-y divide-border">
              {order.items.map((item) => (
                <div key={item.id} className="p-6 sm:p-8 flex gap-6">
                  {/* Product Image */}
                  <Link to={`/product/${item.productId}`} className="flex-shrink-0 cursor-pointer">
                    <div className="w-24 h-24 bg-warm-ivory rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <Link
                        to={`/product/${item.productId}`}
                        className="text-base font-medium text-text-primary hover:text-primary transition-colors cursor-pointer block mb-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-text-tertiary uppercase tracking-wide mb-2">
                        {item.category}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-text-secondary">
                        Price: SAR {item.priceAtPurchase.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-lg font-semibold text-text-primary">
                        SAR {item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-warm-ivory rounded-2xl p-6 sm:p-8 sticky top-24 space-y-6 shadow-sm border border-border">
              <h2 className="text-xl font-semibold text-text-primary">Order Summary</h2>

              <div className="space-y-4 pb-6 border-b border-border">
                <div className="flex justify-between text-text-secondary text-sm">
                  <span>Subtotal</span>
                  <span className="font-medium">SAR {order.totalAmount.toFixed(2)}</span>
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
                <span>SAR {order.totalAmount.toFixed(2)}</span>
              </div>

              <div className="pt-6 border-t border-border">
                <p className="text-xs text-text-secondary mb-2">Order ID</p>
                <p className="text-sm font-mono text-text-primary bg-white px-3 py-2 rounded-lg border border-border">
                  {order.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderDetail;
