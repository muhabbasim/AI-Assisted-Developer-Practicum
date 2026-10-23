import { Link } from 'react-router-dom';
import QuantityStepper from './QuantityStepper';

function CartItem({ item, onQuantityChange, onRemove, showBorder = true }) {
  const { product, quantity } = item;
  const itemTotal = product.price * quantity;

  return (
    <div
      className={`p-6 sm:p-8 flex flex-col sm:flex-row gap-6 ${
        showBorder ? 'border-b border-border' : ''
      }`}
    >
      {/* Product Image */}
      <Link 
        to={`/product/${product.id}`} 
        className="flex-shrink-0 cursor-pointer"
      >
        <div className="w-full sm:w-32 h-32 bg-warm-ivory rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between gap-4">
        <div>
          <Link
            to={`/product/${product.id}`}
            className="text-base font-medium text-text-primary hover:text-primary transition-colors cursor-pointer"
          >
            {product.name}
          </Link>
          <p className="text-sm text-text-tertiary mt-1.5 uppercase tracking-wide">
            {product.category}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="max-w-[140px]">
            <QuantityStepper
              initialValue={quantity}
              onQuantityChange={(newQty) => onQuantityChange(product.id, newQty)}
            />
          </div>
          <div className="text-right">
            <span className="text-lg font-semibold text-text-primary">
              SAR {itemTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <button
        type="button"
        onClick={() => onRemove(product.id)}
        className="text-text-tertiary hover:text-primary text-sm font-medium self-start sm:self-center transition-colors px-3 py-2 rounded-lg hover:bg-warm cursor-pointer"
      >
        Remove
      </button>
    </div>
  );
}

export default CartItem;
