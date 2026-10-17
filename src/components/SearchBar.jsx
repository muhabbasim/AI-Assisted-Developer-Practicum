import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function SearchBar({ products, onSearch, searchValue }) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products based on search input
  useEffect(() => {
    if (searchValue.trim().length > 0) {
      const filtered = products
        .filter(p => 
          p.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.author.toLowerCase().includes(searchValue.toLowerCase()) ||
          p.category.toLowerCase().includes(searchValue.toLowerCase())
        )
        .slice(0, 5); // Show max 5 suggestions
      
      setSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [searchValue, products]);

  const handleInputChange = (e) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    onSearch('');
    setIsOpen(false);
  };

  const handleSuggestionClick = () => {
    setIsOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            className="w-5 h-5 text-text-tertiary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Search by title, author, ISBN, or topic..."
          value={searchValue}
          onChange={handleInputChange}
          onFocus={() => searchValue.trim() && suggestions.length > 0 && setIsOpen(true)}
          className="w-full pl-14 pr-14 py-4 bg-white border-2 border-border rounded-2xl text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm hover:shadow-md focus:shadow-lg"
          aria-label="Search books"
          aria-expanded={isOpen}
          aria-controls="search-suggestions"
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Clear search"
          >
            <svg 
              className="w-5 h-5 text-text-tertiary hover:text-text-primary transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div 
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up"
        >
          <div className="py-2">
            {/* Results Header */}
            <div className="px-5 py-3 border-b border-border">
              <p className="text-xs uppercase tracking-[0.15em] text-text-tertiary font-semibold">
                Suggested Books ({suggestions.length})
              </p>
            </div>

            {/* Suggestions List */}
            <ul className="max-h-[400px] overflow-y-auto">
              {suggestions.map((product) => {
                const discount = product.salePrice 
                  ? Math.round(((product.salePrice - product.price) / product.salePrice) * 100)
                  : 0;

                return (
                  <li key={product.id}>
                    <Link
                      to={`/product/${product.id}`}
                      onClick={handleSuggestionClick}
                      className="flex items-center gap-4 px-5 py-4 hover:bg-warm transition-all duration-200 cursor-pointer group"
                    >
                      {/* Book Cover - Portrait */}
                      <div className="w-12 h-18 bg-warm-ivory rounded-lg overflow-hidden flex-shrink-0 border border-border/50 relative shadow-sm">
                        <img 
                          src={product.image} 
                          alt={`${product.title} by ${product.author}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {product.salePrice && (
                          <div className="absolute top-1 right-1 bg-primary text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                            -{discount}%
                          </div>
                        )}
                      </div>

                      {/* Book Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.15em] text-text-tertiary font-semibold mb-0.5">
                          {product.category}
                        </p>
                        <h4 className="text-sm font-semibold text-text-primary mb-0.5 line-clamp-1 group-hover:text-primary transition-colors">
                          {product.title}
                        </h4>
                        <p className="text-xs text-text-secondary mb-1 line-clamp-1">
                          by {product.author}
                        </p>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-bold text-primary">
                            SAR {product.price.toFixed(2)}
                          </span>
                          {product.salePrice && (
                            <span className="text-xs text-text-tertiary line-through">
                              SAR {product.salePrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* View All Results Footer */}
            <div className="px-5 py-3 border-t border-border bg-warm/30">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full text-sm font-semibold text-primary hover:text-primary-dark transition-colors text-center cursor-pointer"
              >
                View all results ({suggestions.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* No Results State */}
      {isOpen && searchValue.trim() && suggestions.length === 0 && (
        <div 
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-border rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-up"
        >
          <div className="px-5 py-8 text-center">
            <div className="w-16 h-16 bg-warm-ivory rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-text-primary mb-1">No books found</p>
            <p className="text-xs text-text-tertiary">Try different keywords or browse all books</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
