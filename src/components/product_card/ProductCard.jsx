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
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-xl h-full">
      {/* Product Image - Compact premium aspect ratio */}
      <Link to={`/product/${product.id}`} className="relative overflow-hidden bg-gray-50 cursor-pointer">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
        {product.salePrice && (
          <div className="absolute top-4 right-4">
            <div className="bg-black text-white text-[10px] font-semibold px-3 py-1.5 rounded-full tracking-wider">
              -{discount}%
            </div>
          </div>
        )}
      </Link>

      {/* Product Info - Compact premium spacing */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold mb-2">
          {product.category}
        </span>
        
        {/* Title */}
        <Link to={`/product/${product.id}`} className="mb-3 cursor-pointer">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-relaxed group-hover:text-primary transition-colors duration-300 min-h-[2.5rem]">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2.5 mb-4">
          <span className="text-lg font-semibold text-gray-900">
            SAR {product.price.toFixed(2)}
          </span>
          {product.salePrice && (
            <span className="text-xs text-gray-400 line-through">
              SAR {product.salePrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Actions - Clean vertical layout */}
        <div className="flex flex-col gap-2.5 mt-auto">
          <QuantityStepper initialValue={quantity} onQuantityChange={setQuantity} />
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium py-3 rounded-xl tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-900 flex items-center justify-center gap-2 cursor-pointer"
            aria-busy={isAdding}
          >
            {isAdding ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
                <span>Adding...</span>
              </>
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
