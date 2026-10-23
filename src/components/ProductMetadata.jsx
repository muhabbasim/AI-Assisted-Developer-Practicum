function ProductMetadata({ product }) {
  const metadata = [];

  if (product.format) {
    metadata.push({
      label: 'Format',
      value: product.format
    });
  }

  if (product.pageCount) {
    metadata.push({
      label: 'Pages',
      value: product.pageCount
    });
  }

  if (metadata.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-6 py-4 border-t border-b border-border">
      {metadata.map((item) => (
        <div key={item.label} className="flex flex-col gap-1">
          <span className="text-xs uppercase tracking-wide text-text-tertiary font-semibold">
            {item.label}
          </span>
          <span className="text-sm text-text-primary font-medium">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ProductMetadata;
