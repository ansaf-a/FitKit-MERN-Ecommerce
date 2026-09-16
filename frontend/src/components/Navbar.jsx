import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function Navbar() {
  const { totalQuantity } = useCart();
  const navigate = useNavigate();

  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("fitkit-user") || "null"),
  );

  function handleLogout() {
    localStorage.removeItem("fitkit-token");
    localStorage.removeItem("fitkit-user");
    setUser(null);
    navigate("/login");
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="FitKit home">
        <span className="brand-mark">FK</span>
        <span>FITKIT</span>
      </Link>

      <nav className="main-nav" aria-label="Main navigation">
        <Link to="/">Home</Link>
        <Link to="/products">Categories</Link>
        <Link to="/#about">About</Link>

        {/* Show My Orders only when logged in */}
        {user && <Link to="/my-orders">My Orders</Link>}
      </nav>

      <Link className="cart-link" to="/cart">
        Cart <span className="cart-count">{totalQuantity}</span>
      </Link>

      <div className="auth-links">
        {user ? (
          <>
            <span className="welcome-user">Hi, {user.name}</span>

            {user.role === "admin" && <Link to="/admin">Admin</Link>}

            <button
              className="logout-button"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
