import { useState } from 'react';

function QuantityStepper({ initialValue = 1, onQuantityChange }) {
  const [quantity, setQuantity] = useState(initialValue);

  const increment = () => {
    const next = quantity + 1;
    setQuantity(next);
    if (onQuantityChange) onQuantityChange(next);
  };

  const decrement = () => {
    const next = Math.max(1, quantity - 1);
    setQuantity(next);
    if (onQuantityChange) onQuantityChange(next);
  };

  const handleChange = (e) => {
    const val = Math.max(1, Number(e.target.value) || 1);
    setQuantity(val);
    if (onQuantityChange) onQuantityChange(val);
  };

  return (
    <div className="flex items-center justify-center border border-border rounded-lg overflow-hidden hover:border-primary transition-colors shadow-sm">
      <button
        type="button"
        onClick={decrement}
        className="px-4 py-2.5 text-text-primary hover:bg-sage/20 transition-all duration-200 font-normal text-base"
        aria-label="Decrease quantity"
      >
        &minus;
      </button>
      <input
        type="number"
        value={quantity}
        onChange={handleChange}
        className="w-14 text-center bg-transparent py-2.5 text-sm font-medium text-text-primary focus:outline-none"
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={increment}
        className="px-4 py-2.5 text-text-primary hover:bg-sage/20 transition-all duration-200 font-normal text-base"
        aria-label="Increase quantity"
      >
        &#43;
      </button>
    </div>
  );
}

export default QuantityStepper;
