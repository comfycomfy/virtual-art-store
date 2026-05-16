<template>
  <TopNav />
  <main>
    <router-view />
  </main>
  <SiteFooter />
</template>

<script>
import TopNav from './components/TopNav.vue'
import SiteFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: { TopNav, SiteFooter }
}
</script>
