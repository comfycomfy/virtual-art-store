<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/store">Store</router-link>
    </nav>
  </header>

  <TopNav />

  <main>
    <router-view />
  </main>
</template>

<script>
import TopNav from './components/TopNav.vue'

export default {
  name: 'App',
  components: { TopNav }
}
</script>

<style>
main {
  padding-top: 72px;
}
</style>