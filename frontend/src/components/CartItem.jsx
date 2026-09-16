import { useCart } from "../context/CartContext.jsx";

function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const productId = item._id || item.id;

  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <p className="product-category">{item.category}</p>
        <h2>{item.name}</h2>
        <p>₹{item.price} each</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-selector">
          <button type="button" onClick={() => decreaseQuantity(productId)}>
            -
          </button>
          <strong>{item.quantity}</strong>
          <button type="button" onClick={() => increaseQuantity(productId)}>
            +
          </button>
        </div>
        <strong>₹{item.price * item.quantity}</strong>
        <button
          className="remove-button"
          type="button"
          onClick={() => removeFromCart(productId)}
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItem;
