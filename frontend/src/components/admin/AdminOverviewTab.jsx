function AdminOverviewTab({
  orders,
  lowStockProducts,
  setActiveTab,
  setForm,
  emptyProduct,
  setEditingId,
  onStockChange,
}) {
  return (
    <div className="admin-overview-grid">
      {/* Recent Orders Preview */}
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-eyebrow">ORDER STREAM</p>
            <h2>Recent Orders</h2>
          </div>
          <button
            className="admin-link-button"
            type="button"
            onClick={() => setActiveTab("orders")}
          >
            View All Orders ({orders.length}) →
          </button>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty">No customer orders yet.</div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>
                      <strong>#{order._id.slice(-6)}</strong>
                    </td>
                    <td>
                      <div>{order.customerName}</div>
                      <small className="muted-text">{order.email}</small>
                    </td>
                    <td>
                      <strong>₹{order.totalAmount}</strong>
                    </td>
                    <td>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span
                        className={`admin-status-pill status-${order.status?.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Quick Actions & Low Stock Preview with Quick Restock */}
      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <p className="admin-eyebrow">QUICK ACTIONS</p>
            <h2>Inventory Health</h2>
          </div>
        </div>

        <div className="admin-quick-actions">
          <button
            className="admin-primary-button"
            type="button"
            onClick={() => {
              setForm(emptyProduct);
              setEditingId(null);
              setActiveTab("add-product");
            }}
          >
            + Add New Product
          </button>
          <button
            className="admin-secondary-button"
            type="button"
            onClick={() => setActiveTab("products")}
          >
            Manage Stocks
          </button>
        </div>

        <div style={{ marginTop: "24px" }}>
          <p className="admin-eyebrow">LOW STOCK ITEMS</p>
          {lowStockProducts.length === 0 ? (
            <p className="stock-good-msg">
              ✓ All products have healthy stock levels.
            </p>
          ) : (
            <ul className="admin-low-stock-list">
              {lowStockProducts.map((p) => (
                <li key={p._id}>
                  <div className="low-stock-info">
                    <strong>{p.name}</strong>
                    <span>
                      {p.category} · ₹{p.price}
                    </span>
                  </div>
                  <div className="low-stock-count">
                    <span className="stock-warning">
                      {p.stock} left
                    </span>
                    <button
                      className="quick-add-stock-btn"
                      type="button"
                      title="Add 10 units"
                      onClick={() => onStockChange(p._id, 10)}
                    >
                      +10 Stock
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminOverviewTab;
