import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/product_card/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import Slider from '../components/Slider';
import SearchBar from '../components/SearchBar';

// Categories from backend
const categories = [
  "All",
  "Fiction",
  "Mystery",
  "Science Fiction",
  "Fantasy",
  "Business",
  "Technology",
  "Psychology",
  "History",
  "Self-Help",
  "Biography",
  "Science",
  "Philosophy",
  "Historical Fiction",
];

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {};
      if (selectedCategory !== 'All') {
        filters.category = selectedCategory;
      }
      if (search.trim()) {
        filters.search = search;
      }

      const response = await productsAPI.getAll(filters);
      setProducts(response.products || []);
    } catch (err) {
      setError(err.message || 'Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Get featured book (first product or fallback)
  const featuredProduct = {
    id: 1,
    name: "Featured Book",
    author: "Author Name",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1740",
    description: "Discover our featured collection"
  };

  const filtered = products;

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-10">
        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-8">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold">Error loading products</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Literary Hero Section */}
        <div className="mb-12 sm:mb-16">
          <Slider 
            imageSrc="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=1740" 
            featuredProduct={featuredProduct}
          />
        </div>

        {/* Premium Search & Filter Section */}
        <div className="mb-12 sm:mb-16">
          {/* Search Bar - Prominent & Refined */}
          <div className="mb-8">
            <div className="max-w-3xl mx-auto">
              <SearchBar 
                products={products} 
                onSearch={setSearch}
                searchValue={search}
              />
            </div>
          </div>

          {/* Category Filters - Clean & Minimal */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.2em] text-text-tertiary font-semibold">
                Filter by:
              </span>
              <div className="flex gap-2 flex-wrap justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 text-sm font-semibold tracking-wide rounded-full transition-all duration-300 cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-primary text-white shadow-md scale-105'
                        : 'bg-white text-text-secondary border-2 border-border hover:border-primary hover:text-primary hover:shadow-sm'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count - Refined */}
            {!loading && (search || selectedCategory !== 'All') && (
              <div className="flex items-center gap-4 text-sm">
                <p className="text-text-tertiary font-medium">
                  {filtered.length} {filtered.length === 1 ? 'book' : 'books'} found
                </p>
                {(search || selectedCategory !== 'All') && (
                  <>
                    <span className="text-border">•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setSearch('');
                        setSelectedCategory('All');
                      }}
                      className="text-primary font-semibold hover:text-primary-dark transition-colors cursor-pointer"
                    >
                      Clear filters
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Product Grid with Scroll Anchor */}
        <div id="products" className="max-w-[1600px] mx-auto">
          {loading ? (
            /* Skeleton Loading State */
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6">
              {[...Array(10)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-4 md:gap-5 lg:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-border shadow-xl">
              <div className="max-w-md mx-auto px-6">
                {/* Empty State Icon */}
                <div className="w-20 h-20 bg-warm-ivory rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                
                <p className="text-xl font-semibold text-text-primary mb-2">No books found</p>
                <p className="text-sm text-text-secondary mb-8 leading-relaxed">
                  We couldn't find any books matching your search. Try adjusting your filters or search terms.
                </p>
                
                <button
                  type="button"
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('All');
                  }}
                  className="bg-primary text-white px-8 py-4 text-sm font-semibold tracking-wide rounded-xl transition-all duration-300 hover:bg-primary-dark shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer inline-flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;
