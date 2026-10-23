import { useState } from 'react';
import { categories } from '../data/categories';
import useProducts from '../hooks/useProducts';
import HeroSection from '../components/HeroSection';
import FilterControls from '../components/FilterControls';
import ProductGrid from '../components/ProductGrid';
import ErrorAlert from '../components/ErrorAlert';

function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Fetch products using custom hook
  const { products, loading, error } = useProducts(selectedCategory, search);

  // Get featured book (first product or fallback)
  const featuredProduct = products[0];

  // Clear all filters
  const handleClearFilters = () => {
    setSearch('');
    setSelectedCategory('All');
  };

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-10">
        {/* Error State */}
        {error && (
          <ErrorAlert 
            title="Error loading products" 
            message={error} 
          />
        )}

        {/* Literary Hero Section */}
        <HeroSection featuredProduct={featuredProduct} />

        {/* Premium Search & Filter Section */}
        <FilterControls
          products={products}
          searchValue={search}
          onSearchChange={setSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          resultCount={products.length}
          loading={loading}
          onClearFilters={handleClearFilters}
        />

        {/* Product Grid with Scroll Anchor */}
        <div id="products" className="max-w-[1600px] mx-auto">
          <ProductGrid
            products={products}
            loading={loading}
            onResetFilters={handleClearFilters}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
