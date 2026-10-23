import { Link } from 'react-router-dom';
import QuantityStepper from './QuantityStepper';
import AddToCartButton from './AddToCartButton';

function ProductActions({ 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  isAdding,
  continueBrowsingLink = '/'
}) {
  return (
    <div className="space-y-6">
      {/* Quantity Stepper */}
      <div className="flex flex-col gap-3 max-w-xs">
        <label className="text-sm font-medium text-text-primary uppercase tracking-wide">
          Quantity
        </label>
        <QuantityStepper 
          initialValue={quantity} 
          onQuantityChange={onQuantityChange} 
        />
      </div>

      {/* Add to Cart Button */}
      <div className="flex flex-col gap-4">
        <AddToCartButton 
          onAddToCart={onAddToCart}
          isAdding={isAdding}
        />

        <Link 
          to={continueBrowsingLink} 
          className="text-center text-sm text-text-secondary hover:text-primary transition-colors py-2 rounded-lg hover:bg-warm inline-flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth={2}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}

export default ProductActions;
