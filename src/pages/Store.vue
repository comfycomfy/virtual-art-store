<template>
  <section>
    <header class="center-flex">
      <h1>Store</h1>
      <p>Click an image for more information and pricing.</p>
    </header>
    
    <section class="container">
      <div class="grid">
        <ProductCard v-for="p in products" :key="p.id" :product="p" />
      </div>
    </section>
  </section>
</template>

<script setup>
import ProductCard from '../components/ProductCard.vue'
import products from '../data/products.json'
</script>

<style scoped>
.container { top: 30 }
.grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap:1rem; margin-top:1rem }
</style>
