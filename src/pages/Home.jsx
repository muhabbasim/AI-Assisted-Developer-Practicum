import { useState } from 'react';
import { products, categories } from '../data/products';
import ProductCard from '../components/product_card/ProductCard';
import Slider from '../components/Slider';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) => {
    const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-10">
        {/* Slider/Hero */}
        <div className="mb-10 sm:mb-14">
          <Slider imageSrc="https://images.unsplash.com/photo-1524883173980-67b26d34e82c?q=80&w=1740" />
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 mb-10 sm:mb-14 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Search */}
            <div className="w-full lg:flex-1">
              <div className="relative">
                <svg 
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 border border-border rounded-lg text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="w-full lg:w-auto">
              <div className="flex gap-3 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-transparent text-text-secondary border border-border hover:border-primary hover:text-primary hover:shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-text-tertiary font-medium">
              {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-border shadow-sm">
            <div className="max-w-md mx-auto px-6">
              <p className="text-xl font-medium text-text-primary mb-3">No products found</p>
              <p className="text-sm text-text-secondary mb-8 leading-relaxed">Try adjusting your filters or search terms</p>
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                }}
                className="bg-primary text-white px-8 py-3.5 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 hover:bg-primary-dark shadow-sm hover:shadow-md cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
