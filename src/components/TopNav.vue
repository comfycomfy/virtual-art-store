<template>
  <nav class="topnav" :class="{ scrolled }">
    <div class="nav-inner container">

      <!-- Logo -->
      <router-link to="/" class="logo-wrap" @click="close">
        <svg class="logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="10" cy="12" r="2.5" fill="currentColor"/>
          <circle cx="22" cy="12" r="2.5" fill="currentColor"/>
          <circle cx="10" cy="22" r="2.5" fill="currentColor"/>
          <circle cx="22" cy="22" r="2.5" fill="currentColor"/>
          <circle cx="16" cy="17" r="3.5" fill="var(--accent)"/>
        </svg>
        <span class="logo-text">Artisan</span>
      </router-link>

      <!-- Desktop links -->
      <ul class="nav-links">
        <li><router-link to="/" class="nav-link" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/store" class="nav-link" active-class="active">Shop</router-link></li>
        <li><a href="#about" class="nav-link" @click.prevent>About</a></li>
        <li><a href="#contact" class="nav-link" @click.prevent>Contact</a></li>
      </ul>

      <!-- Right controls -->
      <div class="nav-controls">
        <!-- Theme toggle -->
        <button
          class="icon-btn theme-toggle"
          @click="toggleTheme"
          :aria-pressed="isDark"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!-- Sun icon -->
          <svg v-if="isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1"  x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12"  x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
          </svg>
          <!-- Moon icon -->
          <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
          </svg>
        </button>

        <!-- Cart -->
        <router-link to="/cart" class="icon-btn cart-btn" aria-label="Shopping cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden>
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount > 9 ? '9+' : cartCount }}</span>
        </router-link>

        <!-- Mobile hamburger -->
        <button
          class="icon-btn burger"
          @click="open = !open"
          :aria-expanded="open"
          aria-label="Toggle navigation"
        >
          <span class="burger-lines" :class="{ open }">
            <span></span><span></span><span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile drawer -->
    <div class="mobile-menu" :class="{ open }" aria-hidden="!open">
      <ul>
        <li><router-link to="/" class="mobile-link" @click="close" exact-active-class="active">Home</router-link></li>
        <li><router-link to="/store" class="mobile-link" @click="close" active-class="active">Shop</router-link></li>
        <li><a href="#about" class="mobile-link" @click.prevent="close">About</a></li>
        <li><a href="#contact" class="mobile-link" @click.prevent="close">Contact</a></li>
        <li><router-link to="/cart" class="mobile-link" @click="close">Cart ({{ cartCount }})</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useCart } from '../composables/useCart.js'

export default {
  name: 'TopNav',
  setup() {
    const { cartCount } = useCart()
    return { cartCount }
  },
  data() {
    return { open: false, isDark: false, scrolled: false }
  },
  mounted() {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') this.setDark(true)
    else if (saved === 'light') this.setDark(false)
    else {
      const prefers = window.matchMedia?.('(prefers-color-scheme: dark)').matches
      this.setDark(!!prefers)
    }
    window.addEventListener('scroll', this.onScroll, { passive: true })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    close() { this.open = false },
    setDark(val) {
      this.isDark = !!val
      document.body.classList.toggle('dark', this.isDark)
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    toggleTheme() { this.setDark(!this.isDark) },
    onScroll() { this.scrolled = window.scrollY > 24 }
  }
}
</script>

<style scoped>
.topnav {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: var(--nav-height);
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--nav-border);
  z-index: 1000;
  transition: box-shadow 0.25s ease;
}
.topnav.scrolled {
  box-shadow: 0 4px 24px rgba(0,0,0,0.09);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  gap: 2rem;
}

/* Logo */
.logo-wrap {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  flex-shrink: 0;
}
.logo-icon {
  width: 28px; height: 28px;
  color: var(--heading);
  flex-shrink: 0;
}
.logo-text {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--heading);
  letter-spacing: 0.02em;
}

/* Desktop nav links */
.nav-links {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  padding: 0;
  margin: 0 auto;
}
.nav-link {
  display: block;
  padding: 0.45rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text);
  border-radius: var(--radius-sm);
  letter-spacing: 0.02em;
  transition: color var(--transition-fast), background var(--transition-fast);
}
.nav-link:hover { color: var(--accent); }
.nav-link.active { color: var(--accent); }

/* Controls */
.nav-controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  flex-shrink: 0;
}

.icon-btn {
  position: relative;
  background: none;
  border: none;
  width: 40px; height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  color: var(--text);
  transition: background var(--transition-fast), color var(--transition-fast);
  cursor: pointer;
  text-decoration: none;
}
.icon-btn:hover { background: var(--bg-soft); color: var(--accent); }

/* Cart badge */
.cart-btn { position: relative; }
.cart-badge {
  position: absolute;
  top: 4px; right: 4px;
  min-width: 17px; height: 17px;
  background: var(--accent);
  color: #fff;
  border-radius: var(--radius-full);
  font-size: 0.65rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  line-height: 1;
  pointer-events: none;
}

/* Hamburger */
.burger { display: none; }
.burger-lines {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 20px;
}
.burger-lines span {
  display: block;
  height: 1.5px;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.2s, opacity 0.2s, width 0.2s;
}
.burger-lines.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.burger-lines.open span:nth-child(2) { opacity: 0; width: 0; }
.burger-lines.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile menu */
.mobile-menu {
  display: none;
  background: var(--nav-bg);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border);
  padding: 0.75rem 1.5rem 1.25rem;
  transform-origin: top;
}
.mobile-menu ul { list-style: none; padding: 0; }
.mobile-link {
  display: block;
  padding: 0.75rem 0;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text);
  border-bottom: 1px solid var(--border);
  transition: color var(--transition-fast);
}
.mobile-link:last-of-type { border-bottom: none; }
.mobile-link:hover, .mobile-link.active { color: var(--accent); }

@media (max-width: 768px) {
  .nav-links { display: none; }
  .burger { display: inline-flex; }
  .mobile-menu { display: block; max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; padding-top: 0; padding-bottom: 0; }
  .mobile-menu.open { max-height: 400px; padding-top: 0.75rem; padding-bottom: 1.25rem; }
}
</style>

