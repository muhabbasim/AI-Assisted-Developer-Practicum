import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Orders() {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Status filter options
  const statusFilters = [
    { id: 'all', label: 'All Orders', count: 0 },
    { id: 'pending', label: 'Processing', count: 0 },
    { id: 'completed', label: 'Delivered', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, activeFilter, searchQuery, sortOrder]);

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

  const filterAndSortOrders = () => {
    let result = [...orders];

    // Apply status filter
    if (activeFilter !== 'all') {
      result = result.filter(order => order.status === activeFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(order => 
        order.id.toString().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setFilteredOrders(result);
  };

  // Calculate status counts
  const getStatusCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };
  };

  const statusCounts = getStatusCounts();

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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

  // Loading state with skeleton
  if (loading) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-8 sm:py-12">
          {/* Header skeleton */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <div className="h-10 bg-gray-200 rounded-lg w-48 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-100 rounded w-64 animate-pulse"></div>
            </div>
            <div className="h-10 bg-gray-100 rounded-lg w-40 animate-pulse"></div>
          </div>

          {/* Filter skeleton */}
          <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 bg-gray-100 rounded-lg w-32 animate-pulse flex-shrink-0"></div>
            ))}
          </div>

          {/* Order cards skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-6 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                <div className="h-4 bg-gray-100 rounded w-48 mb-6"></div>
                <div className="flex gap-3">
                  <div className="h-10 bg-gray-100 rounded-lg flex-1"></div>
                  <div className="h-10 bg-gray-100 rounded-lg w-32"></div>
                </div>
              </div>
            ))}
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
            <h2 className="text-2xl sm:text-3xl font-medium text-text-primary">You haven't placed any orders yet</h2>
            <p className="text-base text-text-secondary leading-relaxed">
              Start exploring our collection and place your first order.
            </p>
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

  // No results after filtering
  const showNoResults = filteredOrders.length === 0 && (activeFilter !== 'all' || searchQuery);

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-text-primary tracking-tight mb-2">
              My Orders
            </h1>
            <p className="text-base text-text-secondary">
              Track your purchases and manage your orders
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark font-medium transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-border p-4 sm:p-5 mb-6 shadow-sm">
          {/* Status Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-warm text-text-secondary hover:bg-warm-ivory border border-border'
                }`}
              >
                {filter.label}
                <span className={`ml-2 text-xs ${
                  activeFilter === filter.id ? 'text-white/80' : 'text-text-tertiary'
                }`}>
                  ({statusCounts[filter.id]})
                </span>
              </button>
            ))}
          </div>

          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="flex-1 relative">
              <svg 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by order number..."
                className="w-full pl-10 pr-4 py-2.5 border border-border bg-warm rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2.5 border border-border bg-warm rounded-lg text-sm font-medium text-text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Results Info */}
        {!showNoResults && filteredOrders.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-text-secondary">
              Showing <span className="font-medium text-text-primary">{filteredOrders.length}</span> {filteredOrders.length === 1 ? 'order' : 'orders'}
            </p>
            {(activeFilter !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="text-sm text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* No Results State */}
        {showNoResults && (
          <div className="bg-white rounded-xl border border-border p-12 text-center">
            <div className="w-16 h-16 bg-warm-ivory rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-text-primary mb-2">No orders found</h3>
            <p className="text-sm text-text-secondary mb-6">
              No orders match your current filters or search query
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset filters
            </button>
          </div>
        )}

        {/* Order Cards */}
        {!showNoResults && (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-5 sm:p-6">
                  {/* Order Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5 pb-5 border-b border-border">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-text-primary">
                          Order #{order.id}
                        </h3>
                        <span className={`px-3 py-1 rounded-md text-xs font-medium ${getStatusBadge(order.status)}`}>
                          {getStatusLabel(order.status)}
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-text-secondary mb-1">Total</p>
                      <p className="text-xl font-semibold text-text-primary">
                        SAR {order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Order Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to={`/orders/${order.id}`}
                      className="flex-1 sm:flex-initial bg-primary hover:bg-primary-dark text-white text-center py-2.5 px-6 text-sm font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                    >
                      View Details
                    </Link>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="flex-1 sm:flex-initial bg-warm hover:bg-warm-ivory text-text-primary border border-border py-2.5 px-6 text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer"
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Orders;
