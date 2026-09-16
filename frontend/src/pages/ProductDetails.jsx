import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { getProductById } from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";

const fallbackImage =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        setErrorMessage("This product could not be found.");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function increaseQuantity() {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  return (
    <div className="products-page">
      <Navbar />

      <main className="details-main">
        {loading ? (
          <div className="empty-results">
            <h2>Loading product...</h2>
            <p>Getting the details from the FitKit catalogue.</p>
          </div>
        ) : errorMessage ? (
          <div className="empty-results">
            <h2>Product unavailable.</h2>
            <p>{errorMessage}</p>
            <Link className="primary-button" to="/products">
              Back to products
            </Link>
          </div>
        ) : (
          <section className="details-layout">
            <div className="details-image-wrap">
              <img
                className="details-image"
                src={product.image || fallbackImage}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = fallbackImage;
                }}
              />
              <span className="details-stock">{product.stock} in stock</span>
            </div>

            <div className="details-copy">
              <Link className="back-link" to="/products">
                &lt;- Back to products
              </Link>
              <p className="eyebrow">{product.category}</p>
              <h1>{product.name}</h1>
              <div className="details-meta">
                <span className="product-rating">★ {product.rating}</span>
                <span className="details-price">₹{product.price}</span>
              </div>
              <p className="details-description">{product.description}</p>

              <div className="quantity-control">
                <span>Quantity</span>
                <div className="quantity-selector">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <strong>{quantity}</strong>
                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="details-add-button"
                type="button"
                onClick={() => addToCart(product, quantity)}
              >
                Add {quantity} to cart
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default ProductDetails;
