import { reactive, computed } from 'vue'
import { api } from '../api/client.js'

const state = reactive({ items: [], loading: false })

export function useCart() {
  const cartCount = computed(() =>
    state.items.reduce((sum, i) => sum + i.qty, 0)
  )

  const cartTotal = computed(() =>
    state.items.reduce((sum, i) => sum + (i.product?.price ?? i.price) * i.qty, 0)
  )

  async function fetchCart() {
    try {
      state.loading = true
      const data = await api.get('/cart')
      state.items = data.cart?.items || []
    } finally {
      state.loading = false
    }
  }

  async function addItem(product, qty = 1) {
    const data = await api.post('/cart', { productId: product._id || product.id, qty })
    state.items = data.cart?.items || []
  }

  async function removeItem(productId) {
    const id = productId?._id || productId?.id || productId
    const data = await api.delete(`/cart/${id}`)
    state.items = data.cart?.items || []
  }

  async function updateQty(productId, qty) {
    const id = productId?._id || productId?.id || productId
    const data = await api.patch(`/cart/${id}`, { qty })
    state.items = data.cart?.items || []
  }

  async function clearCart() {
    await api.delete('/cart')
    state.items = []
  }

  return { cart: state, cartCount, cartTotal, fetchCart, addItem, removeItem, updateQty, clearCart }
}
