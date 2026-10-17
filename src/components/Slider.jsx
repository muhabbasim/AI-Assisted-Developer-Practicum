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
                  Curated Collection
                </span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-text-primary tracking-tight leading-[0.95] mb-4">
                  Find Your Next
                  <span className="block text-primary mt-1">Favorite Book</span>
                </h1>
                <div className="w-16 h-1 bg-lime rounded-full"></div>
              </div>

              {/* Subheadline */}
              <p className="text-base sm:text-lg lg:text-xl text-text-secondary leading-relaxed max-w-md font-light">
                Discover stories that stay with you, ideas that inspire you, and books worth returning to.
                <span className="font-medium text-text-primary"> Every page, a new adventure.</span>
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link 
                  to="/#products" 
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 text-sm font-semibold tracking-wide rounded-xl transition-all duration-300 hover:bg-primary-dark shadow-lg hover:shadow-xl hover:scale-[1.02] group cursor-pointer"
                >
                  Explore Books
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link 
                  to="/#products" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 text-sm font-semibold tracking-wide rounded-xl border-2 border-primary/20 transition-all duration-300 hover:border-primary hover:bg-primary/5 cursor-pointer"
                >
                  Browse Bestsellers
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                  <span className="text-xs text-text-tertiary font-medium">Authentic Books</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span className="text-xs text-text-tertiary font-medium">Curated Selection</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Book Showcase */}
          <div className="lg:col-span-7 relative order-1 lg:order-2 min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={imageSrc}
                alt="Curated bookstore collection"
                className="w-full h-full object-cover" 
                loading="eager" 
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/40"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
            </div>

            {/* Featured Book Card - Floating */}
            {featuredProduct && (
              <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 lg:bottom-10 lg:right-10 max-w-xs">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-white/50 hover:scale-[1.02] transition-transform duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-24 bg-warm-ivory rounded-lg overflow-hidden flex-shrink-0 border border-border/50 shadow-sm">
                      <img 
                        src={featuredProduct.image} 
                        alt={`${featuredProduct.title} by ${featuredProduct.author}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-primary font-semibold mb-1">
                        Featured
                      </p>
                      <h3 className="text-sm font-semibold text-text-primary mb-0.5 line-clamp-2 leading-tight">
                        {featuredProduct.title}
                      </h3>
                      <p className="text-[10px] text-text-secondary mb-2 line-clamp-1">
                        by {featuredProduct.author}
                      </p>
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
