import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { ordersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, totalPrice, fetchCart } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Contact information
    email: '',
    phone: '',
    
    // Shipping address
    fullName: '',
    country: 'Saudi Arabia',
    city: '',
    district: '',
    streetAddress: '',
    buildingNumber: '',
    postalCode: '',
    
    // Delivery method
    deliveryMethod: 'standard',
    
    // Payment method
    paymentMethod: 'cod',
    
    // Promo code
    promoCode: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  // Shipping options
  const shippingOptions = [
    { id: 'standard', name: 'Standard Delivery', time: '3-5 business days', price: 0 },
    { id: 'express', name: 'Express Delivery', time: '1-2 business days', price: 25 },
  ];

  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  // Payment methods
  const paymentMethods = [
    { id: 'cod', name: 'Cash on Delivery', icon: '💵' },
    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
    { id: 'mada', name: 'Mada', icon: '🇸🇦' },
  ];

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        fullName: user.name || '',
      }));
    }
  }, [user]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  // Calculate totals with proper number handling
  const calculateTotals = () => {
    // Convert string prices to numbers and calculate subtotal
    const subtotal = cartItems.reduce((sum, item) => {
      const price = typeof item.product.price === 'string' 
        ? parseFloat(item.product.price) 
        : item.product.price;
      return sum + (price * item.quantity);
    }, 0);

    const shipping = selectedShipping.price;
    const discount = promoDiscount;
    const tax = 0; // Assuming prices include VAT
    const total = subtotal + shipping - discount + tax;

    return {
      subtotal: subtotal,
      shipping: shipping,
      discount: discount,
      tax: tax,
      total: total,
    };
  };

  const totals = calculateTotals();

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Validate field
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email';
        }
        break;
      case 'phone':
        if (!value) {
          error = 'Phone number is required';
        } else if (!/^(05|5)(5|0|3|6|4|9|1|8|7)\d{7}$/.test(value.replace(/[\s-]/g, ''))) {
          error = 'Please enter a valid Saudi phone number';
        }
        break;
      case 'fullName':
        if (!value) error = 'Full name is required';
        else if (value.length < 3) error = 'Name must be at least 3 characters';
        break;
      case 'city':
        if (!value) error = 'City is required';
        break;
      case 'district':
        if (!value) error = 'District is required';
        break;
      case 'streetAddress':
        if (!value) error = 'Street address is required';
        break;
      case 'buildingNumber':
        if (!value) error = 'Building number is required';
        break;
      default:
        break;
    }

    return error;
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setFormErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate entire form
  const validateForm = () => {
    const requiredFields = [
      'email', 'phone', 'fullName', 'city', 
      'district', 'streetAddress', 'buildingNumber'
    ];

    const errors = {};
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    setFormErrors(errors);
    setTouched(
      requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    return Object.keys(errors).length === 0;
  };

  // Handle delivery method change
  const handleDeliveryChange = (option) => {
    setSelectedShipping(option);
    setFormData(prev => ({ ...prev, deliveryMethod: option.id }));
  };

  // Handle payment method change
  const handlePaymentChange = (methodId) => {
    setFormData(prev => ({ ...prev, paymentMethod: methodId }));
  };

  // Handle promo code application
  const handleApplyPromo = async () => {
    if (!formData.promoCode.trim()) return;

    setPromoLoading(true);
    
    // Simulate promo code validation (would be API call in production)
    setTimeout(() => {
      const code = formData.promoCode.toUpperCase();
      if (code === 'SAVE10') {
        setPromoDiscount(totals.subtotal * 0.1);
        setPromoApplied(true);
        setError('');
      } else {
        setError('Invalid promo code');
        setPromoDiscount(0);
        setPromoApplied(false);
      }
      setPromoLoading(false);
    }, 800);
  };

  // Handle order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setError('Please fill in all required fields correctly');
      // Scroll to first error
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    try {
      setIsProcessing(true);
      setError('');

      // In production, this would send full order details
      const response = await ordersAPI.createOrder();

      if (response.success) {
        // Refresh cart (should be empty now)
        await fetchCart();
        
        // Navigate to order confirmation
        navigate(`/orders/${response.order.id}`);
      }
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <main className="w-full flex-auto bg-warm">
      <div className="container py-6 sm:py-8 lg:py-12">
        {/* Progress indicator */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {['Cart', 'Information', 'Payment'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                    index === 0 ? 'bg-primary/10 text-primary' :
                    index === 1 ? 'bg-primary text-white' :
                    'bg-gray-200 text-text-tertiary'
                  }`}>
                    {index === 0 ? '✓' : index + 1}
                  </div>
                  <span className={`hidden sm:inline ${
                    index === 1 ? 'text-text-primary font-medium' : 'text-text-tertiary'
                  }`}>
                    {step}
                  </span>
                </div>
                {index < 2 && (
                  <div className={`w-8 sm:w-16 h-[2px] mx-2 sm:mx-3 ${
                    index === 0 ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 sm:px-6 py-3 sm:py-4 rounded-lg mb-6 text-sm animate-fade-in">
            {error}
          </div>
        )}

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Checkout form - Left side */}
          <div className="lg:col-span-7 xl:col-span-7">
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Contact Information */}
              <section className="bg-white rounded-xl border border-border p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">📧</span>
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">Contact Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="your.email@example.com"
                      autoComplete="email"
                      data-error={touched.email && formErrors.email ? 'true' : undefined}
                      className={`input-field ${touched.email && formErrors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {touched.email && formErrors.email && (
                      <p className="mt-1.5 text-xs text-red-600">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1.5">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="05XXXXXXXX"
                      autoComplete="tel"
                      data-error={touched.phone && formErrors.phone ? 'true' : undefined}
                      className={`input-field ${touched.phone && formErrors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {touched.phone && formErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-white rounded-xl border border-border p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">📍</span>
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">Shipping Address</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-text-primary mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      data-error={touched.fullName && formErrors.fullName ? 'true' : undefined}
                      className={`input-field ${touched.fullName && formErrors.fullName ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {touched.fullName && formErrors.fullName && (
                      <p className="mt-1.5 text-xs text-red-600">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-text-primary mb-1.5">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      readOnly
                      className="input-field bg-gray-50 cursor-not-allowed"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-text-primary mb-1.5">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g., Riyadh"
                        autoComplete="address-level2"
                        data-error={touched.city && formErrors.city ? 'true' : undefined}
                        className={`input-field ${touched.city && formErrors.city ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {touched.city && formErrors.city && (
                        <p className="mt-1.5 text-xs text-red-600">{formErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="district" className="block text-sm font-medium text-text-primary mb-1.5">
                        District <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="e.g., Al Olaya"
                        data-error={touched.district && formErrors.district ? 'true' : undefined}
                        className={`input-field ${touched.district && formErrors.district ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {touched.district && formErrors.district && (
                        <p className="mt-1.5 text-xs text-red-600">{formErrors.district}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="streetAddress" className="block text-sm font-medium text-text-primary mb-1.5">
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="streetAddress"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      placeholder="Street name and number"
                      autoComplete="address-line1"
                      data-error={touched.streetAddress && formErrors.streetAddress ? 'true' : undefined}
                      className={`input-field ${touched.streetAddress && formErrors.streetAddress ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {touched.streetAddress && formErrors.streetAddress && (
                      <p className="mt-1.5 text-xs text-red-600">{formErrors.streetAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="buildingNumber" className="block text-sm font-medium text-text-primary mb-1.5">
                        Building Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="buildingNumber"
                        name="buildingNumber"
                        value={formData.buildingNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="Building or unit number"
                        data-error={touched.buildingNumber && formErrors.buildingNumber ? 'true' : undefined}
                        className={`input-field ${touched.buildingNumber && formErrors.buildingNumber ? 'border-red-400 focus:border-red-500 focus:ring-red-500' : ''}`}
                      />
                      {touched.buildingNumber && formErrors.buildingNumber && (
                        <p className="mt-1.5 text-xs text-red-600">{formErrors.buildingNumber}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-text-primary mb-1.5">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="Optional"
                        autoComplete="postal-code"
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Delivery Method */}
              <section className="bg-white rounded-xl border border-border p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">🚚</span>
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">Delivery Method</h2>
                </div>
                
                <div className="space-y-3">
                  {shippingOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleDeliveryChange(option)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        selectedShipping.id === option.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedShipping.id === option.id
                            ? 'border-primary'
                            : 'border-gray-300'
                        }`}>
                          {selectedShipping.id === option.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-text-primary">{option.name}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{option.time}</p>
                        </div>
                      </div>
                      <div className="text-sm font-semibold text-text-primary">
                        {option.price === 0 ? 'Free' : formatCurrency(option.price)}
                      </div>
                    </button>
                  ))}
                </div>
              </section>

              {/* Payment Method */}
              <section className="bg-white rounded-xl border border-border p-5 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="text-primary text-lg">💳</span>
                  </div>
                  <h2 className="text-lg font-semibold text-text-primary">Payment Method</h2>
                </div>
                
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => handlePaymentChange(method.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        formData.paymentMethod === method.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === method.id
                            ? 'border-primary'
                            : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === method.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-text-primary">{method.name}</p>
                        </div>
                      </div>
                      <span className="text-xl">{method.icon}</span>
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      Payment integration will be available in the next update. For now, please use Cash on Delivery.
                    </p>
                  </div>
                )}
              </section>

              {/* Mobile Order Button */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isProcessing || formData.paymentMethod === 'card'}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-base font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 touch-manipulation"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    `Place Order · ${formatCurrency(totals.total)}`
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary - Right side */}
          <div className="lg:col-span-5 xl:col-span-5">
            <div className="space-y-5 lg:sticky lg:top-6 lg:self-start">
              {/* Order items */}
              <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-5 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => {
                    const price = typeof item.product.price === 'string' 
                      ? parseFloat(item.product.price) 
                      : item.product.price;
                    const lineTotal = price * item.quantity;

                    return (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="relative">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg bg-warm-ivory"
                          />
                          <div className="absolute -top-2 -right-2 w-5 h-5 bg-sage text-white text-xs rounded-full flex items-center justify-center font-medium">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text-primary truncate">{item.product.name}</p>
                          <p className="text-xs text-text-secondary mt-0.5 capitalize">{item.product.category}</p>
                        </div>
                        <div className="text-sm font-semibold text-text-primary whitespace-nowrap">
                          {formatCurrency(lineTotal)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Promo code */}
                <div className="border-t border-border pt-4 mb-4">
                  {!showPromoInput ? (
                    <button
                      type="button"
                      onClick={() => setShowPromoInput(true)}
                      className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>🏷️</span>
                      Add promo code
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={formData.promoCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, promoCode: e.target.value.toUpperCase() }))}
                          placeholder="Enter code"
                          disabled={promoApplied}
                          className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-50"
                        />
                        {!promoApplied ? (
                          <button
                            type="button"
                            onClick={handleApplyPromo}
                            disabled={promoLoading || !formData.promoCode}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {promoLoading ? '...' : 'Apply'}
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setPromoApplied(false);
                              setPromoDiscount(0);
                              setFormData(prev => ({ ...prev, promoCode: '' }));
                            }}
                            className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      {promoApplied && (
                        <p className="text-xs text-green-600">✓ Promo code applied successfully!</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Subtotal</span>
                    <span className="font-medium text-text-primary">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Shipping</span>
                    <span className="font-medium text-text-primary">
                      {totals.shipping === 0 ? (
                        <span className="text-primary">Free</span>
                      ) : (
                        formatCurrency(totals.shipping)
                      )}
                    </span>
                  </div>

                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-{formatCurrency(promoDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-text-secondary">
                    <span>Tax (VAT included)</span>
                    <span className="font-medium text-text-primary">{formatCurrency(totals.tax)}</span>
                  </div>

                  <div className="pt-3 border-t border-border flex justify-between">
                    <span className="text-base font-semibold text-text-primary">Total</span>
                    <span className="text-lg font-bold text-text-primary">{formatCurrency(totals.total)}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Order Button */}
              <div className="hidden lg:block">
                <button
                  type="submit"
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || formData.paymentMethod === 'card'}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-4 text-base font-medium tracking-wide rounded-lg transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    `Place Order · ${formatCurrency(totals.total)}`
                  )}
                </button>

                {/* Trust indicators */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span>🔒</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span>📦</span>
                    <span>Free returns within 14 days</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <span>✓</span>
                    <span>Money-back guarantee</span>
                  </div>
                </div>

                <p className="text-xs text-text-tertiary text-center mt-4">
                  By placing this order, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
