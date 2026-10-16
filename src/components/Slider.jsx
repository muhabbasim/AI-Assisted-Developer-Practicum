function Slider({ imageSrc }) {
  return (
    <div className="relative w-full bg-warm-ivory rounded-2xl overflow-hidden group shadow-md">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Text Content - Asymmetric layout */}
        <div className="py-16 sm:py-20 lg:py-24 lg:pl-8 px-6 sm:px-8 order-2 lg:order-1">
          <div className="max-w-xl space-y-6">
            <div className="inline-block">
              <span className="text-xs uppercase tracking-widest text-primary font-medium bg-primary/5 px-4 py-2 rounded-full">Premium Collection</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-text-primary tracking-tight leading-none">
              Audio<br />for the<br />discerning
            </h1>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
              Discover carefully curated headphones, earbuds, and audio equipment that elevate your listening experience.
            </p>
            <button className="mt-6 bg-primary text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 hover:bg-primary-dark inline-flex items-center gap-2 group shadow-sm hover:shadow-md">
              Explore Collection
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Image */}
        <div className="relative h-80 sm:h-96 lg:h-[32rem] order-1 lg:order-2 lg:rounded-r-2xl overflow-hidden">
          <img 
            src={imageSrc}
            alt="Featured products - Premium Audio Collection"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            loading="eager" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
