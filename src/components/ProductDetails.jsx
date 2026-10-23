import ProductInfo from './ProductInfo';
import ProductMetadata from './ProductMetadata';
import ProductPrice from './ProductPrice';
import ProductActions from './ProductActions';

function ProductDetails({ 
  product, 
  quantity, 
  onQuantityChange, 
  onAddToCart, 
  isAdding,
  loading
}) {
  return (
    <div className="flex flex-col gap-8 lg:py-8">
      {/* Product Info */}
      <ProductInfo product={product} loading={loading} />

      {/* Description */}
      <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
        {product.description}
      </p>

      {/* Metadata (Format, Pages) */}
      <ProductMetadata product={product}/>

      {/* Price */}
      <ProductPrice price={product.price} salePrice={product.salePrice} loading={loading}/>

      {/* Actions (Quantity + Add to Cart) */}
      <ProductActions
        quantity={quantity}
        onQuantityChange={onQuantityChange}
        onAddToCart={onAddToCart}
        isAdding={isAdding}
        loading={loading}
      />
    </div>
  );
}

export default ProductDetails;
