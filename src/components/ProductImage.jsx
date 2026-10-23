import ProductBadges from './ProductBadges';

function ProductImage({ product, className = '' }) {
  return (
    <div className="relative">
      <div className={`sticky top-24 ${className}`}>
        <div className="bg-warm-ivory rounded-2xl overflow-hidden shadow-md p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={`${product.title} by ${product.author}`}
            className="w-full max-w-sm aspect-[2/3] object-contain hover:scale-105 transition-transform duration-500"
          />
        </div>
        {/* Badges */}
        <ProductBadges product={product} position="absolute" />
      </div>
    </div>
  );
}

export default ProductImage;
