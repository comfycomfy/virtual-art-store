<template>
  <div class="detail-page" v-if="product">

    <!-- Banner breadcrumb -->
    <div class="detail-banner">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/store">All</router-link>
          <span class="sep">/</span>
          <span class="current">{{ product.title }}</span>
        </nav>
      </div>
    </div>

    <!-- Main detail layout -->
    <div class="container detail-inner">

      <!-- Left: image -->
      <div class="detail-image-col">
        <div class="art-frame detail-frame">
          <img :src="product.image" :alt="product.title" />
        </div>
        <!-- Thumbnail strip (uses same image as placeholder) -->
        <div class="thumb-strip" aria-label="Image thumbnails">
          <button
            v-for="i in 3"
            :key="i"
            class="thumb-btn"
            :class="{ active: i === 1 }"
          >
            <img :src="product.image" :alt="`View ${i}`" />
          </button>
        </div>
      </div>

      <!-- Right: info -->
      <div class="detail-info-col">
        <h1 class="detail-title">{{ product.title }}</h1>
        <p class="detail-price">${{ product.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</p>

        <!-- Specs table -->
        <table class="specs-table">
          <tbody>
            <tr>
              <td class="spec-label">Theme</td>
              <td class="spec-value">{{ (product.theme || []).join(', ') }}</td>
            </tr>
            <tr>
              <td class="spec-label">Frame Type</td>
              <td class="spec-value">{{ product.frameType }}</td>
            </tr>
          </tbody>
        </table>

        <!-- Size selector -->
        <div class="option-group">
          <label class="option-label">Size</label>
          <div class="option-pills">
            <button class="pill active" disabled>{{ product.size }}</button>
          </div>
        </div>

        <!-- Material -->
        <div class="option-group">
          <label class="option-label">Material</label>
          <div class="option-pills">
            <button class="pill active" disabled>{{ product.material }}</button>
          </div>
        </div>

        <!-- Availability -->
        <div class="availability">
          <span class="spec-label">Availability</span>
          <span :class="product.inStock ? 'badge-instock' : 'badge-outofstock'">
            {{ product.inStock ? 'In stock!' : 'Out of stock' }}
          </span>
        </div>

        <!-- Quantity + actions -->
        <div class="qty-row">
          <div class="qty-control">
            <button class="qty-btn" @click="qty = Math.max(1, qty - 1)" aria-label="Decrease quantity">−</button>
            <span class="qty-value" aria-live="polite">{{ qty }}</span>
            <button class="qty-btn" @click="qty++" aria-label="Increase quantity">+</button>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn btn-outline" :disabled="!product.inStock" @click="onAddToCart">
            {{ addedToCart ? 'Added ✓' : 'Add to Cart' }}
          </button>
          <button class="btn btn-ghost" @click="wishlisted = !wishlisted">
            {{ wishlisted ? '♥ In Wishlist' : '♡ Add to Wishlist' }}
          </button>
        </div>

        <button class="btn btn-primary btn-lg buy-now" :disabled="!product.inStock" @click="onBuyNow">
          Buy it now
        </button>

        <!-- Share -->
        <div class="share-row">
          <span class="spec-label">Share with us:</span>
          <div class="share-icons">
            <a href="#" class="share-btn" aria-label="Share on Facebook" @click.prevent>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="#" class="share-btn" aria-label="Share on Twitter" @click.prevent>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="#" class="share-btn" aria-label="Share on Pinterest" @click.prevent>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.564 0-2.387-1.716-4.055-4.165-4.055-2.837 0-4.502 2.128-4.502 4.328 0 .856.33 1.774.741 2.276a.3.3 0 01.069.286c-.076.315-.245 1-.278 1.134-.045.183-.15.222-.345.134-1.249-.582-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
            </a>
            <a href="#" class="share-btn" aria-label="Share on Google" @click.prevent>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Sold indicator -->
        <p class="sold-indicator">
          🔥 Sold {{ product.soldCount }} Products in last 18 Hours
        </p>

        <!-- Accordions -->
        <div class="accordion">
          <div class="accordion-item">
            <button
              class="accordion-header"
              :class="{ open: openAccordion === 'desc' }"
              @click="toggle('desc')"
              :aria-expanded="openAccordion === 'desc'"
            >
              Description
              <span class="icon">{{ openAccordion === 'desc' ? '−' : '+' }}</span>
            </button>
            <div v-show="openAccordion === 'desc'" class="accordion-body">
              <p><strong>About Product</strong></p>
              <p class="mt-1">{{ product.description }}</p>
              <ul class="mt-2 desc-list">
                <li>Medium: {{ product.medium }}</li>
                <li>Year: {{ product.year }}</li>
                <li>Artist: {{ product.creator }}</li>
                <li>Tags: {{ product.tags?.join(', ') }}</li>
              </ul>
            </div>
          </div>

          <div class="accordion-item">
            <button
              class="accordion-header"
              :class="{ open: openAccordion === 'shipping' }"
              @click="toggle('shipping')"
              :aria-expanded="openAccordion === 'shipping'"
            >
              Shipping Information
              <span class="icon">{{ openAccordion === 'shipping' ? '−' : '+' }}</span>
            </button>
            <div v-show="openAccordion === 'shipping'" class="accordion-body">
              <p>All artworks are carefully packaged and shipped within 3–5 business days. Free shipping on orders over $500. Tracked international delivery available.</p>
            </div>
          </div>

          <div class="accordion-item">
            <button
              class="accordion-header"
              :class="{ open: openAccordion === 'reviews' }"
              @click="toggle('reviews')"
              :aria-expanded="openAccordion === 'reviews'"
            >
              Reviews
              <span class="icon">{{ openAccordion === 'reviews' ? '−' : '+' }}</span>
            </button>
            <div v-show="openAccordion === 'reviews'" class="accordion-body">
              <p>No reviews yet. Be the first to review this artwork.</p>
            </div>
          </div>
        </div>

        <!-- Enquiry link -->
        <a href="#" class="enquiry-link" @click.prevent>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Enquiry about product?
        </a>
      </div>
    </div>

    <!-- Recommended products -->
    <section class="recommended-section">
      <div class="container">
        <h2 class="recommended-title">Recommended Products</h2>
        <div class="products-grid">
          <ProductCard
            v-for="p in recommended"
            :key="p.id"
            :product="p"
          />
        </div>
      </div>
    </section>

  </div>

  <!-- Not found -->
  <div v-else class="not-found container">
    <h2>Artwork not found</h2>
    <router-link to="/store" class="btn btn-outline mt-2">← Back to Shop</router-link>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '../composables/useCart.js'
import ProductCard from '../components/ProductCard.vue'
import allProducts from '../data/products.json'

const route = useRoute()
const { addItem } = useCart()

const id = Number(route.params.id)
const product = allProducts.find(p => p.id === id)

const qty = ref(1)
const wishlisted = ref(false)
const addedToCart = ref(false)
const openAccordion = ref('desc')

const recommended = computed(() =>
  allProducts.filter(p => p.id !== id).slice(0, 4)
)

function toggle(key) {
  openAccordion.value = openAccordion.value === key ? null : key
}

function onAddToCart() {
  if (!product?.inStock) return
  addItem(product, qty.value)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 1800)
}

function onBuyNow() {
  if (!product?.inStock) return
  addItem(product, qty.value)
}
</script>

<style scoped>
/* Banner */
.detail-banner {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 0;
}

/* Main layout */
.detail-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding-top: 3rem;
  padding-bottom: 4rem;
  align-items: start;
}

/* Image column */
.detail-frame {
  width: 100%;
  max-width: 540px;
  aspect-ratio: 3/4;
  overflow: hidden;
}
.detail-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb-strip {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
  max-width: 540px;
}
.thumb-btn {
  width: 70px;
  height: 70px;
  border: 2px solid var(--border);
  background: var(--bg);
  padding: 0;
  cursor: pointer;
  overflow: hidden;
  transition: border-color var(--transition-fast);
}
.thumb-btn.active,
.thumb-btn:hover { border-color: var(--accent); }
.thumb-btn img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Info column */
.detail-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-bottom: 0.5rem;
}
.detail-price {
  font-family: var(--font-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--heading);
  margin-bottom: 1.5rem;
}

/* Specs table */
.specs-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1.5rem;
  font-size: 0.88rem;
}
.specs-table tr:nth-child(even) td { background: var(--bg-soft); }
.spec-label {
  padding: 0.6rem 0.75rem;
  color: var(--text-muted);
  font-weight: 500;
  width: 35%;
  border: 1px solid var(--border);
}
.spec-value {
  padding: 0.6rem 0.75rem;
  color: var(--text);
  border: 1px solid var(--border);
}

/* Options */
.option-group {
  margin-bottom: 1.25rem;
}
.option-label {
  display: block;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}
.option-pills { display: flex; flex-wrap: wrap; gap: 0.5rem; }

/* Availability */
.availability {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
  font-size: 0.88rem;
}

/* Quantity */
.qty-row { margin-bottom: 1.25rem; }
.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  overflow: hidden;
  background: var(--bg);
}
.qty-btn {
  background: none;
  border: none;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.qty-btn:hover { background: var(--bg-soft); color: var(--accent); }
.qty-value {
  width: 44px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  padding: 0 0.5rem;
  line-height: 38px;
}

/* Action buttons */
.action-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}
.action-buttons .btn { flex: 1; min-width: 140px; }

.buy-now {
  width: 100%;
  margin-bottom: 1.25rem;
}

/* Share row */
.share-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.82rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}
.share-icons { display: flex; gap: 0.4rem; }
.share-btn {
  width: 30px; height: 30px;
  border-radius: var(--radius-full);
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color var(--transition-fast), color var(--transition-fast), background var(--transition-fast);
}
.share-btn:hover { border-color: var(--accent); color: var(--accent); background: var(--accent-light); }

/* Sold indicator */
.sold-indicator {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

/* Desc list */
.desc-list {
  padding-left: 1.25rem;
  list-style: disc;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

/* Enquiry */
.enquiry-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: underline;
  margin-top: 1rem;
  transition: color var(--transition-fast);
}
.enquiry-link:hover { color: var(--accent); }

/* Recommended */
.recommended-section {
  background: var(--bg-soft);
  padding: 4rem 0 5rem;
  border-top: 1px solid var(--border);
}
.recommended-title {
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  margin-bottom: 2.5rem;
  text-align: center;
}

/* Not found */
.not-found {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
}

/* Responsive */
@media (max-width: 900px) {
  .detail-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .detail-frame { max-width: 100%; }
}
@media (max-width: 480px) {
  .action-buttons { flex-direction: column; }
  .action-buttons .btn { flex: none; width: 100%; }
}
</style>
