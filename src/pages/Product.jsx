import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { products } from '../data/products';
import QuantityStepper from '../components/QuantityStepper';

function Product() {
  const { addToCart } = useCartContext();
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return (
      <main className="w-full flex-auto">
        <div className="container py-16">
          <div className="text-center bg-white rounded-2xl border border-border p-12 max-w-md mx-auto shadow-sm">
            <h2 className="text-2xl font-medium text-text-primary mb-4">Book not found</h2>
            <Link to="/" className="text-primary hover:text-primary-dark font-medium inline-flex items-center gap-2 cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to bookstore
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const handleAddToCart = async () => {
    if (!isAdding) {
      setIsAdding(true);
      try {
        await addToCart(product, quantity);
        setQuantity(1);
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setIsAdding(false);
      }
    }
  };

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Book Cover */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-warm-ivory rounded-2xl overflow-hidden shadow-md p-8 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={`${product.title} by ${product.author}`}
                  className="w-full max-w-sm aspect-[2/3] object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Badges */}
              <div className="absolute top-6 right-6 flex flex-col gap-2">
                {product.salePrice && (
                  <span className="bg-primary text-white text-xs font-medium px-4 py-2 rounded-full tracking-wide shadow-lg">
                    Sale
                  </span>
                )}
                {product.bestseller && (
                  <span className="bg-lime text-primary text-xs font-medium px-4 py-2 rounded-full tracking-wide shadow-lg">
                    Bestseller
                  </span>
                )}
                {product.newArrival && (
                  <span className="bg-sage text-white text-xs font-medium px-4 py-2 rounded-full tracking-wide shadow-lg">
                    New Arrival
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col gap-8 lg:py-8">
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

            <p className="text-base sm:text-lg text-text-secondary leading-relaxed max-w-xl">
              {product.description}
            </p>

            {/* Book Details */}
            {(product.format || product.pageCount) && (
              <div className="flex flex-wrap gap-6 py-4 border-t border-b border-border">
                {product.format && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wide text-text-tertiary font-semibold">Format</span>
                    <span className="text-sm text-text-primary font-medium">{product.format}</span>
                  </div>
                )}
                {product.pageCount && (
                  <div className="flex flex-col gap-1">
                    <span className="text-xs uppercase tracking-wide text-text-tertiary font-semibold">Pages</span>
                    <span className="text-sm text-text-primary font-medium">{product.pageCount}</span>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 py-6 border-b border-border">
              <span className="text-3xl font-semibold text-text-primary">SAR {product.price.toFixed(2)}</span>
              {product.salePrice && (
                <>
                  <span className="text-lg text-text-tertiary line-through">SAR {product.salePrice.toFixed(2)}</span>
                  <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    Save {Math.round(((product.salePrice - product.price) / product.salePrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Quantity Stepper */}
            <div className="flex flex-col gap-3 max-w-xs">
              <label className="text-sm font-medium text-text-primary uppercase tracking-wide">Quantity</label>
              <QuantityStepper initialValue={quantity} onQuantityChange={setQuantity} />
            </div>

            {/* Add to Cart Button */}
            <div className="flex flex-col gap-4 mt-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdding}
                className="w-full bg-primary hover:bg-primary-dark text-white text-base font-medium py-4 rounded-lg tracking-wide transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-primary flex items-center justify-center gap-2 min-h-[56px] cursor-pointer"
                aria-busy={isAdding}
              >
                {isAdding ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Adding...</span>
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>

              <Link 
                to="/" 
                className="text-center text-sm text-text-secondary hover:text-primary transition-colors py-2 rounded-lg hover:bg-warm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Browsing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Product;
