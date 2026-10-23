import useProductDetails from '../hooks/useProductDetails';
import ProductImage from '../components/ProductImage';
import ProductDetails from '../components/ProductDetails';
import NotFound from '../components/NotFound';

function Product() {
  const { 
    product, 
    quantity, 
    setQuantity, 
    isAdding, 
    handleAddToCart 
  } = useProductDetails();

  // Show not found if product doesn't exist
  if (!product) {
    return (
      <NotFound 
        title="Book not found" 
        linkText="Back to bookstore" 
        linkTo="/" 
      />
    );
  }

  return (
    <main className="w-full flex-auto">
      <div className="container py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Product Image */}
          <ProductImage product={product} />

          {/* Product Details */}
          <ProductDetails
            product={product}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onAddToCart={handleAddToCart}
            isAdding={isAdding}
          />
        </div>
      </div>
    </main>
  );
}

export default Product;
