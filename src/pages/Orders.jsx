import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getOrders();
      setOrders(response.orders || []);
    } catch (err) {
      setError(err.message || 'Failed to load orders');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="max-w-md mx-auto text-center space-y-6 bg-white rounded-2xl border border-border p-12 shadow-sm">
            <h2 className="text-2xl sm:text-3xl font-medium text-text-primary">Login Required</h2>
            <p className="text-base text-text-secondary leading-relaxed">Please login to view your orders.</p>
            <Link
              to="/login"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Login
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Loading state
  if (loading) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-secondary">Loading orders...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="max-w-md mx-auto text-center space-y-6 bg-white rounded-2xl border border-border p-12 shadow-sm">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-text-primary">Error Loading Orders</h2>
            <p className="text-base text-text-secondary leading-relaxed">{error}</p>
            <button
              onClick={fetchOrders}
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Try Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Empty orders
  if (orders.length === 0) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16 sm:py-24">
          <div className="max-w-md mx-auto text-center space-y-6 bg-white rounded-2xl border border-border p-12 shadow-sm">
            <div className="w-20 h-20 bg-warm-ivory rounded-full flex items-center justify-center mx-auto">
              <svg className="w-10 h-10 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-medium text-text-primary">No orders yet</h2>
            <p className="text-base text-text-secondary leading-relaxed">Start shopping to create your first order.</p>
            <Link
              to="/"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              Start Shopping
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
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight">
            My Orders
          </h1>
          <Link
            to="/"
            className="text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6 sm:p-8">
                {/* Order Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-6 border-b border-border">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        Order #{order.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-sm text-text-secondary mb-1">Total Amount</p>
                    <p className="text-2xl font-semibold text-text-primary">
                      SAR {order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to={`/orders/${order.id}`}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white text-center py-3 px-6 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    View Details
                  </Link>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="flex-1 sm:flex-initial bg-warm hover:bg-warm-ivory text-text-primary border border-border py-3 px-6 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 cursor-pointer"
                  >
                    Download Receipt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Orders;
