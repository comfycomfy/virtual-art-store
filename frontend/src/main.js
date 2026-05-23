import './assets/main.css'
import './assets/styles.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Initialize theme early so body.dark is applied before components mount
try {
	const saved = localStorage.getItem('theme')
	let isDark = false
	if (saved === 'dark') isDark = true
	else if (saved === 'light') isDark = false
	else isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	document.body.classList.toggle('dark', !!isDark)
} catch (e) {}

createApp(App).use(router).mount('#app')
