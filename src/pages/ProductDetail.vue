<template>
  <section v-if="product" class="center-flex">
    <div style="width:100%; max-width:980px">
      <router-link to="/store" class="green">← Back to store</router-link>

      <h1>{{ product.title }}</h1>

      <div class="detail">
        <img :src="product.image" :alt="product.title" />

        <div class="info">
          <p class="price">Price: ${{ product.price }}</p>
          <p><strong>Description:</strong> {{ product.description }}</p>

          <ul class="meta">
            <li><strong>Creator:</strong> {{ product.creator }}</li>
            <li><strong>Year:</strong> {{ product.year }}</li>
            <li><strong>Medium:</strong> {{ product.medium }}</li>
            <li><strong>Dimensions:</strong> {{ product.dimensions }}</li>

            <li v-if="product.tags && product.tags.length">
              <strong>Tags:</strong>
              <span
                class="tag"
                v-for="t in product.tags"
                :key="t"
              >
                {{ t }}
              </span>
            </li>
          </ul>

          <div class="actions">
            <button @click="buy">Buy</button>
          </div>
        </div> 
      </div>
    </div>
  </section>

  <section v-else class="center-flex">
    <p>Product not found.</p>
    <router-link to="/store">Back to store</router-link>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router' // 
import products from '../data/products.json'

const route = useRoute()
const id = Number(route.params.id)

const product = products.find(p => p.id === id)

function buy() {
  alert(`Thanks! Purchase flow not implemented. ${product.title} - $${product.price}`)
}
</script>

<style scoped>
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
}

.detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: center;
}

.detail img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

.price {
  font-weight: 700;
  color: #0a9;
}

.meta {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
}

.meta li {
  margin: 0.25rem 0;
}

.tag {
  display: inline-block;
  background: #eef;
  color: #036;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  margin-right: 0.4rem;
  font-size: 0.9rem;
}

.actions {
  margin-top: 0.75rem;
}

.actions button {
  background: #0a9;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
}

.actions button:hover {
  background: #087;
}

@media (max-width: 720px) {
  .detail {
    grid-template-columns: 1fr;
  }

  .info {
    text-align: left;
  }
}
</style>