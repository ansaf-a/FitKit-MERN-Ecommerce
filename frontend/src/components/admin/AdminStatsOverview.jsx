function AdminStatsOverview({
  totalRevenue,
  ordersCount,
  pendingOrders,
  confirmedOrders,
  deliveredOrders,
  productsCount,
  lowStockProductsCount,
  onNavigateOrders,
  onNavigatePendingOrders,
  onNavigateProducts,
}) {
  return (
    <section className="admin-stats">
      <div className="admin-stat-card clickable" onClick={onNavigateOrders}>
        <span>Total Revenue</span>
        <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>
        <small>{ordersCount} total orders placed</small>
      </div>

      <div className="admin-stat-card clickable" onClick={onNavigatePendingOrders}>
        <span>Pending Orders</span>
        <strong style={{ color: pendingOrders > 0 ? "#b45309" : "#1b3024" }}>
          {pendingOrders}
        </strong>
        <small>
          {confirmedOrders} confirmed · {deliveredOrders} delivered
        </small>
      </div>

      <div className="admin-stat-card clickable" onClick={onNavigateProducts}>
        <span>Active Products</span>
        <strong>{productsCount}</strong>
        <small>Across 4 fitness categories</small>
      </div>

      <div className="admin-stat-card clickable" onClick={onNavigateProducts}>
        <span>Low Stock Alert</span>
        <strong
          style={{
            color: lowStockProductsCount > 0 ? "#b91c1c" : "#15803d",
          }}
        >
          {lowStockProductsCount} items
        </strong>
        <small>Stock &le; 5 units · Click to adjust</small>
      </div>
    </section>
  );
}

export default AdminStatsOverview;
