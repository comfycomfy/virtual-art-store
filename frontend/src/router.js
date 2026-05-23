import { createRouter, createWebHistory } from './vue-router'
import Home from './pages/Home.vue'
import Store from './pages/Store.vue'
import ProductDetail from './pages/ProductDetail.vue'
import Cart from './pages/Cart.vue'
import Contact from './pages/Contact.vue'
import Login from './pages/Login.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/store', name: 'Store', component: Store },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/login', name: 'Login', component: Login }
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})
