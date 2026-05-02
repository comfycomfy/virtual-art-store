<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      |
      <router-link to="/store">Store</router-link>
    </nav>
  </header>

  <main>
    <router-view />
  </main>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  width: 1355px;
  height:50px;
  top: 0;
  left: 0;
  padding: 1rem 2rem;
  background: #feeefd;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}




nav { display:flex; gap:0.75rem; align-items:center }
nav a { color:var(--accent); text-decoration:none; padding:6px 8px; border-radius:6px }
nav a:hover { background: rgba(10,153,153,0.08) }

@media (min-width: 1024px) {
  header { padding:0.75rem 2rem }
}
</style>
