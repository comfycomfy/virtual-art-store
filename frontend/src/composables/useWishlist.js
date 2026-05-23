import { ref, computed } from 'vue'
import { api } from '../api/client.js'

const wishlistProducts = ref([])

function getProductId(p) {
  return p?._id || p?.id || p
}

async function fetchWishlist() {
  try {
    const data = await api.get('/wishlist')
    wishlistProducts.value = data.wishlist?.products || []
  } catch {
    // unauthenticated — keep empty
  }
}

async function toggleWishlist(productId) {
  const id = getProductId(productId)
  try {
    const data = await api.post(`/wishlist/${id}`)
    wishlistProducts.value = data.wishlist?.products || []
  } catch {
    // handle silently; UI already reflects optimistic state
  }
}

function isWishlisted(productId) {
  const id = getProductId(productId)
  return wishlistProducts.value.some(p => getProductId(p) === id)
}

function getWishlistIds() {
  return wishlistProducts.value.map(getProductId)
}

export function useWishlist() {
  return {
    wishlistItems: computed(() => wishlistProducts.value),
    fetchWishlist,
    toggleWishlist,
    isWishlisted,
    getWishlistIds,
  }
}
