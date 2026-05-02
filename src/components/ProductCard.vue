<template>
  <div class="card">
    <router-link :to="`/product/${product.id}`">
      <img :src="product.image" :alt="product.title" class="thumb" />
    </router-link>
    <div class="meta">
      <h3>{{ product.title }}</h3>
      <div class="price">${{ product.price }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})
</script>

<style scoped>
.card { border:1px solid #eee; border-radius:8px; overflow:hidden; display:flex; flex-direction:column; height:100%; background: #fff; align-items:center }
.thumb { width:100%; display:block; object-fit:cover; aspect-ratio: 3/2; max-width:100% }
.meta { padding:0.75rem; display:flex; flex-direction:column; gap:0.5rem; margin-top:auto; align-items:center; text-align:center }
.meta h3 { margin:0; font-size:1.05rem }
.price { color: var(--accent); font-weight:700 }
.card a { color:inherit }
</style>
