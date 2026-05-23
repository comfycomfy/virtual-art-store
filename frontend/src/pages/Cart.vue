<template>
  <div class="cart-page">
    <!-- Banner -->
    <div class="cart-banner">
      <div class="container">
        <nav class="breadcrumb" aria-label="breadcrumb">
          <router-link to="/">Home</router-link>
          <span class="sep">/</span>
          <span class="current">Your Cart</span>
        </nav>
        <h1 class="cart-title">Your Cart</h1>
      </div>
    </div>

    <div class="container cart-layout">

      <!-- Empty state -->
      <div v-if="cart.items.length === 0" class="cart-empty">
        <div class="empty-icon" aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
        </div>
        <h2>Your cart is empty</h2>
        <p>Discover original artworks and bring something beautiful home.</p>
        <router-link to="/store" class="btn btn-primary btn-lg">Browse Collection</router-link>
      </div>

      <!-- Cart items + summary -->
      <template v-else>
        <div class="cart-items">
          <div class="cart-header-row">
            <span>Item</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Total</span>
            <span></span>
          </div>

          <div
            v-for="item in cart.items"
            :key="item.product?._id || item.product"
            class="cart-row"
          >
            <!-- Image + title -->
            <div class="cart-item-info">
              <router-link :to="`/product/${item.product?._id || item.product}`" class="cart-thumb-link">
                <div class="art-frame cart-thumb">
                  <img :src="item.product?.image" :alt="item.product?.title" />
                </div>
              </router-link>
              <div>
                <router-link :to="`/product/${item.product?._id || item.product}`" class="cart-item-title">
                  {{ item.product?.title }}
                </router-link>
                <p class="cart-item-creator">{{ item.product?.creator }}</p>
              </div>
            </div>

            <!-- Unit price -->
            <span class="cart-price">
              ${{ (item.product?.price ?? 0).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
            </span>

            <!-- Quantity -->
            <div class="qty-control">
              <button class="qty-btn" @click="updateQty(item.product?._id, item.qty - 1)" aria-label="Decrease">−</button>
              <span class="qty-value" aria-live="polite">{{ item.qty }}</span>
              <button class="qty-btn" @click="updateQty(item.product?._id, item.qty + 1)" aria-label="Increase">+</button>
            </div>

            <!-- Line total -->
            <span class="cart-line-total">
              ${{ ((item.product?.price ?? 0) * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
            </span>

            <!-- Remove -->
            <button class="remove-btn" @click="removeItem(item.product?._id)" aria-label="Remove item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Order summary -->
        <aside class="cart-summary">
          <h2 class="summary-title">Order Summary</h2>

          <div class="summary-rows">
            <div class="summary-row">
              <span>Subtotal</span>
              <span>${{ cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span :class="cartTotal >= 500 ? 'text-accent' : ''">
                {{ cartTotal >= 500 ? 'Free' : '$24.00' }}
              </span>
            </div>
            <div v-if="cartTotal < 500" class="free-shipping-note">
              Add ${{ (500 - cartTotal).toLocaleString('en-US', { minimumFractionDigits: 2 }) }} more for free shipping
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row summary-total">
              <span>Total</span>
              <span>${{ orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
            </div>
          </div>

          <button class="btn btn-primary btn-lg checkout-btn" @click="onCheckout">
            Proceed to Checkout
          </button>
          <router-link to="/store" class="continue-link">← Continue shopping</router-link>

          <button class="clear-btn" @click="clearCart">Clear cart</button>
        </aside>
      </template>

      <!-- Sign in required message -->
      <div v-if="!isSignedIn && cart.items.length > 0" class="signin-required-banner">
        <div class="signin-banner-content">
          <h3>Sign In to Checkout</h3>
          <p>You must be signed in to complete your purchase.</p>
          <router-link to="/login" class="btn btn-primary btn-sm">Sign In Now</router-link>
        </div>
      </div>

      <!-- Checkout denied modal -->
      <transition name="modal-fade">
        <div v-if="showCheckoutModal" class="modal-overlay">
          <div class="modal-card">
            <button class="modal-close-btn" @click="closeCheckoutModal" aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 class="modal-title">Checkout Denied</h2>
            <p class="modal-subtitle">You must sign in to complete your purchase</p>
            <p class="modal-description">Create an account or sign in to proceed with checkout and secure your artwork.</p>
            
            <router-link to="/login" class="btn btn-primary btn-modal" @click="closeCheckoutModal">
              Sign In Now
            </router-link>
            <button @click="closeCheckoutModal" class="modal-continue-link">
              Continue Shopping
            </button>
          </div>
        </div>
      </transition>

      <!-- Order confirmation modal -->
      <transition name="modal-fade">
        <div v-if="showOrderConfirm" class="modal-overlay">
          <div class="modal-card">
            <button class="modal-close-btn" @click="closeOrderConfirm" aria-label="Close modal">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div class="order-success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h2 class="modal-title">Thank You!</h2>
            <p class="modal-subtitle">Your purchase is confirmed</p>

            <!-- Order number -->
            <div class="order-info-section">
              <div class="order-info-item">
                <span class="order-info-label">Order Number</span>
                <span class="order-info-value">{{ orderNumber }}</span>
              </div>
            </div>

            <!-- Items summary -->
            <div class="order-items-summary">
              <h3 class="summary-heading">Items Purchased</h3>
              <div v-for="item in cart.items" :key="item.id" class="order-item-row">
                <span class="order-item-name">{{ item.title }}</span>
                <span class="order-item-qty">x{{ item.qty }}</span>
                <span class="order-item-price">${{ (item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
              </div>
              <div class="order-divider"></div>
              <div class="order-item-row total">
                <span class="order-item-name">Total</span>
                <span class="order-item-price">${{ orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}</span>
              </div>
            </div>

            <button @click="handleConfirmOrder" class="btn btn-primary btn-modal">
              Confirm Order
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '../composables/useCart.js'
import { useAuth } from '../composables/useAuth.js'
import { api } from '../api/client.js'

const router = useRouter()
const { cart, cartTotal, fetchCart, removeItem, updateQty, clearCart } = useCart()
const { isSignedIn } = useAuth()

const showCheckoutModal = ref(false)
const showOrderConfirm  = ref(false)
const orderNumber       = ref('')
const isSubmitting      = ref(false)

// Load server cart when user is signed in
onMounted(() => {
  if (isSignedIn.value) fetchCart()
})

const orderTotal = computed(() =>
  cartTotal.value >= 500 ? cartTotal.value : cartTotal.value + 24
)

function closeCheckoutModal() { showCheckoutModal.value = false }
function closeOrderConfirm()  { showOrderConfirm.value  = false }

function onCheckout() {
  if (!isSignedIn.value) {
    showCheckoutModal.value = true
    return
  }
  orderNumber.value = `ORD-${Date.now().toString().slice(-6)}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
  showOrderConfirm.value = true
}

async function handleConfirmOrder() {
  isSubmitting.value = true
  try {
    const data = await api.post('/orders', {
      shippingAddress: { name: 'Guest', line1: 'N/A', city: 'N/A', zip: '00000', country: 'US' },
    })
    orderNumber.value = data.order._id.slice(-8).toUpperCase()
    await clearCart()
    showOrderConfirm.value = false
    router.push('/')
  } catch (err) {
    // If orders API unavailable, fall back to local clear
    await clearCart()
    showOrderConfirm.value = false
    router.push('/')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Banner */
.cart-banner {
  background: var(--bg-soft);
  border-bottom: 1px solid var(--border);
  padding: 2rem 0;
}
.cart-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  margin-top: 0.75rem;
}

/* Layout */
.cart-layout {
  padding-top: 3rem;
  padding-bottom: 5rem;
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 3rem;
  align-items: start;
}

/* Empty */
.cart-empty {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
}
.empty-icon { color: var(--border-hover); margin-bottom: 0.5rem; }
.cart-empty h2 { color: var(--heading); font-size: 1.5rem; }
.cart-empty p { font-size: 0.95rem; }

/* Items */
.cart-items { display: flex; flex-direction: column; }

.cart-header-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 40px;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 2px solid var(--border);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.cart-row {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 40px;
  gap: 1rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--border);
  align-items: center;
}

.cart-item-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.cart-thumb-link { flex-shrink: 0; }
.cart-thumb {
  width: 72px;
  height: 88px;
  overflow: hidden;
}
.cart-thumb img { width: 100%; height: 100%; object-fit: cover; }

.cart-item-title {
  font-family: var(--font-serif);
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--heading);
  display: block;
  margin-bottom: 0.2rem;
  transition: color var(--transition-fast);
}
.cart-item-title:hover { color: var(--accent); }
.cart-item-creator { font-size: 0.78rem; color: var(--text-muted); margin: 0; }

.cart-price { font-size: 0.9rem; color: var(--text); }
.cart-line-total { font-size: 0.9rem; font-weight: 600; color: var(--heading); }

/* Qty control */
.qty-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
  overflow: hidden;
  background: var(--bg);
  width: fit-content;
}
.qty-btn {
  background: none;
  border: none;
  width: 32px; height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  color: var(--text);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.qty-btn:hover { background: var(--bg-soft); color: var(--accent); }
.qty-value {
  width: 36px;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 600;
  border-left: 1px solid var(--border);
  border-right: 1px solid var(--border);
  line-height: 32px;
}

.remove-btn {
  background: none;
  border: none;
  color: var(--text-light);
  cursor: pointer;
  width: 32px; height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xs);
  transition: color var(--transition-fast), background var(--transition-fast);
}
.remove-btn:hover { color: #ef4444; background: rgba(239, 68, 68, 0.08); }

/* Summary */
.cart-summary {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 1.75rem;
  border-radius: var(--radius-sm);
  position: sticky;
  top: calc(var(--nav-height) + 1rem);
  display: flex;
  flex-direction: column;
  gap: 0;
}
.summary-title {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}
.summary-rows { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  color: var(--text);
}
.summary-row.summary-total {
  font-size: 1rem;
  font-weight: 700;
  color: var(--heading);
}
.free-shipping-note {
  font-size: 0.75rem;
  color: var(--accent);
  text-align: center;
  background: var(--accent-light);
  padding: 0.4rem 0.6rem;
  border-radius: var(--radius-xs);
}
.summary-divider { height: 1px; background: var(--border); }

.checkout-btn { width: 100%; margin-bottom: 0.75rem; }
.continue-link {
  text-align: center;
  font-size: 0.82rem;
  color: var(--text-muted);
  display: block;
  margin-bottom: 1.5rem;
  transition: color var(--transition-fast);
}
.continue-link:hover { color: var(--accent); }

.clear-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 0.75rem;
  cursor: pointer;
  text-align: center;
  padding: 0;
  transition: color var(--transition-fast);
}
.clear-btn:hover { color: #ef4444; }

/* Sign in required banner */
.signin-required-banner {
  grid-column: 1 / -1;
  background-color: rgba(var(--accent-rgb), 0.08);
  border: 1px solid var(--accent-light);
  border-radius: var(--radius-md);
  padding: 24px;
  margin-top: 32px;
}

.signin-banner-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.signin-banner-content h3 {
  font-size: 1.1rem;
  color: var(--heading);
  margin: 0 0 4px 0;
  font-weight: 700;
}

.signin-banner-content p {
  font-size: 0.9rem;
  color: var(--text);
  margin: 0;
}

.btn-sm {
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-card {
  background-color: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 40px 32px;
  max-width: 420px;
  width: 100%;
  position: relative;
  box-shadow: var(--shadow-lg);
  text-align: center;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.modal-close-btn:hover {
  background-color: var(--bg-soft);
  color: var(--text);
}

.modal-title {
  font-size: 1.75rem;
  font-family: var(--font-serif);
  color: var(--accent);
  margin: 0 0 12px 0;
  font-weight: 700;
}

.modal-subtitle {
  font-size: 1rem;
  font-weight: 600;
  color: var(--heading);
  margin: 0 0 12px 0;
}

.modal-description {
  font-size: 0.95rem;
  color: var(--text);
  margin: 0 0 28px 0;
  line-height: 1.6;
}

.btn-modal {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-continue-link {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: color var(--transition-fast);
  padding: 8px 0;
}

.modal-continue-link:hover {
  color: var(--text);
}

/* Modal fade transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Order confirmation modal styles */
.order-success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: rgba(76, 175, 80, 0.1);
  border-radius: var(--radius-full);
  color: #4caf50;
  margin: 0 auto 16px;
}

.order-info-section {
  background-color: var(--bg-soft);
  border-radius: var(--radius-md);
  padding: 16px;
  margin: 24px 0;
  text-align: left;
}

.order-info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.order-info-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.order-info-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--heading);
  font-family: 'Monaco', 'Courier New', monospace;
  letter-spacing: 0.5px;
}

.order-items-summary {
  background-color: var(--bg-soft);
  border-radius: var(--radius-md);
  padding: 16px;
  margin: 24px 0;
  text-align: left;
  max-height: 300px;
  overflow-y: auto;
}

.summary-heading {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--heading);
  margin: 0 0 12px 0;
}

.order-item-row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
  font-size: 0.9rem;
  border-bottom: 1px solid var(--border);
}

.order-item-row:last-of-type {
  border-bottom: none;
}

.order-item-row.total {
  border-bottom: none;
  font-weight: 700;
  color: var(--accent);
  padding-top: 8px;
}

.order-item-name {
  color: var(--text);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-item-qty {
  color: var(--text-muted);
  text-align: center;
}

.order-item-price {
  color: var(--heading);
  font-weight: 600;
  text-align: right;
}

.order-divider {
  height: 1px;
  background-color: var(--border);
  margin: 8px 0;
}

/* Responsive */
@media (max-width: 900px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
  .signin-banner-content { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 640px) {
  .cart-header-row { display: none; }
  .cart-row {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 0.75rem;
  }
  .cart-item-info { grid-column: 1 / -1; }
  .cart-line-total { font-size: 0.95rem; }
}
</style>
