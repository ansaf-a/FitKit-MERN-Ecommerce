import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import CartItem from "../components/CartItem.jsx";
import { useCart } from "../context/CartContext.jsx";

function Cart() {
  const { cartItems, subtotal, clearCart } = useCart();

  return (
    <div className="products-page">
      <Navbar />
      <main className="cart-main">
        <div className="products-heading">
          <div>
            <p className="eyebrow">YOUR FITKIT</p>
            <h1>Your cart.</h1>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-results">
            <h2>Your cart is empty.</h2>
            <p>Add a few essentials to get your workout moving.</p>
            <Link className="primary-button" to="/products">
              Shop products
            </Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <CartItem key={item._id || item.id} item={item} />
              ))}
              <button
                className="clear-cart-button"
                type="button"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
            <aside className="cart-summary">
              <p className="eyebrow">ORDER SUMMARY</p>
              <div>
                <span>Subtotal</span>
                <strong>₹{subtotal}</strong>
              </div>
              <p>Shipping and checkout will be added in the next stage.</p>
              <Link className="details-add-button" to="/checkout">
                Continue to checkout
              </Link>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;
