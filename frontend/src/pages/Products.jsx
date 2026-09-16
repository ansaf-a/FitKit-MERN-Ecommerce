import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { getProducts } from "../services/api.js";

const categories = ["All", "Strength", "Cardio", "Yoga", "Accessories"];

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const categoryFromUrl = searchParams.get("category");
    return categories.includes(categoryFromUrl) ? categoryFromUrl : "All";
  });
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        setErrorMessage(
          "Products could not be loaded. Is the backend running?",
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const visibleProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...visibleProducts].sort(
    (firstProduct, secondProduct) => {
      if (sortBy === "price-low")
        return firstProduct.price - secondProduct.price;
      if (sortBy === "price-high")
        return secondProduct.price - firstProduct.price;
      if (sortBy === "rating")
        return secondProduct.rating - firstProduct.rating;
      return 0;
    },
  );

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setSearchParams(category === "All" ? {} : { category });
  }

  return (
    <div className="products-page">
      <Navbar />

      <main className="products-main">
        <div className="products-heading">
          <div>
            <p className="eyebrow">THE FITKIT EDIT</p>
            <h1>Built to move.</h1>
          </div>
          <p className="products-intro">
            Everyday essentials for strength, flow, and everything in between.
          </p>
        </div>

        <div className="catalogue-controls">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
          <label className="sort-control">
            <span>Sort</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="rating">Top rated</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="empty-results">
            <h2>Loading products...</h2>
            <p>Connecting to the FitKit catalogue.</p>
          </div>
        ) : errorMessage ? (
          <div className="empty-results">
            <h2>Catalogue unavailable.</h2>
            <p>{errorMessage}</p>
          </div>
        ) : (
          <>
            <div className="results-summary">
              <span>{sortedProducts.length} products</span>
              {searchTerm && <span>Results for “{searchTerm}”</span>}
            </div>

            {sortedProducts.length > 0 ? (
              <div className="product-grid">
                {sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-results">
                <h2>No products found.</h2>
                <p>Try another search term or choose a different category.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Products;
