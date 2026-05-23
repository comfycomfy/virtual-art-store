import { ref, computed } from 'vue'

const wishlistItems = ref(JSON.parse(localStorage.getItem('wishlist') || '[]'))

function toggleWishlist(productId) {
  const index = wishlistItems.value.indexOf(productId)
  if (index > -1) {
    wishlistItems.value.splice(index, 1)
  } else {
    wishlistItems.value.push(productId)
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlistItems.value))
}

function isWishlisted(productId) {
  return wishlistItems.value.includes(productId)
}

function getWishlistIds() {
  return wishlistItems.value
}

export function useWishlist() {
  return {
    wishlistItems: computed(() => wishlistItems.value),
    toggleWishlist,
    isWishlisted,
    getWishlistIds
  }
}
