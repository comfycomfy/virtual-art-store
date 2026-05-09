<template>
  <nav class="topnav">
    <div class="container">
      <div class="brand">
        <router-link to="/" class="logo">Virtual Art</router-link>
      </div>

      <div class="controls">
        <button class="theme-toggle" @click="toggleTheme" :aria-pressed="isDark" :title="isDark ? 'Switch to light' : 'Switch to dark'">
          <svg v-if="!isDark" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else width="18" height="18" color="white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
          </svg>
        </button>

        <button class="burger" @click="open = !open" :aria-expanded="open" aria-label="Toggle menu">
          <span class="bar"></span>
        </button>
      </div>

      <div class="links" :class="{open: open}">
        <router-link to="/" class="nav-link" @click="close">Home</router-link>
        <router-link to="/store" class="nav-link" @click="close">Store</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TopNav',
  data() {
    return { open: false, isDark: false }
  },
  mounted() {
    // Initialize theme from localStorage or system preference
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') this.setDark(true)
    else if (saved === 'light') this.setDark(false)
    else {
      const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      this.setDark(prefers)
    }
  },
  methods: {
    close() { this.open = false },
    setDark(val) {
      this.isDark = !!val
      try { document.body.classList.toggle('dark', this.isDark) } catch (e) {}
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },
    toggleTheme() { this.setDark(!this.isDark) }
  }
}
</script>

<style scoped>
.topnav{position:fixed;left:0;right:0;top:0;height:64px;background:var(--nav-bg, rgba(255,255,255,0.98));backdrop-filter:blur(6px);box-shadow:0 4px 18px rgba(12,20,30,0.06);border-bottom:1px solid rgba(16,24,40,0.04);z-index:1000}
.container{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;padding:0 1rem;height:100%}
.brand .logo{font-weight:700;color:var(--color-heading);text-decoration:none;font-size:1.05rem}
.controls{display:flex;align-items:right;gap:0.5rem}
.links{display:flex;gap:0.75rem;align-items:center}
.nav-link{color:var(--color-text);text-decoration:none;padding:8px 12px;border-radius:8px;transition:background .15s,color .15s}
.nav-link.router-link-active{background:var(--nav-active-bg,#eef2ff);color:var(--nav-active-color,#312e81)}
.nav-link:hover{background:rgba(15,23,42,0.04)}
.theme-toggle{background:none;border:0;cursor:pointer;width:40px;height:40px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px}
.theme-toggle svg{display:block}
.theme-toggle:hover{background:rgba(15,23,42,0.04)}
.burger{display:none;background:none;border:0;cursor:pointer;width:44px;height:44px;align-items:center;justify-content:center}
.burger .bar{display:block;width:20px;height:2px;background:currentColor;position:relative;transition:transform .2s}
.burger .bar::before,.burger .bar::after{content:'';position:absolute;left:0;width:20px;height:2px;background:currentColor;transition:transform .2s,top .2s,opacity .2s}
.burger .bar::before{top:-6px}
.burger .bar::after{top:6px}
.burger[aria-expanded="true"] .bar{background:transparent}
.burger[aria-expanded="true"] .bar::before{transform:translateY(6px) rotate(45deg);top:0}
.burger[aria-expanded="true"] .bar::after{transform:translateY(-6px) rotate(-45deg);top:0}

@media (max-width:768px){
  .links{position:absolute;top:64px;left:0;right:0;background:#fff;flex-direction:column;gap:0;padding:0.5rem 1rem;border-bottom:1px solid rgba(0,0,0,0.04);transform:scaleY(0);transform-origin:top;transition:transform .18s ease}
  .links.open{transform:scaleY(1)}
  .nav-link{padding:12px 8px;width:100%}
  .burger{display:flex}
}
</style>
