import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartToast() {
  const { toast, hideToast } = useCart();
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!toast) return;

    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    timerRef.current = setTimeout(() => {
      hideToast();
    }, toast.duration || 3500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [toast, isPaused, hideToast]);

  if (!toast) return null;

  const isWarning = toast.type === "warning";

  return (
    <div
      className="cart-toast-container"
      role="region"
      aria-label="Notifications"
    >
      <div
        className={`cart-toast-banner ${isWarning ? "is-warning" : "is-success"}`}
        role="status"
        aria-live="polite"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="cart-toast-icon" aria-hidden="true">
          {isWarning ? "⚠️" : "✓"}
        </div>

        <div className="cart-toast-content">
          <div className="cart-toast-title">{toast.title}</div>
          <div className="cart-toast-message">{toast.message}</div>
          {toast.action && (
            <Link
              to={toast.action.to}
              className="cart-toast-action"
              onClick={hideToast}
            >
              {toast.action.label}
            </Link>
          )}
        </div>

        <button
          type="button"
          className="cart-toast-close"
          onClick={hideToast}
          aria-label="Close notification"
        >
          &times;
        </button>

        <div
          className="cart-toast-progress"
          style={{
            animationDuration: `${toast.duration || 3500}ms`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        />
      </div>
    </div>
  );
}

export default CartToast;
