import { createRouter, createWebHistory } from './vue-router'
import Home from './pages/Home.vue'
import Store from './pages/Store.vue'
import ProductDetail from './pages/ProductDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/store', name: 'Store', component: Store },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
