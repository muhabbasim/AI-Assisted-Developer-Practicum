import ProductInfo from './ProductInfo';
import ProductMetadata from './ProductMetadata';
import ProductPrice from './ProductPrice';
import ProductActions from './ProductActions';

function ProductDetails({ 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  isAdding 
}) {
  return (
    <div className="flex flex-col gap-8 lg:py-8">
      {/* Product Info */}
      <ProductInfo product={product} />

      {/* Description */}
      <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
        {product.description}
      </p>

      {/* Metadata (Format, Pages) */}
      <ProductMetadata product={product} />

      {/* Price */}
      <ProductPrice price={product.price} salePrice={product.salePrice} />

      {/* Actions (Quantity + Add to Cart) */}
      <ProductActions
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        onAddToCart={onAddToCart}
        isAdding={isAdding}
      />
    </div>
  );
}

export default ProductDetails;
