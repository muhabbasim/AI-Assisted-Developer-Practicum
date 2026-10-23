function ProductBadges({ product, position = 'absolute' }) {
  const badges = [];

  if (product.salePrice) {
    badges.push({
      label: 'Sale',
      className: 'bg-primary text-white'
    });
  }

  if (product.bestseller) {
    badges.push({
      label: 'Bestseller',
      className: 'bg-lime text-primary'
    });
  }

  if (product.newArrival) {
    badges.push({
      label: 'New Arrival',
      className: 'bg-sage text-white'
    });
  }

  if (badges.length === 0) return null;

  const positionClass = position === 'absolute' 
    ? 'absolute top-6 right-6' 
    : 'relative';

  return (
    <div className={`${positionClass} flex flex-col gap-2`}>
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`${badge.className} text-xs font-medium px-4 py-2 rounded-full tracking-wide shadow-lg`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}

export default ProductBadges;
