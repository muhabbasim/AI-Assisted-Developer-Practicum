import { useState } from 'react';
import ProductBadges from './ProductBadges';

function ProductImage({
  product,
  className = '',
  loading = false,
  error = false,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const hasError = error || imageError;
  const isLoading = loading || (!imageLoaded && !hasError);

  return (
    <div className="relative">
      <div className={`sticky top-24 ${className}`}>
        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-warm-ivory p-8 shadow-md">
          {/* Loading Skeleton */}
          {isLoading && (
            <div
              className="absolute inset-0 z-10 flex items-center justify-center p-8"
              aria-hidden="true"
            >
              <div className="relative w-full max-w-sm aspect-[2/3] overflow-hidden rounded-md bg-stone-200 animate-pulse" />
            </div>
          )}

          {/* Error State */}
          {hasError ? (
            <div
              className="flex w-full max-w-sm aspect-[2/3] flex-col items-center justify-center gap-3 text-stone-400"
              role="status"
            >
              <span className="text-4xl" aria-hidden="true">📚</span>
              <p className="text-sm">Unable to load book cover</p>
            </div>
          ) : (
            /* Product Image */
            <img
              src={product.image}
              alt={`${product.title} by ${product.author}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={`
                w-full max-w-sm aspect-[2/3] object-contain
                transition-opacity duration-500
                hover:scale-105
                ${imageLoaded && !loading ? 'opacity-100' : 'opacity-0'}
              `}
            />
          )}
        </div>

        {/* Product Badges */}
        {!loading && !hasError && imageLoaded && (
          <ProductBadges product={product} position="absolute" />
        )}
      </div>
    </div>
  );
}
export default ProductImage;
