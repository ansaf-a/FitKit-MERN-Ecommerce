function AdminOrdersTab({
  orders,
  filteredOrders,
  orderFilter,
  setOrderFilter,
  pendingOrders,
  confirmedOrders,
  deliveredOrders,
  onStatusChange,
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-eyebrow">FULFILLMENT</p>
          <h2>All Customer Orders ({filteredOrders.length})</h2>
        </div>

        <div className="admin-tab-filters">
          <button
            className={`admin-filter-chip ${orderFilter === "all" ? "active" : ""}`}
            type="button"
            onClick={() => setOrderFilter("all")}
          >
            All ({orders.length})
          </button>
          <button
            className={`admin-filter-chip ${orderFilter === "Pending" ? "active" : ""}`}
            type="button"
            onClick={() => setOrderFilter("Pending")}
          >
            Pending ({pendingOrders})
          </button>
          <button
            className={`admin-filter-chip ${orderFilter === "Confirmed" ? "active" : ""}`}
            type="button"
            onClick={() => setOrderFilter("Confirmed")}
          >
            Confirmed ({confirmedOrders})
          </button>
          <button
            className={`admin-filter-chip ${orderFilter === "Delivered" ? "active" : ""}`}
            type="button"
            onClick={() => setOrderFilter("Delivered")}
          >
            Delivered ({deliveredOrders})
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="admin-empty">
          No orders match the selected filter.
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Details</th>
                <th>Delivery Destination</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th>Status Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <strong>#{order._id.slice(-6)}</strong>
                    <br />
                    <small className="muted-text">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </small>
                  </td>
                  <td>
                    <div className="customer-cell">
                      <strong>{order.customerName}</strong>
                      <span>{order.email}</span>
                      <span>{order.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="address-cell">
                      <span>{order.address}</span>
                      <span>
                        {order.city} - {order.pincode}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="order-items-cell">
                      {order.products?.map((item, idx) => (
                        <div key={idx} className="order-item-tag">
                          <span>{item.name}</span>
                          <strong>×{item.quantity}</strong>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td>
                    <strong className="order-price">
                      ₹{order.totalAmount}
                    </strong>
                  </td>
                  <td>
                    <div className="order-status-control">
                      <select
                        className={`status-select status-${order.status?.toLowerCase()}`}
                        value={order.status}
                        onChange={(e) =>
                          onStatusChange(order._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminOrdersTab;
