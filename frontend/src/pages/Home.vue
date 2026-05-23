<template>
  <div class="home">

    <!-- ================================================
         HERO
    ================================================ -->
    <section class="hero">
      <div class="container hero-inner">
        <!-- Left: stacked framed artworks -->
        <div class="hero-gallery" aria-hidden="true">
          <div class="hero-frame hero-frame--main art-frame">
            <img :src="products[4].image" :alt="products[4].title" />
          </div>
          <div class="hero-frame hero-frame--secondary art-frame">
            <img :src="products[0].image" :alt="products[0].title" />
          </div>
        </div>

        <!-- Right: copy -->
        <div class="hero-copy">
          <span class="hero-eyebrow">Curated Fine Art</span>
          <h1 class="hero-headline">
            Original<br />
            <em>Artworks</em><br />
            &amp; Paintings
          </h1>
          <p class="hero-sub">
            Discover museum-quality prints and one-of-a-kind originals, handpicked from
            talented artists around the world.
          </p>
          <div class="hero-actions">
            <router-link to="/store" class="btn btn-primary btn-lg">Shop Collection</router-link>
            <router-link to="/store" class="hero-link">Explore all →</router-link>
          </div>
          <div class="hero-stats">
            <div class="stat"><strong>{{ products.length }}+</strong><span>Artworks</span></div>
            <div class="stat-sep"></div>
            <div class="stat"><strong>4</strong><span>Artists</span></div>
            <div class="stat-sep"></div>
            <div class="stat"><strong>100%</strong><span>Original</span></div>
          </div>
        </div>
      </div>

      <!-- Decorative background ink marks -->
      <div class="hero-bg-deco" aria-hidden="true">
        <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="120" cy="100" rx="90" ry="35" fill="currentColor" opacity="0.04" transform="rotate(-15 120 100)"/>
          <ellipse cx="380" cy="80" rx="70" ry="25" fill="currentColor" opacity="0.04" transform="rotate(10 380 80)"/>
        </svg>
      </div>
    </section>

    <!-- ================================================
         FEATURED PRODUCTS
    ================================================ -->
    <section class="section featured-section">
      <div class="container">
        <header class="section-header">
          <span class="label">Our Collection</span>
          <h2>Featured Artworks</h2>
          <p>Hand-selected pieces from our gallery — each one a conversation starter.</p>
        </header>
        <div class="products-grid">
          <ProductCard v-for="p in products" :key="p.id" :product="p" />
        </div>
        <div class="view-all-wrap">
          <router-link to="/store" class="btn btn-ghost btn-lg">View Full Collection</router-link>
        </div>
      </div>
    </section>

    <!-- ================================================
         CATEGORY SPOTLIGHT
    ================================================ -->
    <section class="section-sm categories-section">
      <div class="container">
        <div class="cat-layout">
          <!-- Vertical rotated label -->
          <div class="cat-label-wrap" aria-hidden="true">
            <span class="cat-label">Modern Paintings</span>
          </div>

          <div class="cat-grid">
            <article v-for="cat in categories" :key="cat.title" class="cat-card">
              <div class="cat-img-wrap">
                <img :src="cat.image" :alt="cat.title" loading="lazy" />
              </div>
              <div class="cat-overlay" :style="{ background: cat.color }">
                <h3>{{ cat.title }}</h3>
                <p>By {{ cat.artist }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================
         FEATURE ROW (Unique Designs)
    ================================================ -->
    <section class="section feature-row-section">
      <div class="container feature-row">
        <!-- Text left -->
        <div class="feature-text">
          <span class="label">Unique Designs</span>
          <h2>Perfect abstract<br />paintings</h2>
          <p class="mt-2">
            Each piece is crafted with intention — abstract forms that speak differently
            to every viewer. Bring home art that grows with you.
          </p>
          <router-link to="/store" class="btn btn-primary mt-3">Explore Abstracts</router-link>
        </div>

        <!-- Image collage right -->
        <div class="feature-collage" aria-hidden="true">
          <div class="collage-frame collage-frame--a art-frame">
            <img :src="products[5].image" :alt="products[5].title" />
          </div>
          <div class="collage-frame collage-frame--b art-frame">
            <img :src="products[3].image" :alt="products[3].title" />
          </div>
        </div>
      </div>
    </section>

    <!-- ================================================
         MOTTO
    ================================================ -->
    <section class="motto-section">
      <div class="container motto-inner">
        <blockquote class="motto-quote">
          "A true artist is not one who is inspired,<br class="br-md" />
          but one who inspires to motivate others."
        </blockquote>
        <router-link to="/store" class="motto-link">Shop Now →</router-link>
      </div>
    </section>

  </div>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import products from '../data/products.json'

const categories = [
  {
    title: 'Impressionism Art',
    artist: 'George',
    image: products[2].image,
    color: 'rgba(130, 70, 110, 0.82)'
  },
  {
    title: 'Expressionism Art',
    artist: 'Antony',
    image: products[0].image,
    color: 'rgba(185, 60, 50, 0.82)'
  },
  {
    title: 'Abstract Art',
    artist: 'Lisha',
    image: products[4].image,
    color: 'rgba(30, 140, 150, 0.82)'
  }
]
</script>

<style scoped>
/* ---- Hero ---------------------------------------- */
.hero {
  position: relative;
  min-height: calc(100vh - var(--nav-height));
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--bg);
  padding: 5rem 0 4rem;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

/* Gallery / framed images */
.hero-gallery {
  position: relative;
  height: 520px;
}
.hero-frame {
  position: absolute;
  overflow: hidden;
}
.hero-frame--main {
  width: 75%;
  height: 440px;
  top: 0;
  left: 5%;
  z-index: 2;
}
.hero-frame--secondary {
  width: 55%;
  height: 300px;
  bottom: 0;
  right: 0;
  z-index: 3;
  border-width: 8px;
}
.hero-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Hero copy */
.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.hero-eyebrow {
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}
.hero-headline {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  color: var(--heading);
  font-weight: 700;
}
.hero-headline em {
  font-style: italic;
  color: var(--accent);
}
.hero-sub {
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.7;
  max-width: 400px;
}
.hero-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.hero-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  letter-spacing: 0.02em;
  transition: color var(--transition-fast);
}
.hero-link:hover { color: var(--accent); }

.hero-stats {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}
.stat { display: flex; flex-direction: column; gap: 0.1rem; }
.stat strong { font-size: 1.3rem; font-family: var(--font-serif); color: var(--heading); }
.stat span { font-size: 0.75rem; color: var(--text-muted); letter-spacing: 0.05em; text-transform: uppercase; }
.stat-sep { width: 1px; height: 32px; background: var(--border); }

/* Decorative background */
.hero-bg-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
  color: var(--accent);
  z-index: 0;
}
.hero-bg-deco svg { width: 100%; height: 100%; }
.hero-inner { position: relative; z-index: 1; }

/* ---- Featured section ----------------------------- */
.featured-section { background: var(--bg-soft); }
.view-all-wrap {
  margin-top: 3rem;
  text-align: center;
}

/* ---- Categories ----------------------------------- */
.categories-section {
  background: var(--bg);
  padding: 4rem 0;
}
.cat-layout {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.cat-label-wrap {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  flex-shrink: 0;
}
.cat-label {
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--heading);
  letter-spacing: 0.04em;
  white-space: nowrap;
}
.cat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  flex: 1;
}
.cat-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
}
.cat-img-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.cat-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-slow);
}
.cat-card:hover .cat-img-wrap img { transform: scale(1.06); }
.cat-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.25rem 1rem;
  color: #fff;
}
.cat-overlay h3 {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.cat-overlay p {
  font-size: 0.82rem;
  opacity: 0.85;
  margin: 0;
}

/* ---- Feature row ---------------------------------- */
.feature-row-section { background: var(--bg-soft); }
.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}
.feature-text { max-width: 420px; }
.feature-text h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
.feature-text p { color: var(--text-muted); line-height: 1.7; }
.feature-collage {
  position: relative;
  height: 400px;
}
.collage-frame {
  position: absolute;
  overflow: hidden;
}
.collage-frame--a {
  width: 64%;
  height: 320px;
  top: 0;
  right: 0;
  z-index: 2;
}
.collage-frame--b {
  width: 52%;
  height: 260px;
  bottom: 0;
  left: 0;
  z-index: 3;
  border-width: 8px;
}
.collage-frame img { width: 100%; height: 100%; object-fit: cover; }

/* ---- Motto ---------------------------------------- */
.motto-section {
  background: var(--bg);
  padding: 6rem 0;
}
.motto-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
}
.motto-quote {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 400;
  color: var(--heading);
  line-height: 1.4;
  border: none;
  padding: 0;
  margin: 0;
  max-width: 820px;
}
.motto-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text);
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color var(--transition-fast);
}
.motto-link:hover { color: var(--accent); }
.br-md { display: none; }

/* ---- Responsive ----------------------------------- */
@media (max-width: 1024px) {
  .hero-gallery { height: 400px; }
  .hero-frame--main { height: 340px; }
  .hero-frame--secondary { height: 240px; }
  .feature-row { gap: 3rem; }
  .feature-collage { height: 320px; }
  .collage-frame--a { height: 260px; }
  .collage-frame--b { height: 200px; }
}

@media (max-width: 768px) {
  .hero-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .hero-gallery { height: 320px; order: -1; }
  .hero-frame--main { width: 70%; height: 280px; left: 0; }
  .hero-frame--secondary { width: 60%; height: 200px; right: 0; }
  .hero { padding: 3rem 0; }
  .hero-headline { font-size: 2.5rem; }
  .cat-layout { flex-direction: column; align-items: flex-start; }
  .cat-label-wrap { writing-mode: horizontal-tb; transform: none; }
  .cat-grid { grid-template-columns: 1fr 1fr; }
  .feature-row { grid-template-columns: 1fr; gap: 2.5rem; }
  .feature-collage { height: 260px; order: -1; }
  .collage-frame--a { height: 220px; }
  .collage-frame--b { height: 180px; }
  .br-md { display: block; }
}

@media (max-width: 480px) {
  .cat-grid { grid-template-columns: 1fr; }
  .hero-gallery { height: 260px; }
}
</style>

