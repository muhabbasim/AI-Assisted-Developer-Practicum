import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCartContext } from '../../context/CartContext';
import QuantityStepper from '../QuantityStepper';

function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!isAdding) {
      setIsAdding(true);
      try {
        await addToCart(product, quantity);
        setQuantity(1);
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  const discount = product.salePrice 
    ? Math.round(((product.salePrice - product.price) / product.salePrice) * 100)
    : 0;

  return (
    <div className="group flex flex-col bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl h-full">
      {/* Product Image - 1:1 aspect ratio with consistent presentation */}
      <Link to={`/product/${product.id}`} className="relative overflow-hidden bg-gray-50 cursor-pointer">
        <div className="aspect-square w-full">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {product.salePrice && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
            <div className="bg-black text-white text-[9px] sm:text-[10px] font-semibold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full tracking-wider">
              -{discount}%
            </div>
          </div>
        )}
      </Link>

      {/* Product Info - Responsive spacing */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 lg:p-5">
        {/* Category */}
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-1.5 sm:mb-2">
          {product.category}
        </span>
        
        {/* Title - Consistent height with line clamping */}
        <Link to={`/product/${product.id}`} className="mb-2 sm:mb-3 cursor-pointer">
          <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 leading-snug sm:leading-relaxed group-hover:text-primary transition-colors duration-300 min-h-[2.25rem] sm:min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Price - Responsive sizing */}
        <div className="flex items-baseline gap-1.5 sm:gap-2.5 mb-3 sm:mb-4">
          <span className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900">
            SAR {product.price.toFixed(2)}
          </span>
          {product.salePrice && (
            <span className="text-[10px] sm:text-xs text-gray-400 line-through">
              SAR {product.salePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions - Responsive layout */}
        <div className="flex flex-col gap-2 sm:gap-2.5 mt-auto">
          <QuantityStepper initialValue={quantity} onQuantityChange={setQuantity} />
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3 rounded-lg sm:rounded-xl tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 flex items-center justify-center gap-2 cursor-pointer touch-manipulation"
            aria-busy={isAdding}
          >
            {isAdding ? (
              <>
                <svg
                  className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span className="hidden xs:inline">Adding...</span>
                <span className="xs:hidden">...</span>
              </>
            ) : (
              <>
                <span className="hidden xs:inline">Add to Cart</span>
                <span className="xs:hidden">Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
