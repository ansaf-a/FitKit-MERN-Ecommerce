import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

const fallbackImage =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [notification, setNotification] = useState("");

  const productId = product._id || product.id;

  const handleAddToCart = () => {
    addToCart(product);

    setNotification(`${product.name} added to cart!`);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          className="product-image"
          src={product.image || fallbackImage}
          alt={product.name}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = fallbackImage;
          }}
        />

        <span className="product-stock">{product.stock} in stock</span>
      </div>

      <div className="product-card-content">
        <p className="product-category">{product.category}</p>

        <h2 className="product-name">{product.name}</h2>

        <div className="product-meta">
          <span className="product-rating">★ {product.rating}</span>
          <span className="product-price">₹{product.price}</span>
        </div>

        <div className="product-actions">
          <Link className="secondary-button" to={`/products/${productId}`}>
            View details
          </Link>

          <button
            className="add-button"
            type="button"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>

      {notification && (
        <div className="cart-notification">✓ {notification}</div>
      )}
    </article>
  );
}

export default ProductCard;
