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
            :key="item.id"
            class="cart-row"
          >
            <!-- Image + title -->
            <div class="cart-item-info">
              <router-link :to="`/product/${item.id}`" class="cart-thumb-link">
                <div class="art-frame cart-thumb">
                  <img :src="item.image" :alt="item.title" />
                </div>
              </router-link>
              <div>
                <router-link :to="`/product/${item.id}`" class="cart-item-title">
                  {{ item.title }}
                </router-link>
                <p class="cart-item-creator">{{ item.creator }}</p>
              </div>
            </div>

            <!-- Unit price -->
            <span class="cart-price">
              ${{ item.price.toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
            </span>

            <!-- Quantity -->
            <div class="qty-control">
              <button class="qty-btn" @click="updateQty(item.id, item.qty - 1)" aria-label="Decrease">−</button>
              <span class="qty-value" aria-live="polite">{{ item.qty }}</span>
              <button class="qty-btn" @click="updateQty(item.id, item.qty + 1)" aria-label="Increase">+</button>
            </div>

            <!-- Line total -->
            <span class="cart-line-total">
              ${{ (item.price * item.qty).toLocaleString('en-US', { minimumFractionDigits: 2 }) }}
            </span>

            <!-- Remove -->
            <button class="remove-btn" @click="removeItem(item.id)" aria-label="Remove item">
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCart } from '../composables/useCart.js'

const { cart, cartTotal, removeItem, updateQty, clearCart } = useCart()

const orderTotal = computed(() =>
  cartTotal.value >= 500 ? cartTotal.value : cartTotal.value + 24
)

function onCheckout() {
  alert('Checkout flow not yet implemented. Total: $' + orderTotal.value.toFixed(2))
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

/* Responsive */
@media (max-width: 900px) {
  .cart-layout { grid-template-columns: 1fr; }
  .cart-summary { position: static; }
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
