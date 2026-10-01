function AdminProductFormTab({
  form,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <p className="admin-eyebrow">PRODUCT CREATOR</p>
          <h2>{editingId ? "Edit Product" : "Add New Product"}</h2>
        </div>
        {editingId && (
          <button
            className="admin-secondary-button"
            type="button"
            onClick={onCancel}
          >
            Cancel Edit
          </button>
        )}
      </div>

      <form className="admin-product-form" onSubmit={onSubmit}>
        <div className="admin-form-grid">
          <label>
            Product Name
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={onChange}
              placeholder="e.g. Hex Dumbbell Set"
              required
            />
          </label>

          <label>
            Category
            <select
              name="category"
              value={form.category}
              onChange={onChange}
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
              onChange={onChange}
              placeholder="1299"
              required
            />
          </label>

          <label>
            Stock Units (Available for purchase)
            <input
              name="stock"
              type="number"
              min="0"
              value={form.stock}
              onChange={onChange}
              placeholder="25"
              required
            />
          </label>

          <label>
            Rating (0.0 to 5.0)
            <input
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={onChange}
              placeholder="4.8"
              required
            />
          </label>

          <label>
            Image URL
            <input
              name="image"
              type="text"
              value={form.image}
              onChange={onChange}
              placeholder="https://images.unsplash.com/..."
              required
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            placeholder="Comprehensive description of product specifications, material, and features..."
            rows="4"
            required
          />
        </label>

        {form.image && (
          <div className="admin-image-preview-box">
            <span className="preview-label">Image Preview:</span>
            <img
              src={form.image}
              alt="Preview"
              className="admin-preview-img"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="admin-form-actions">
          <button className="admin-primary-button" type="submit">
            {editingId ? "Save Changes" : "Create & Publish Product"}
          </button>
          {editingId && (
            <button
              className="admin-secondary-button"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default AdminProductFormTab;
