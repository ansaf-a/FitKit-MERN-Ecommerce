function AdminProductsTab({
  filteredProducts,
  productSearch,
  setProductSearch,
  categoryFilter,
  setCategoryFilter,
  productStatsMap,
  onAddProductClick,
  onStockChange,
  onOpenHistory,
  onStartEditing,
  onDeleteProduct,
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-eyebrow">CATALOGUE & STOCKS</p>
          <h2>Manage Products & Inventory ({filteredProducts.length})</h2>
        </div>

        <button
          className="admin-primary-button"
          type="button"
          onClick={onAddProductClick}
        >
          + Add Product
        </button>
      </div>

      {/* Search & Filter Row */}
      <div className="admin-search-bar-row">
        <input
          className="admin-search-input"
          type="text"
          placeholder="Search products by title..."
          value={productSearch}
          onChange={(e) => setProductSearch(e.target.value)}
        />

        <div className="admin-filter-chips">
          {["all", "Strength", "Cardio", "Yoga", "Accessories"].map((cat) => (
            <button
              key={cat}
              className={`admin-filter-chip ${categoryFilter === cat ? "active" : ""}`}
              type="button"
              onClick={() => setCategoryFilter(cat)}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="admin-empty">No products match your search.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quick Stock Update</th>
                <th>Orders History</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => {
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
                        <div>
                          <strong>{product.name}</strong>
                          <p className="admin-product-desc-trunc">
                            {product.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-tag">
                        {product.category}
                      </span>
                    </td>
                    <td>
                      <strong>₹{product.price}</strong>
                    </td>
                    <td>
                      {/* Interactive Quick Stock Editor */}
                      <div className="quick-stock-editor">
                        <button
                          className="stock-step-btn"
                          type="button"
                          title="Decrease stock by 1"
                          onClick={() => onStockChange(product._id, -1)}
                        >
                          -
                        </button>
                        <input
                          className="stock-input"
                          type="number"
                          min="0"
                          value={product.stock}
                          onChange={(e) =>
                            onStockChange(product._id, e.target.value, true)
                          }
                        />
                        <button
                          className="stock-step-btn"
                          type="button"
                          title="Increase stock by 1"
                          onClick={() => onStockChange(product._id, 1)}
                        >
                          +
                        </button>
                        <span
                          className={`stock-badge ${
                            Number(product.stock) === 0
                              ? "out"
                              : Number(product.stock) <= 5
                                ? "low"
                                : "ok"
                          }`}
                        >
                          {Number(product.stock) === 0
                            ? "Out of Stock"
                            : Number(product.stock) <= 5
                              ? "Low Stock"
                              : "In Stock"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <button
                        className="order-history-btn"
                        type="button"
                        onClick={() => onOpenHistory(product)}
                      >
                        📜 Orders ({stats.orderCount})
                      </button>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          className="edit-button"
                          type="button"
                          onClick={() => onStartEditing(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() => onDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AdminProductsTab;
