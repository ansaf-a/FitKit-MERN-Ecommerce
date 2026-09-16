import Navbar from "../components/Navbar.jsx";

const categories = [
  { name: "Strength", detail: "Build power", accent: "category-strength" },
  { name: "Cardio", detail: "Move faster", accent: "category-cardio" },
  { name: "Yoga", detail: "Find balance", accent: "category-yoga" },
  {
    name: "Accessories",
    detail: "Train smarter",
    accent: "category-accessories",
  },
];

function Home() {
  return (
    <div className="site-shell" id="home">
      <Navbar />

      <main>
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
            <a className="primary-button" href="/products">
              Explore the gear <span aria-hidden="true">-&gt;</span>
            </a>
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

        <section
          className="category-section"
          id="categories"
          aria-labelledby="category-title"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">START WHERE YOU ARE</p>
              <h2 id="category-title">Find your pace.</h2>
            </div>
            <p>Simple gear. Serious progress.</p>
          </div>

          <div className="category-grid">
            {categories.map((category, index) => (
              <a
                className={`category-card ${category.accent}`}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                key={category.name}
              >
                <span className="category-number">0{index + 1}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-detail">
                  {category.detail} <span aria-hidden="true">-&gt;</span>
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          className="about-section"
          id="about"
          aria-labelledby="about-title"
        >
          <p className="eyebrow">THE FITKIT PROMISE</p>
          <h2 id="about-title">
            Good habits need
            <br />
            <span>good gear.</span>
          </h2>
          <p>
            We keep your kit focused, functional, and ready for the next
            workout.
          </p>
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
