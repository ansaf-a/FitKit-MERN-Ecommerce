function ProductHistoryModal({
  product,
  history,
  stats,
  onClose,
}) {
  if (!product) return null;

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div
        className="admin-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="admin-modal-header">
          <div className="admin-modal-title-box">
            <img
              src={product.image}
              alt={product.name}
              className="modal-prod-thumb"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <div>
              <p className="admin-eyebrow">PRODUCT ORDER HISTORY</p>
              <h2>{product.name}</h2>
              <small>
                Category: {product.category} · Price: ₹{product.price} · Current Stock:{" "}
                <strong>{product.stock} units</strong>
              </small>
            </div>
          </div>
          <button
            className="admin-modal-close"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Product Performance Summary Cards */}
        <div className="modal-stats-row">
          <div className="modal-stat-pill">
            <span>Total Orders</span>
            <strong>{stats.orderCount}</strong>
          </div>
          <div className="modal-stat-pill">
            <span>Total Units Sold</span>
            <strong>{stats.unitsSold} units</strong>
          </div>
          <div className="modal-stat-pill">
            <span>Revenue Generated</span>
            <strong>
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </strong>
          </div>
        </div>

        {/* Orders Table */}
        <div className="modal-orders-container">
          {history.length === 0 ? (
            <div className="admin-empty">
              No orders have been placed for this product yet.
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Customer Details</th>
                  <th>Location</th>
                  <th>Qty Sold</th>
                  <th>Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {history.map((hist, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>#{hist.orderId.slice(-6)}</strong>
                    </td>
                    <td>
                      {new Date(hist.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="customer-cell">
                        <strong>{hist.customerName}</strong>
                        <span>{hist.email}</span>
                      </div>
                    </td>
                    <td>
                      <span>
                        {hist.city} - {hist.pincode}
                      </span>
                    </td>
                    <td>
                      <span className="order-qty-pill">
                        ×{hist.quantity}
                      </span>
                    </td>
                    <td>
                      <strong>₹{hist.itemTotal}</strong>
                    </td>
                    <td>
                      <span
                        className={`admin-status-pill status-${hist.status?.toLowerCase()}`}
                      >
                        {hist.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="admin-modal-footer">
          <button
            className="admin-primary-button"
            type="button"
            onClick={onClose}
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductHistoryModal;
