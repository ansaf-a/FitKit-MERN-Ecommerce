function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="category-filter" aria-label="Filter products by category">
      <span className="filter-label">Shop by</span>
      <div className="filter-options">
        {categories.map((category) => (
          <button
            className={
              selectedCategory === category
                ? "filter-option active"
                : "filter-option"
            }
            key={category}
            onClick={() => onCategoryChange(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
