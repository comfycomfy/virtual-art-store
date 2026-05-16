import { reactive, computed } from 'vue'

const state = reactive({ items: [] })

export function useCart() {
  const cartCount = computed(() =>
    state.items.reduce((sum, i) => sum + i.qty, 0)
  )

  const cartTotal = computed(() =>
    state.items.reduce((sum, i) => sum + i.price * i.qty, 0)
  )

  function addItem(product, qty = 1) {
    const existing = state.items.find(i => i.id === product.id)
    if (existing) {
      existing.qty += qty
    } else {
      state.items.push({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        creator: product.creator,
        qty
      })
    }
  }

  function removeItem(id) {
    const idx = state.items.findIndex(i => i.id === id)
    if (idx !== -1) state.items.splice(idx, 1)
  }

  function updateQty(id, qty) {
    const item = state.items.find(i => i.id === id)
    if (!item) return
    if (qty <= 0) removeItem(id)
    else item.qty = qty
  }

  function clearCart() {
    state.items.splice(0)
  }

  return { cart: state, cartCount, cartTotal, addItem, removeItem, updateQty, clearCart }
}
