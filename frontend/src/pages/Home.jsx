import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { getProducts } from "../services/api.js";

const categories = [
  {
    name: "Strength",
    detail: "Dumbbells, resistance bands & power training essentials.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80",
    accent: "category-strength",
  },
  {
    name: "Cardio",
    detail: "Speed ropes & agility equipment for high-tempo stamina.",
    image:
      "https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?auto=format&fit=crop&w=800&q=80",
    accent: "category-cardio",
  },
  {
    name: "Yoga",
    detail: "Supportive non-slip mats, blocks & mobility release rollers.",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80",
    accent: "category-yoga",
  },
  {
    name: "Accessories",
    detail: "Gym gloves, stainless bottles & everyday workout bags.",
    image:
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
    accent: "category-accessories",
  },
];

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const res = await getProducts();
        if (Array.isArray(res.data)) {
          setFeaturedProducts(res.data.slice(0, 4));
        }
      } catch (err) {
        console.error("Could not load featured gear:", err);
      } finally {
        setLoadingProducts(false);
      }
    }

    loadFeatured();
  }, []);

  return (
    <div className="site-shell" id="home">
      <Navbar />

      <main>
        {/* 1. HERO SECTION */}
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">EQUIPMENT FOR EVERY REP</p>
            <h1 id="hero-title">
              Gear Up.
              <br />
              <span>Get Fit.</span>
            </h1>
            <p className="hero-description">
              Thoughtfully chosen fitness essentials for stronger workouts and
              better everyday movement.
            </p>
            <div>
              <Link className="primary-button" to="/products">
                Explore the gear <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
          </div>

          <div
            className="hero-art"
            aria-label="A curated collection of fitness equipment"
          >
            <div className="sun-disc" />
            <div className="hero-label">
              MOVE
              <br />
              WITH
              <br />
              <strong>INTENT</strong>
            </div>
            <div className="hero-ring hero-ring-one" />
            <div className="hero-ring hero-ring-two" />
            <div className="hero-bottle" />
            <div className="hero-dumbbell hero-dumbbell-left" />
            <div className="hero-dumbbell hero-dumbbell-right" />
            <div className="hero-tape" />
          </div>
        </section>

        {/* 2. SHOP BY CATEGORY SECTION */}
        <section
          className="category-section"
          id="categories"
          aria-labelledby="category-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE BY DISCIPLINE</p>
              <h2 id="category-title">Shop by Category.</h2>
              <p className="section-subtitle">
                Everything you need for your fitness journey.
              </p>
            </div>
            <Link className="section-link" to="/products">
              All Categories <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <Link
                className={`category-card ${category.accent}`}
                to={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
              >
                <div className="category-image-wrap">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="category-number">0{index + 1}</span>
                </div>
                <div className="category-card-body">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.detail}</p>
                  <span className="category-cta">
                    Explore <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. FEATURED PRODUCTS SECTION */}
        <section className="featured-section" aria-labelledby="featured-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED SELECTION</p>
              <h2 id="featured-title">Featured Gear.</h2>
              <p className="section-subtitle">
                Top-rated equipment engineered for real progress.
              </p>
            </div>
            <Link className="section-link" to="/products">
              View All Gear <span aria-hidden="true">→</span>
            </Link>
          </div>

          {loadingProducts ? (
            <div className="empty-results">
              <h2>Loading featured products...</h2>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <h2>Featured gear unavailable.</h2>
              <p>Check out our full collection in the shop.</p>
            </div>
          )}
        </section>

        {/* 4. PROMOTIONAL / BANNER SECTION */}
        <section className="promo-banner-section" aria-labelledby="promo-title">
          <div className="promo-banner-card">
            <div className="promo-banner-content">
              <span className="eyebrow promo-eyebrow">BUILT FOR MOMENTUM</span>
              <h2 id="promo-title">Train smarter. Move better.</h2>
              <p>
                From deliberate warm-ups to high-intensity reps, our equipment is
                built with premium materials to support your fitness progression.
              </p>
              <div className="promo-actions">
                <Link className="primary-button" to="/products">
                  Shop All Gear <span aria-hidden="true">-&gt;</span>
                </Link>
                <Link className="promo-secondary-button" to="/about">
                  Our Philosophy
                </Link>
              </div>
            </div>

            <div className="promo-banner-perks">
              <div className="promo-perk">
                <span className="perk-icon">⚡</span>
                <div>
                  <strong>Rapid Delivery</strong>
                  <small>Fast nationwide dispatch</small>
                </div>
              </div>
              <div className="promo-perk">
                <span className="perk-icon">🛡️</span>
                <div>
                  <strong>Built To Last</strong>
                  <small>Commercial grade cast steel &amp; cork</small>
                </div>
              </div>
              <div className="promo-perk">
                <span className="perk-icon">✓</span>
                <div>
                  <strong>30-Day Move Test</strong>
                  <small>Hassle-free satisfaction guarantee</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. THE FITKIT PROMISE - BRAND STATEMENT SECTION */}
        <section
          className="about-preview-section fitkit-promise-section"
          aria-labelledby="promise-title"
          style={{ backgroundColor: "#1b3024", width: "100%" }}
        >
          <div className="about-home-preview fitkit-promise-content">
            <p className="eyebrow promise-eyebrow" style={{ color: "#c9e86a" }}>
              THE FITKIT PROMISE
            </p>
            <h2 id="promise-title" className="promise-title" style={{ color: "#f4f0e8" }}>
              Good habits need
              <br />
              <span className="promise-accent" style={{ color: "#c9e86a" }}>
                good gear.
              </span>
            </h2>
            <p className="promise-description" style={{ color: "rgba(244, 240, 232, 0.88)" }}>
              We strip away gimmicks to build durable, minimal, and performance-tested
              fitness essentials that integrate seamlessly into your daily movement.
            </p>
            <div className="promise-action">
              <Link
                className="promise-button"
                to="/about"
                style={{ backgroundColor: "#f4f0e8", color: "#1b3024", border: "1px solid #f4f0e8" }}
              >
                Read Our Story &amp; Craftsmanship <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>FITKIT</span>
        <span>Gear Up. Get Fit.</span>
        <span>Made for movement</span>
      </footer>
    </div>
  );
}

export default Home;
