import { Link } from 'react-router-dom';

function Slider({ imageSrc, featuredProduct }) {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Main Hero Container - Asymmetric Editorial Layout */}
      <div className="relative bg-gradient-to-br from-warm-ivory via-white to-warm rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Content - Editorial Text Block */}
          <div className="lg:col-span-5 py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-12 flex flex-col justify-center order-2 lg:order-1 relative">
            {/* Decorative Element */}
            <div className="absolute top-0 left-0 w-1 h-24 bg-gradient-to-b from-primary to-lime opacity-80 hidden lg:block"></div>
            
            <div className="space-y-8 relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 px-4 py-2 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="text-xs uppercase tracking-[0.2em] text-primary font-semibold">
                  Premium Collection 2025
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary tracking-tight leading-[0.95] mb-4">
                  Sound
                  <span className="block text-primary mt-1">Elevated</span>
                </h1>
                <div className="w-16 h-1 bg-lime rounded-full"></div>
              </div>

              {/* Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-md font-light">
                Experience precision audio with our handpicked collection of premium headphones and earbuds. 
                <span className="font-medium text-text-primary"> Designed for the discerning listener.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  to="/#products" 
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 text-sm font-semibold tracking-wide rounded-xl transition-all duration-300 hover:bg-primary-dark shadow-lg hover:shadow-xl hover:scale-[1.02] group cursor-pointer"
                >
                  Shop Collection
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  to="/#products" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 text-sm font-semibold tracking-wide rounded-xl border-2 border-primary/20 transition-all duration-300 hover:border-primary hover:bg-primary/5 cursor-pointer"
                >
                  Explore Products
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-text-tertiary font-medium">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                  <span className="text-xs text-text-tertiary font-medium">Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  <span className="text-xs text-text-tertiary font-medium">Authentic Products</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Product Showcase */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={imageSrc}
                alt="Premium audio collection showcase"
                className="w-full h-full object-cover" 
                loading="eager" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            {/* Featured Product Card - Floating */}
            {featuredProduct && (
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 max-w-xs">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/50 hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-warm-ivory rounded-xl overflow-hidden flex-shrink-0 border border-border/50">
                      <img 
                        src={featuredProduct.image} 
                        alt={featuredProduct.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold mb-1">
                        Featured
                      </p>
                      <h3 className="text-sm font-semibold text-text-primary mb-1 line-clamp-2 leading-tight">
                        {featuredProduct.title}
                      </h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-bold text-primary">
                          SAR {featuredProduct.price.toFixed(2)}
                        </span>
                        {featuredProduct.salePrice && (
                          <span className="text-xs text-text-tertiary line-through">
                            SAR {featuredProduct.salePrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link 
                    to={`/product/${featuredProduct.id}`}
                    className="mt-4 w-full bg-primary text-white px-4 py-2.5 text-xs font-semibold tracking-wide rounded-lg transition-all duration-300 hover:bg-primary-dark flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    View Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            )}

            {/* Decorative Elements */}
            <div className="absolute top-8 left-8 w-20 h-20 bg-lime/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
