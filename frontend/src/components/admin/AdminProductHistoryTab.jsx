function AdminProductHistoryTab({
  products,
  productStatsMap,
  onOpenHistory,
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-eyebrow">SALES ANALYTICS</p>
          <h2>Product Sales & Order History Breakdown</h2>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Total Sold</th>
              <th>Total Revenue</th>
              <th>Order History</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const stats = productStatsMap[product._id] || {
                orderCount: 0,
                unitsSold: 0,
                totalRevenue: 0,
              };
              return (
                <tr key={product._id}>
                  <td>
                    <div className="admin-product-info">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <strong>{product.name}</strong>
                    </div>
                  </td>
                  <td>
                    <span className="category-tag">
                      {product.category}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`stock-badge ${Number(product.stock) <= 5 ? "low" : "ok"}`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td>
                    <strong>{stats.unitsSold} units</strong>
                  </td>
                  <td>
                    <strong className="order-price">
                      ₹{stats.totalRevenue.toLocaleString("en-IN")}
                    </strong>
                  </td>
                  <td>
                    <button
                      className="order-history-btn highlight"
                      type="button"
                      onClick={() => onOpenHistory(product)}
                    >
                      View Orders ({stats.orderCount}) →
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminProductHistoryTab;
