import { Link } from "react-router-dom";

function AdminSidebar({
  activeTab,
  setActiveTab,
  editingId,
  setForm,
  emptyProduct,
  pendingOrders,
  productsCount,
  user,
  onLogout,
}) {
  return (
    <aside className="admin-sidebar">
      <div>
        <div className="admin-logo">
          <span>FK</span>
          <div>
            <strong>FITKIT</strong>
            <small className="admin-logo-sub">ADMIN CONTROL</small>
          </div>
        </div>

        <div className="admin-sidebar-title">NAVIGATION</div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("overview")}
          >
            <span>Dashboard Overview</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === "orders" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("orders")}
          >
            <span>Customer Orders</span>
            {pendingOrders > 0 && (
              <span className="admin-nav-badge">{pendingOrders}</span>
            )}
          </button>

          <button
            className={`admin-nav-item ${activeTab === "products" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("products")}
          >
            <span>Products & Stock</span>
            <span className="admin-nav-badge secondary">{productsCount}</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === "product-history" ? "active" : ""}`}
            type="button"
            onClick={() => setActiveTab("product-history")}
          >
            <span>Product Order History</span>
          </button>

          <button
            className={`admin-nav-item ${activeTab === "add-product" ? "active" : ""}`}
            type="button"
            onClick={() => {
              if (!editingId) setForm(emptyProduct);
              setActiveTab("add-product");
            }}
          >
            <span>{editingId ? "Edit Product" : "+ Add New Product"}</span>
          </button>
        </nav>

        <div className="admin-sidebar-title" style={{ marginTop: "24px" }}>
          STOREFRONT
        </div>
        <Link className="admin-store-link" to="/products">
          ← Visit Storefront
        </Link>
      </div>

      <div className="admin-sidebar-footer">
        <div className="admin-sidebar-user">
          <div className="admin-avatar">
            {(user?.name?.[0] || "A").toUpperCase()}
          </div>
          <div className="admin-user-details">
            <strong>{user?.name || "Administrator"}</strong>
            <small>{user?.email || "admin@fitkit.com"}</small>
          </div>
        </div>
        <button className="admin-logout" type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
