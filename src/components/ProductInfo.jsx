function ProductInfo({ product, loading = false, error = false }) {
  if (error) {
    return (
      <div
        className="space-y-3"
        role="alert"
      >
        <p className="text-sm text-text-secondary">
          Unable to load product information.
        </p>
      </div>
    );
  }

  if (loading || !product) {
    return (
      <div
        className="space-y-4 animate-pulse"
        aria-busy="true"
        aria-label="Loading product information"
      >
        {/* Category Skeleton */}
        <div className="h-8 w-28 rounded-full bg-stone-200" />

        {/* Title Skeleton */}
        <div className="space-y-3">
          <div className="h-9 sm:h-11 lg:h-12 w-full max-w-lg rounded-md bg-stone-200" />
          <div className="h-9 sm:h-11 lg:h-12 w-3/4 max-w-md rounded-md bg-stone-200" />
        </div>

        {/* Author Skeleton */}
        <div className="h-6 w-40 rounded-md bg-stone-200" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <span className="inline-block text-xs uppercase tracking-widest text-text-tertiary font-medium bg-warm rounded-full px-4 py-2">
        {product.category}
      </span>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-text-primary tracking-tight leading-tight">
        {product.title}
      </h1>

      <p className="text-lg text-text-secondary font-medium">
        by {product.author}
      </p>
    </div>
  );
}
export default ProductInfo;
