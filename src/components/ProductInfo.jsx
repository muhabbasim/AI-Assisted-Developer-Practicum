function ProductInfo({ product }) {
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
