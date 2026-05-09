<template>
  <section class="container home-center">
      <h1>Welcome to the Virtual Art Store</h1>
      <p>Discover original art pieces. Browse the store to see photos and prices.</p>
      <router-link to="/store" class="green">Enter Store →</router-link>
    <h2 style="margin-top:2rem">Featured</h2>
    <div class="grid">
      <ProductCard
        v-for="p in featured"
        :key="p.id"
        :product="p"
      />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import products from '../data/products.json'

const featured = products.slice(0, 2)
</script>

<style scoped>
.home-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
  text-align: center;

  /* account for fixed top nav height */
  min-height: calc(100vh - 72px);
}

.title-and-info {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}
</style>
