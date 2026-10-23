import CartItem from './CartItem';

function CartItemList({ items, onQuantityChange, onRemove }) {
  return (
    <div className="lg:col-span-2 bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
      {items.map((item, index) => (
        <CartItem
          key={item.product.id}
          item={item}
          onQuantityChange={onQuantityChange}
          onRemove={onRemove}
          showBorder={index !== items.length - 1}
        />
      ))}
    </div>
  );
}

export default CartItemList;
