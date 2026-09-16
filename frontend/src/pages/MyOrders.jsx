import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { getMyOrders } from "../services/api.js";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("Loading orders...");

  useEffect(() => {
    getMyOrders()
      .then((response) => {
        setOrders(response.data);
        setMessage("");
      })
      .catch(() => setMessage("Please log in to view your orders."));
  }, []);

  return (
    <div className="products-page">
      <Navbar />
      <main className="orders-main">
        <p className="eyebrow">YOUR HISTORY</p>
        <h1>My orders.</h1>
        {message ? (
          <div className="empty-results">
            <h2>{message}</h2>
          </div>
        ) : (
          orders.map((order) => (
            <article className="order-card" key={order._id}>
              <div>
                <strong>Order {order._id.slice(-6)}</strong>
                <span>
                  {new Date(order.createdAt).toLocaleDateString()} ·{" "}
                  {order.status}
                </span>
              </div>
              <strong>₹{order.totalAmount}</strong>
            </article>
          ))
        )}
      </main>
    </div>
  );
}

export default MyOrders;
