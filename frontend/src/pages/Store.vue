<template>
  <div class="store-page">
    <!-- Page header banner -->
    <div class="store-banner">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/">All</router-link>
          <span class="sep">/</span>
          <span class="current">Shop</span>
        </nav>
        <h1 class="store-title">Our Collection</h1>
        <p class="store-sub">{{ filteredProducts.length }} artworks available</p>
      </div>
    </div>

    <div class="container store-layout">
      <!-- Loading state -->
      <div v-if="loading" class="empty-state"><p>Loading artworks…</p></div>
      <!-- Error state -->
      <div v-else-if="error" class="empty-state"><p>{{ error }}</p><button class="btn btn-outline" @click="loadProducts">Retry</button></div>
      <template v-else>
      <!-- Filter bar -->
      <div class="filter-bar" role="group" aria-label="Filter by category">
        <button
          v-for="cat in categories"
          :key="cat"
          class="pill"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Results info + sort (decorative) -->
      <div class="results-row">
        <p class="results-count">{{ filteredProducts.length }} results</p>
        <div class="sort-wrap">
          <label for="sort-select" class="sort-label">Sort:</label>
          <select id="sort-select" v-model="sortBy" class="sort-select">
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title">Name A–Z</option>
          </select>
        </div>
      </div>

      <!-- Product grid -->
      <transition-group
        name="grid-fade"
        tag="div"
        class="products-grid store-grid"
      >
        <ProductCard
          v-for="p in sortedProducts"
          :key="p._id"
          :product="p"
        />
      </transition-group>

      <!-- Empty state -->
      <div v-if="sortedProducts.length === 0" class="empty-state">
        <p v-if="activeCategory === 'Wishlist'">Your wishlist is empty. Add some artworks to get started!</p>
        <p v-else>No artworks match this filter.</p>
        <button class="btn btn-outline" @click="activeCategory = 'All'">Clear filter</button>
      </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useWishlist } from '../composables/useWishlist.js'
import { api } from '../api/client.js'

const { getWishlistIds, isWishlisted } = useWishlist()

const allProducts   = ref([])
const categories    = ref(['All', 'Wishlist'])
const activeCategory = ref('All')
const sortBy        = ref('default')
const loading       = ref(false)
const error         = ref(null)

async function loadProducts() {
  loading.value = true
  error.value   = null
  try {
    const [prodData, catData] = await Promise.all([
      api.get('/products?limit=100'),
      api.get('/products/categories'),
    ])
    allProducts.value = prodData.products
    categories.value  = ['All', 'Wishlist', ...(catData.categories || [])]
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)

const filteredProducts = computed(() => {
  if (activeCategory.value === 'Wishlist') {
    const wishlistIds = getWishlistIds()
    return allProducts.value.filter(p => wishlistIds.includes(p._id))
  }
  return activeCategory.value === 'All'
    ? allProducts.value
    : allProducts.value.filter(p => p.category === activeCategory.value)
})

const sortedProducts = computed(() => {
  const list = [...filteredProducts.value]
  if (sortBy.value === 'price-asc')  return list.sort((a, b) => a.price - b.price)
  if (sortBy.value === 'price-desc') return list.sort((a, b) => b.price - a.price)
  if (sortBy.value === 'title')      return list.sort((a, b) => a.title.localeCompare(b.title))
  return list
})
</script>

<style scoped>
/* Banner */
.store-banner {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  padding: 3rem 0 2rem;
}
.store-title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
}
.store-sub {
  color: var(--text-muted);
  font-size: 0.9rem;
}

/* Layout */
.store-layout {
  padding-top: 2.5rem;
  padding-bottom: 5rem;
}

/* Filter bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

/* Results row */
.results-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}
.results-count {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.sort-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.sort-label {
  font-size: 0.82rem;
  color: var(--text-muted);
}
.sort-select {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  color: var(--text);
  padding: 0.35rem 0.7rem;
  border-radius: var(--radius-xs);
  font-size: 0.82rem;
  cursor: pointer;
  outline: none;
  transition: border-color var(--transition-fast);
}
.sort-select:focus { border-color: var(--accent); }

/* Grid */
.store-grid { align-items: start; }

/* Empty state */
.empty-state {
  text-align: center;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: var(--text-muted);
}

/* Grid animation */
.grid-fade-enter-active,
.grid-fade-leave-active { transition: opacity 0.25s, transform 0.25s; }
.grid-fade-enter-from,
.grid-fade-leave-to { opacity: 0; transform: scale(0.97); }
</style>

