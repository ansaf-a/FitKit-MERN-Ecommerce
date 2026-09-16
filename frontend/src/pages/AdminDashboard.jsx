import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../services/api.js";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  category: "Strength",
  image: "",
  rating: "",
  stock: "",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("fitkit-user") || "null");

    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    loadProducts();
  }, [navigate]);

  async function loadProducts() {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch {
      setMessage("Could not load products.");
    }
  }

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
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
      await loadProducts();
    } catch (error) {
      setMessage(error.response?.data?.message || "Admin action failed.");
    }
  }

  function startEditing(product) {
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

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setProducts(products.filter((product) => product._id !== id));

      setMessage("Product deleted successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Product could not be deleted.",
      );
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyProduct);
  }

  function handleLogout() {
    localStorage.removeItem("fitkit-token");
    localStorage.removeItem("fitkit-user");
    navigate("/login");
  }

  return (
    <div className="admin-dashboard">
      {/* ADMIN SIDEBAR */}

      <aside className="admin-sidebar">
        <div className="admin-logo">
          <span>FK</span>
          <strong>FITKIT</strong>
        </div>

        <div className="admin-label">ADMIN PANEL</div>

        <nav className="admin-nav">
          <button className="admin-nav-item active" type="button">
            Dashboard
          </button>

          <button
            className="admin-nav-item"
            type="button"
            onClick={() =>
              document
                .getElementById("admin-products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Products
          </button>

          <button
            className="admin-nav-item"
            type="button"
            onClick={() =>
              document
                .getElementById("admin-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Add Product
          </button>
        </nav>

        <button className="admin-logout" type="button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}

      <main className="admin-content">
        <header className="admin-header">
          <div>
            <p className="admin-eyebrow">FITKIT CONTROL ROOM</p>

            <h1>Admin Dashboard</h1>

            <p>Manage your fitness product catalogue.</p>
          </div>

          <div className="admin-profile">
            <span className="admin-avatar">A</span>

            <div>
              <strong>Administrator</strong>
              <small>Admin</small>
            </div>
          </div>
        </header>

        {/* STAT CARDS */}

        <section className="admin-stats">
          <div className="admin-stat-card">
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>

          <div className="admin-stat-card">
            <span>Categories</span>
            <strong>4</strong>
          </div>

          <div className="admin-stat-card">
            <span>System</span>
            <strong className="system-online">● Online</strong>
          </div>
        </section>

        {/* ADD / EDIT PRODUCT */}

        <section className="admin-panel" id="admin-form">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">PRODUCT MANAGEMENT</p>

              <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
            </div>
          </div>

          <form className="admin-product-form" onSubmit={handleSubmit}>
            <div className="admin-form-grid">
              <label>
                Product Name
                <input
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Example: Dumbbells"
                  required
                />
              </label>

              <label>
                Category
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option value="Strength">Strength</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </label>

              <label>
                Price (₹)
                <input
                  name="price"
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="1199"
                  required
                />
              </label>

              <label>
                Stock
                <input
                  name="stock"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="20"
                  required
                />
              </label>

              <label>
                Rating
                <input
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={handleChange}
                  placeholder="4.5"
                  required
                />
              </label>

              <label>
                Image URL
                <input
                  name="image"
                  type="text"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  required
                />
              </label>
            </div>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description..."
                rows="4"
                required
              />
            </label>

            <div className="admin-form-actions">
              <button className="admin-primary-button" type="submit">
                {editingId ? "Update Product" : "Add Product"}
              </button>

              {editingId && (
                <button
                  className="admin-secondary-button"
                  type="button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* PRODUCT TABLE */}

        <section className="admin-panel" id="admin-products">
          <div className="admin-panel-heading">
            <div>
              <p className="admin-eyebrow">CATALOGUE</p>

              <h2>All Products</h2>
            </div>

            <span className="product-count">{products.length} Products</span>
          </div>

          {products.length === 0 ? (
            <div className="admin-empty">No products available.</div>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <div className="admin-product-info">
                          <img
                            src={product.image}
                            alt={product.name}
                            onError={(event) => {
                              event.currentTarget.style.display = "none";
                            }}
                          />

                          <strong>{product.name}</strong>
                        </div>
                      </td>

                      <td>{product.category}</td>

                      <td>₹{product.price}</td>

                      <td>{product.stock}</td>

                      <td>★ {product.rating}</td>

                      <td>
                        <div className="admin-actions">
                          <button
                            className="edit-button"
                            type="button"
                            onClick={() => startEditing(product)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-button"
                            type="button"
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {message && <div className="admin-message">{message}</div>}
      </main>
    </div>
  );
}

export default AdminDashboard;
