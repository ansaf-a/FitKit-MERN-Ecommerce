import { useEffect, useMemo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getAllOrders,
  getProducts,
  updateOrderStatus,
  updateProduct,
} from "../services/api.js";
import AdminSidebar from "../components/admin/AdminSidebar.jsx";
import AdminStatsOverview from "../components/admin/AdminStatsOverview.jsx";
import AdminOverviewTab from "../components/admin/AdminOverviewTab.jsx";
import AdminOrdersTab from "../components/admin/AdminOrdersTab.jsx";
import AdminProductsTab from "../components/admin/AdminProductsTab.jsx";
import AdminProductHistoryTab from "../components/admin/AdminProductHistoryTab.jsx";
import AdminProductFormTab from "../components/admin/AdminProductFormTab.jsx";
import ProductHistoryModal from "../components/admin/ProductHistoryModal.jsx";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  category: "Strength",
  image: "",
  rating: "4.5",
  stock: "20",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [, setLoading] = useState(true);

  // Selected product for detailed order history modal
  const [selectedProductForHistory, setSelectedProductForHistory] =
    useState(null);

  // Filters
  const [orderFilter, setOrderFilter] = useState("all");
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [user] = useState(() =>
    JSON.parse(localStorage.getItem("fitkit-user") || "null"),
  );

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        getProducts().catch(() => ({ data: [] })),
        getAllOrders().catch(() => ({ data: [] })),
      ]);

      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
    } catch {
      setMessage("Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchDashboardData();
  }, [navigate, user, fetchDashboardData]);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await updateProduct(editingId, form);
        setMessage("Product updated successfully.");
      } else {
        await createProduct(form);
        setMessage("Product added successfully.");
      }

      setForm(emptyProduct);
      setEditingId(null);
      const res = await getProducts();
      setProducts(res.data);
      setActiveTab("products");
    } catch (error) {
      setMessage(error.response?.data?.message || "Admin action failed.");
    }
  };

  const startEditing = useCallback((product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      rating: product.rating,
      stock: product.stock,
    });
    setActiveTab("add-product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setMessage("Product deleted successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Product could not be deleted.",
      );
    }
  };

  const cancelEdit = useCallback(() => {
    setEditingId(null);
    setForm(emptyProduct);
    setActiveTab("products");
  }, []);

  // Quick Inline Stock Update Handler
  const handleStockChange = async (productId, deltaOrValue, isAbsolute = false) => {
    const currentProduct = products.find((p) => p._id === productId);
    if (!currentProduct) return;

    let newStock;
    if (isAbsolute) {
      newStock = Math.max(0, parseInt(deltaOrValue, 10) || 0);
    } else {
      newStock = Math.max(0, (Number(currentProduct.stock) || 0) + deltaOrValue);
    }

    try {
      await updateProduct(productId, { stock: newStock });
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? { ...p, stock: newStock } : p)),
      );
      setMessage(
        `Stock for "${currentProduct.name}" updated to ${newStock} units.`,
      );
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update stock.");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)),
      );
      // Re-fetch products in case status change triggered stock replenishment/deduction
      getProducts().then((res) => setProducts(res.data)).catch(() => {});
      setMessage(`Order #${orderId.slice(-6)} marked as ${newStatus}.`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to update order status.",
      );
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("fitkit-token");
    localStorage.removeItem("fitkit-user");
    navigate("/login");
  }, [navigate]);

  // Precomputed Product Sales Analytics Map: O(Orders * Items) once instead of per product per render
  const productStatsMap = useMemo(() => {
    const stats = {};
    for (const p of products) {
      stats[p._id] = { orderCount: 0, unitsSold: 0, totalRevenue: 0 };
    }

    for (const order of orders) {
      if (!order.products) continue;
      for (const item of order.products) {
        const prodId = item.product?._id || item.product;
        let targetId = prodId;

        if (!targetId || !stats[targetId]) {
          const matched = products.find(
            (p) =>
              String(p._id) === String(prodId) ||
              p.name?.toLowerCase().trim() === item.name?.toLowerCase().trim(),
          );
          if (matched) targetId = matched._id;
        }

        if (targetId && stats[targetId]) {
          stats[targetId].orderCount += 1;
          stats[targetId].unitsSold += item.quantity || 0;
          stats[targetId].totalRevenue +=
            (item.quantity || 0) * (item.price || 0);
        }
      }
    }
    return stats;
  }, [products, orders]);

  // Derived KPI metrics
  const { totalRevenue, pendingOrders, confirmedOrders, deliveredOrders } =
    useMemo(() => {
      let rev = 0;
      let pending = 0;
      let confirmed = 0;
      let delivered = 0;
      for (const o of orders) {
        rev += Number(o.totalAmount) || 0;
        if (o.status === "Pending") pending++;
        else if (o.status === "Confirmed") confirmed++;
        else if (o.status === "Delivered") delivered++;
      }
      return {
        totalRevenue: rev,
        pendingOrders: pending,
        confirmedOrders: confirmed,
        deliveredOrders: delivered,
      };
    }, [orders]);

  const lowStockProducts = useMemo(
    () => products.filter((p) => Number(p.stock) <= 5),
    [products],
  );

  const filteredOrders = useMemo(() => {
    if (orderFilter === "all") return orders;
    return orders.filter(
      (order) => order.status?.toLowerCase() === orderFilter.toLowerCase(),
    );
  }, [orders, orderFilter]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        categoryFilter === "all" ||
        p.category?.toLowerCase() === categoryFilter.toLowerCase();
      const matchesSearch =
        !productSearch ||
        p.name?.toLowerCase().includes(productSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, categoryFilter, productSearch]);

  // Extract order history for modal on-demand
  const activeProductHistory = useMemo(() => {
    if (!selectedProductForHistory) return [];
    const prodId = selectedProductForHistory._id;
    const prodName = selectedProductForHistory.name?.toLowerCase().trim();

    return orders
      .map((order) => {
        const matchedItem = order.products?.find((item) => {
          const itemProdId = item.product?._id || item.product;
          return (
            (itemProdId && String(itemProdId) === String(prodId)) ||
            (item.name && item.name.toLowerCase().trim() === prodName)
          );
        });

        if (!matchedItem) return null;

        return {
          orderId: order._id,
          createdAt: order.createdAt,
          customerName: order.customerName,
          email: order.email,
          phone: order.phone,
          city: order.city,
          pincode: order.pincode,
          quantity: matchedItem.quantity,
          price: matchedItem.price,
          itemTotal: matchedItem.quantity * matchedItem.price,
          orderTotal: order.totalAmount,
          status: order.status,
        };
      })
      .filter(Boolean);
  }, [selectedProductForHistory, orders]);

  const activeProductStats = useMemo(() => {
    if (!selectedProductForHistory) {
      return { orderCount: 0, unitsSold: 0, totalRevenue: 0 };
    }
    return (
      productStatsMap[selectedProductForHistory._id] || {
        orderCount: 0,
        unitsSold: 0,
        totalRevenue: 0,
      }
    );
  }, [selectedProductForHistory, productStatsMap]);

  return (
    <div className="admin-dashboard">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        editingId={editingId}
        setForm={setForm}
        emptyProduct={emptyProduct}
        pendingOrders={pendingOrders}
        productsCount={products.length}
        user={user}
        onLogout={handleLogout}
      />

      <main className="admin-content">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">FITKIT MANAGEMENT CONSOLE</p>
            <h1>
              {activeTab === "overview" && "Executive Dashboard"}
              {activeTab === "orders" && "Customer Orders Management"}
              {activeTab === "products" && "Product Catalogue & Stock Control"}
              {activeTab === "product-history" && "Product Order & Sales History"}
              {activeTab === "add-product" &&
                (editingId ? "Edit Product" : "Add New Product")}
            </h1>
            <p>
              {activeTab === "overview" &&
                "Live performance KPIs, order tracking, and inventory status."}
              {activeTab === "orders" &&
                "Review and update fulfillment statuses of customer purchases."}
              {activeTab === "products" &&
                "Instantly update inventory stocks, pricing, and view item order history."}
              {activeTab === "product-history" &&
                "View sales performance, units purchased, and full order breakdown per product."}
              {activeTab === "add-product" &&
                "Publish fresh fitness gear or update details of existing items."}
            </p>
          </div>

          <div className="admin-header-actions">
            <Link className="admin-view-store-btn" to="/products">
              View Customer Store
            </Link>
          </div>
        </header>

        {message && (
          <div className="admin-message">
            <span>{message}</span>
            <button
              className="admin-message-close"
              type="button"
              onClick={() => setMessage("")}
            >
              ✕
            </button>
          </div>
        )}

        <AdminStatsOverview
          totalRevenue={totalRevenue}
          ordersCount={orders.length}
          pendingOrders={pendingOrders}
          confirmedOrders={confirmedOrders}
          deliveredOrders={deliveredOrders}
          productsCount={products.length}
          lowStockProductsCount={lowStockProducts.length}
          onNavigateOrders={() => setActiveTab("orders")}
          onNavigatePendingOrders={() => {
            setOrderFilter("Pending");
            setActiveTab("orders");
          }}
          onNavigateProducts={() => setActiveTab("products")}
        />

        {activeTab === "overview" && (
          <AdminOverviewTab
            orders={orders}
            lowStockProducts={lowStockProducts}
            setActiveTab={setActiveTab}
            setForm={setForm}
            emptyProduct={emptyProduct}
            setEditingId={setEditingId}
            onStockChange={handleStockChange}
          />
        )}

        {activeTab === "orders" && (
          <AdminOrdersTab
            orders={orders}
            filteredOrders={filteredOrders}
            orderFilter={orderFilter}
            setOrderFilter={setOrderFilter}
            pendingOrders={pendingOrders}
            confirmedOrders={confirmedOrders}
            deliveredOrders={deliveredOrders}
            onStatusChange={handleStatusChange}
          />
        )}

        {activeTab === "products" && (
          <AdminProductsTab
            filteredProducts={filteredProducts}
            productSearch={productSearch}
            setProductSearch={setProductSearch}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
            productStatsMap={productStatsMap}
            onAddProductClick={() => {
              setForm(emptyProduct);
              setEditingId(null);
              setActiveTab("add-product");
            }}
            onStockChange={handleStockChange}
            onOpenHistory={setSelectedProductForHistory}
            onStartEditing={startEditing}
            onDeleteProduct={handleDelete}
          />
        )}

        {activeTab === "product-history" && (
          <AdminProductHistoryTab
            products={products}
            productStatsMap={productStatsMap}
            onOpenHistory={setSelectedProductForHistory}
          />
        )}

        {activeTab === "add-product" && (
          <AdminProductFormTab
            form={form}
            editingId={editingId}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={cancelEdit}
          />
        )}
      </main>

      <ProductHistoryModal
        product={selectedProductForHistory}
        history={activeProductHistory}
        stats={activeProductStats}
        onClose={() => setSelectedProductForHistory(null)}
      />
    </div>
  );
}

export default AdminDashboard;
