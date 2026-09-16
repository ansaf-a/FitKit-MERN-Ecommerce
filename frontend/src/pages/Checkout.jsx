import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../services/api.js";

const initialForm = {
  customerName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  pincode: "",
};

function Checkout() {
  const { cartItems, subtotal, clearCart } = useCart();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    try {
      await createOrder({
        ...form,
        totalAmount: subtotal,
        products: cartItems.map((item) => ({
          product: item._id || item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      });
      clearCart();
      setSuccess(true);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Checkout failed. Please log in first.",
      );
    }
  }

  if (success) {
    return (
      <div className="products-page">
        <Navbar />
        <main className="checkout-main">
          <div className="empty-results">
            <h2>Order placed successfully!</h2>
            <p>Your order has been saved to your FitKit account.</p>
            <Link className="primary-button" to="/my-orders">
              View my orders
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="products-page">
      <Navbar />
      <main className="checkout-main">
        <div className="products-heading">
          <div>
            <p className="eyebrow">SECURE CHECKOUT</p>
            <h1>Almost there.</h1>
          </div>
          <p className="products-intro">
            No payment gateway is connected. This demo records the order in
            MongoDB.
          </p>
        </div>
        {cartItems.length === 0 ? (
          <div className="empty-results">
            <h2>Your cart is empty.</h2>
            <Link className="primary-button" to="/products">
              Shop products
            </Link>
          </div>
        ) : (
          <form className="checkout-form" onSubmit={handleSubmit}>
            {Object.keys(initialForm).map((field) => (
              <label key={field}>
                {field}
                <input
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  required
                />
              </label>
            ))}
            <div className="checkout-total">
              <span>Total</span>
              <strong>₹{subtotal}</strong>
            </div>
            <button className="details-add-button" type="submit">
              Place order
            </button>
            {message && <p className="admin-message">{message}</p>}
          </form>
        )}
      </main>
    </div>
  );
}

export default Checkout;
