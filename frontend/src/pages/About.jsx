import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

const stats = [
  { value: "10,000+", label: "Active Movers", detail: "Training daily nationwide" },
  { value: "100%", label: "Sustainable Materials", detail: "Recycled cast iron, cork & steel" },
  { value: "4.9 ★", label: "Athlete Rating", detail: "Across 2,400+ verified customer reviews" },
  { value: "0%", label: "Single-Use Plastic", detail: "100% recyclable, biodegradable packaging" },
];

const pillars = [
  {
    number: "01",
    title: "Tactical Ergonomics",
    description:
      "Every knurl pattern, handle contour, and mat density is rigorously calibrated with physiotherapists and athletic coaches for optimal joint safety, grip security, and natural body biomechanics.",
    tag: "Engineered For Movement",
  },
  {
    number: "02",
    title: "Uncompromising Longevity",
    description:
      "We reject flimsy plastics and brittle synthetics. FitKit gear is forged from commercial-grade cast iron, harvest-renewed natural cork, and resilient aerospace-grade alloys designed to endure decades of drops, sweat, and reps.",
    tag: "Built To Last",
  },
  {
    number: "03",
    title: "Living-Space Aesthetic",
    description:
      "Your training equipment shouldn't need to be hidden in a closet. We merge architectural minimalism with Scandinavian tones so your kettlebells, yoga blocks, and mats enhance your home's aesthetic.",
    tag: "Design Meets Strength",
  },
];

const timeline = [
  {
    year: "2021",
    title: "The Missing Standard",
    description:
      "Frustrated by over-marketed, low-quality fitness gadgets that cracked within weeks, our founders designed their first pair of balanced cast hex dumbbells in a small studio.",
  },
  {
    year: "2023",
    title: "From Studio to Community",
    description:
      "Partnered with leading yoga instructors and strength trainers to formulate our non-slip high-density mats and endurance essentials, expanding into 4 core fitness categories.",
  },
  {
    year: "2025",
    title: "The FitKit Movement",
    description:
      "Over 10,000 everyday athletes, lifters, and runners now choose FitKit for transparent direct-to-consumer fitness gear, ethical manufacturing, and lifetime craft support.",
  },
];

const team = [
  {
    name: "Arjun Verma",
    role: "Founder & Product Design Lead",
    bio: "Former collegiate athlete turned industrial designer obsessed with tactile ergonomics and durable materials.",
  },
  {
    name: "Sarah Chen",
    role: "Head of Movement Science",
    bio: "Certified biomechanist ensuring every product promotes joint health, safe posture, and functional mobility.",
  },
  {
    name: "Marcus Rodriguez",
    role: "Community & Sustainability Director",
    bio: "Leads our zero-plastic packaging initiative and athlete feedback loop across gyms and home studios.",
  },
];

function About() {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-main">
        {/* HERO SECTION */}
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="eyebrow">ABOUT FITKIT</span>
            <h1 className="about-title">
              Designed for discipline.
              <br />
              <span>Crafted for momentum.</span>
            </h1>
            <p className="about-lead">
              We believe training gear shouldn’t be disposable, gaudy, or overly complicated. 
              FitKit creates honest, beautifully engineered equipment that fuels your progress every day.
            </p>
          </div>

          {/* Hero Featured Visual */}
          <div className="about-hero-visual">
            <img
              src="/images/about_hero.jpg"
              alt="FitKit Craftsmanship - Minimalist matte dumbbells, cork mat, and stainless steel bottle"
              className="about-hero-img"
              loading="eager"
              decoding="async"
              onError={(e) => {
                // Graceful fallback if image is loading
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80";
              }}
            />
            <div className="about-hero-caption">
              <span>FitKit Craftsmanship Lab</span>
              <strong>Tactile simplicity. Natural textures. Zero distractions.</strong>
            </div>
          </div>
        </section>

        {/* METRICS STRIP */}
        <section className="about-metrics-strip">
          <div className="metrics-grid">
            {stats.map((item, idx) => (
              <div key={idx} className="metric-card">
                <strong className="metric-val">{item.value}</strong>
                <span className="metric-label">{item.label}</span>
                <p className="metric-detail">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PHILOSOPHY & PILLARS */}
        <section className="about-pillars-section">
          <div className="about-section-header">
            <span className="eyebrow">OUR DESIGN PILLARS</span>
            <h2>How We Build Better Equipment</h2>
            <p>
              Every FitKit product is born from thousands of hours of material testing,
              athlete feedback, and meticulous ergonomic refinement.
            </p>
          </div>

          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="pillar-card">
                <div className="pillar-top">
                  <span className="pillar-num">{pillar.number}</span>
                  <span className="pillar-tag">{pillar.tag}</span>
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TIMELINE / ORIGIN STORY */}
        <section className="about-story-section">
          <div className="about-section-header">
            <span className="eyebrow">OUR JOURNEY</span>
            <h2>From First Rep to Nationwide Movement</h2>
            <p>A look back at how a simple search for better weights sparked FitKit.</p>
          </div>

          <div className="about-timeline">
            {timeline.map((step, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <span className="timeline-year">{step.year}</span>
                  <div className="timeline-dot" />
                </div>
                <div className="timeline-body">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE VALUES */}
        <section className="about-values-section">
          <div className="about-section-header">
            <span className="eyebrow">THE FITKIT STANDARD</span>
            <h2>Our Core Commitments</h2>
          </div>

          <div className="values-grid">
            <div className="value-box">
              <div className="value-icon">⚖️</div>
              <h4>Direct-to-Mover Pricing</h4>
              <p>
                By cutting out traditional distributors, showroom leases, and retail middlemen,
                we deliver commercial gym quality at fair, transparent prices.
              </p>
            </div>

            <div className="value-box">
              <div className="value-icon">🌱</div>
              <h4>Sustainable Stewardship</h4>
              <p>
                From sustainable cork harvesting to recycled cast iron, our products and
                zero-plastic packaging leave minimal footprint on the planet.
              </p>
            </div>

            <div className="value-box">
              <div className="value-icon">🛡️</div>
              <h4>30-Day Move Guarantee</h4>
              <p>
                Test your gear in your own home. If it doesn’t inspire you to train harder
                and move with confidence, return it hassle-free.
              </p>
            </div>
          </div>
        </section>

        {/* TEAM & ADVISORS */}
        <section className="about-team-section">
          <div className="about-section-header">
            <span className="eyebrow">THE MINDS BEHIND FITKIT</span>
            <h2>Athletes, Designers & Coaches</h2>
            <p>United by a shared obsession with movement, wellness, and craftsmanship.</p>
          </div>

          <div className="team-grid">
            {team.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-avatar">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h4>{member.name}</h4>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="about-cta-section">
          <div className="about-cta-card">
            <span className="eyebrow cta-eyebrow">BUILT FOR EVERY REP</span>
            <h2>Ready to transform your daily movement?</h2>
            <p>
              Discover our curated range of strength, cardio, and yoga essentials designed
              to elevate your training journey.
            </p>
            <div className="about-cta-buttons">
              <Link className="primary-button" to="/products">
                Explore The Catalogue →
              </Link>
              <Link className="secondary-button" to="/products?category=Strength">
                View Strength Gear
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

export default About;
