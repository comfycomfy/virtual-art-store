<template>
  <article class="product-card">
    <!-- Image area -->
    <div class="card-media">
      <router-link :to="`/product/${productId}`" class="frame-link" :aria-label="`View ${product.title}`">
        <div class="art-frame card-frame">
          <img
            :src="product.image"
            :alt="product.title"
            loading="lazy"
          />
        </div>
      </router-link>

      <!-- Hover overlay actions -->
      <div class="card-overlay" aria-hidden="true">
        <router-link :to="`/product/${productId}`" class="overlay-btn" title="Quick view">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </router-link>
        <button class="overlay-btn" @click="onWishlist" :title="wishlisted ? 'Remove from wishlist' : 'Add to wishlist'">
          <svg width="18" height="18" viewBox="0 0 24 24" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
               :fill="wishlisted ? 'currentColor' : 'none'">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
          </svg>
        </button>
        <button class="overlay-btn" @click="onAddToCart" title="Add to cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </button>
      </div>

      <!-- Out of stock overlay -->
      <div v-if="!product.inStock" class="out-of-stock-badge">Sold Out</div>
    </div>

    <!-- Card info -->
    <div class="card-info">
      <router-link :to="`/product/${productId}`" class="card-title-link">
        <h3 class="card-title">{{ product.title }}</h3>
      </router-link>
      <p class="card-creator">{{ product.creator }}</p>
      <div class="card-footer">
        <span class="card-price">${{ product.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
        <button
          class="btn btn-outline add-btn"
          :disabled="!product.inStock"
          @click="onAddToCart"
        >
          {{ added ? 'Added ✓' : 'Add to Cart' }}
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCart } from '../composables/useCart.js'
import { useWishlist } from '../composables/useWishlist.js'

const props = defineProps({ product: { type: Object, required: true } })

const { addItem } = useCart()
const { toggleWishlist, isWishlisted } = useWishlist()
const added = ref(false)

const productId = computed(() => props.product._id || props.product.id)
const wishlisted = computed(() => isWishlisted(productId.value))

function onAddToCart() {
  if (!props.product.inStock) return
  addItem(props.product)
  added.value = true
  setTimeout(() => { added.value = false }, 1800)
}

function onWishlist() {
  toggleWishlist(productId.value)
}
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  transition: transform var(--transition-base);
}
.product-card:hover { transform: translateY(-4px); }

/* Media / image area */
.card-media {
  position: relative;
  overflow: hidden;
}
.frame-link { display: block; }

.card-frame {
  aspect-ratio: 4/5;
  width: 100%;
  transition: transform var(--transition-slow);
}
.product-card:hover .card-frame { transform: scale(1.02); }

/* Hover overlay */
.card-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: rgba(0,0,0,0.28);
  opacity: 0;
  transition: opacity var(--transition-base);
  z-index: 2;
}
.product-card:hover .card-overlay { opacity: 1; }

.overlay-btn {
  width: 38px; height: 38px;
  border-radius: var(--radius-full);
  background: var(--bg);
  color: var(--text);
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition-fast), color var(--transition-fast), transform var(--transition-fast);
  transform: translateY(8px);
}
.product-card:hover .overlay-btn { transform: translateY(0); }
.overlay-btn:hover { background: var(--accent); color: #fff; }

.out-of-stock-badge {
  position: absolute;
  top: 14px; left: 14px;
  background: rgba(0,0,0,0.72);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0.3rem 0.6rem;
  border-radius: var(--radius-xs);
}

/* Info */
.card-info {
  padding: 1rem 0.25rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.card-title-link { text-decoration: none; }
.card-title {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--heading);
  margin: 0;
  transition: color var(--transition-fast);
}
.card-title-link:hover .card-title { color: var(--accent); }

.card-creator {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.65rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.card-price {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text);
  font-family: var(--font-serif);
}

.add-btn {
  padding: 0.45rem 1rem;
  font-size: 0.75rem;
}
.add-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>

