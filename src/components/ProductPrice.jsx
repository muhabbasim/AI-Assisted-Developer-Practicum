/**
 * Calculate discount percentage
 * @param {number} salePrice - Original price before discount
 * @param {number} price - Current price after discount
 * @returns {number} Discount percentage
 */
function calculateDiscount(salePrice, price) {
  return Math.round(((salePrice - price) / salePrice) * 100);
}

function ProductPrice({ price, salePrice }) {
  const discount = salePrice ? calculateDiscount(salePrice, price) : 0;

  return (
    <div className="flex items-baseline gap-3 py-6 border-b border-border">
      <span className="text-3xl font-semibold text-text-primary">
        SAR {Number(price).toFixed(2)}
      </span>
      {salePrice && (
        <>
          <span className="text-lg text-text-tertiary line-through">
            SAR {salePrice.toFixed(2)}
          </span>
          <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
            Save {discount}%
          </span>
        </>
      )}
    </div>
  );
}

export default ProductPrice;
