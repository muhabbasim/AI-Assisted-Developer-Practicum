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

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Get status badge style
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border border-amber-200',
      completed: 'bg-green-50 text-green-700 border border-green-200',
      cancelled: 'bg-gray-100 text-gray-700 border border-gray-300',
    };
    return styles[status] || 'bg-gray-100 text-gray-700 border border-gray-300';
  };

  // Get status label
  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Processing',
      completed: 'Delivered',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  };

  // Get estimated delivery date (mock - would come from backend)
  const getEstimatedDelivery = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 5); // Add 5 days for estimate
    return formatDateShort(date);
  };

  // Order timeline stages
  const getOrderTimeline = (status, createdAt) => {
    const stages = [
      {
        id: 'placed',
        label: 'Order Placed',
        date: createdAt,
        completed: true,
      },
      {
        id: 'confirmed',
        label: 'Order Confirmed',
        date: createdAt,
        completed: true,
      },
      {
        id: 'processing',
        label: 'Processing',
        date: null,
        completed: status === 'pending' || status === 'completed',
      },
      {
        id: 'shipped',
        label: 'Shipped',
        date: null,
        completed: status === 'completed',
      },
      {
        id: 'delivered',
        label: 'Delivered',
        date: status === 'completed' ? createdAt : null,
        completed: status === 'completed',
      },
    ];

    // If cancelled, show only placed and cancelled
    if (status === 'cancelled') {
      return [
        stages[0],
        {
          id: 'cancelled',
          label: 'Order Cancelled',
          date: createdAt,
          completed: true,
        },
      ];
    }

    return stages;
  };

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        {/* Back Button */}
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-6 transition-colors cursor-pointer group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-xl border border-border p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary">
                  Order #{order.id}
                </h1>
                <span className={`px-3 py-1.5 rounded-md text-xs font-medium ${getStatusBadge(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <div className="space-y-1.5 text-sm text-text-secondary">
                <p>Placed on {formatDate(order.createdAt)}</p>
                {order.status !== 'cancelled' && (
                  <p>Estimated delivery: {getEstimatedDelivery(order.createdAt)}</p>
                )}
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-warm hover:bg-warm-ivory text-text-primary border border-border px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
              Print Receipt
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Items and Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-5 sm:p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-text-primary">
                  Order Items ({order.items.length})
                </h2>
              </div>
              
              <div className="divide-y divide-border">
                {order.items.map((item) => (
                  <div key={item.id} className="p-5 sm:p-6 flex gap-5">
                    {/* Product Image */}
                    <Link to={`/product/${item.productId}`} className="flex-shrink-0 cursor-pointer group">
                      <div className="w-24 h-24 bg-warm-ivory rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-base font-medium text-text-primary hover:text-primary transition-colors cursor-pointer block mb-2 line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3 font-medium">
                          {item.category}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span>Qty: {item.quantity}</span>
                          <span className="text-border">•</span>
                          <span>SAR {item.priceAtPurchase.toFixed(2)} each</span>
                        </div>
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

            {/* Order Timeline */}
            <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-text-primary mb-6">
                {order.status === 'cancelled' ? 'Order Status' : 'Order Timeline'}
              </h2>
              
              <div className="relative">
                {getOrderTimeline(order.status, order.createdAt).map((stage, index, array) => (
                  <div key={stage.id} className="flex gap-4 pb-8 last:pb-0 relative">
                    {/* Timeline Line */}
                    {index < array.length - 1 && (
                      <div 
                        className={`absolute left-4 top-10 w-0.5 h-full -translate-x-1/2 ${
                          array[index + 1].completed ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                    
                    {/* Timeline Node */}
                    <div className="relative flex-shrink-0">
                      <div 
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          stage.completed
                            ? stage.id === 'cancelled'
                              ? 'bg-gray-100 border-gray-300'
                              : 'bg-primary border-primary'
                            : 'bg-white border-border'
                        }`}
                      >
                        {stage.completed && (
                          <svg 
                            className={`w-4 h-4 ${
                              stage.id === 'cancelled' ? 'text-gray-600' : 'text-white'
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                          >
                            {stage.id === 'cancelled' ? (
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            )}
                          </svg>
                        )}
                      </div>
                    </div>
                    
                    {/* Timeline Content */}
                    <div className="flex-1 pt-0.5">
                      <p className={`text-sm font-medium mb-1 ${
                        stage.completed ? 'text-text-primary' : 'text-text-tertiary'
                      }`}>
                        {stage.label}
                      </p>
                      {stage.date && (
                        <p className="text-xs text-text-secondary">
                          {formatDateShort(stage.date)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary and Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-warm-ivory rounded-xl p-5 sm:p-6 sticky top-24 border border-border shadow-sm">
              <h2 className="text-lg font-semibold text-text-primary mb-5">Payment Summary</h2>

              <div className="space-y-3 pb-4 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="font-medium text-text-primary">SAR {order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="font-medium text-primary">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Discount</span>
                  <span className="font-medium text-text-primary">SAR 0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Tax</span>
                  <span className="font-medium text-text-primary">Included</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-semibold text-text-primary pt-4 mb-6">
                <span>Total</span>
                <span>SAR {order.totalAmount.toFixed(2)}</span>
              </div>

              {/* Order Information */}
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium mb-1">Order ID</p>
                  <p className="text-sm font-mono text-text-primary bg-white px-3 py-2 rounded-lg border border-border">
                    #{order.id}
                  </p>
                </div>
                
                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium mb-1">Payment Method</p>
                  <div className="flex items-center gap-2 text-sm text-text-primary bg-white px-3 py-2 rounded-lg border border-border">
                    <span>💵</span>
                    <span className="font-medium">Cash on Delivery</span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-text-tertiary uppercase tracking-wider font-medium mb-1">Payment Status</p>
                  <div className="text-sm bg-white px-3 py-2 rounded-lg border border-border">
                    <span className={`font-medium ${
                      order.status === 'completed' ? 'text-green-700' : 
                      order.status === 'cancelled' ? 'text-gray-600' : 'text-amber-700'
                    }`}>
                      {order.status === 'completed' ? 'Paid' : 
                       order.status === 'cancelled' ? 'Cancelled' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderDetail;
