<template>
  <footer class="site-footer">
    <!-- Newsletter strip -->
    <div class="newsletter-strip">
      <div class="container newsletter-inner">
        <div class="newsletter-heading">
          <h3>Sign Up For Latest News</h3>
        </div>
        <form class="newsletter-form" @submit.prevent="onSubscribe" novalidate>
          <div class="input-wrap">
            <input
              v-model="email"
              type="email"
              placeholder="Your email address"
              aria-label="Email address"
              autocomplete="email"
            />
            <button type="submit" class="subscribe-btn" :disabled="submitted">
              {{ submitted ? 'Subscribed!' : 'Sign Up' }}
              <svg v-if="!submitted" width="16" height="16" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>
          <p class="or-text">Or use our <a href="#" @click.prevent>telegram</a></p>
          <p v-if="error" class="form-error" role="alert">{{ error }}</p>
        </form>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bar">
      <div class="container footer-bar-inner">
        <p class="copyright">
          &copy; {{ year }} Artisan Fine Art Store. All rights reserved.
        </p>
        <nav class="social-links" aria-label="Social media">
          <!-- Facebook -->
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Facebook">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <!-- Twitter/X -->
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Twitter">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </a>
          <!-- LinkedIn -->
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          <!-- Pinterest -->
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Pinterest">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.137-1.868 3.137-4.564 0-2.387-1.716-4.055-4.165-4.055-2.837 0-4.502 2.128-4.502 4.328 0 .856.33 1.774.741 2.276a.3.3 0 01.069.286c-.076.315-.245 1-.278 1.134-.045.183-.15.222-.345.134-1.249-.582-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
            </svg>
          </a>
          <!-- Instagram -->
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Instagram">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
        </nav>
        <p class="contact-email">
          <a href="mailto:hello@artisan.art">hello@artisan.art</a>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const submitted = ref(false)
const error = ref('')
const year = new Date().getFullYear()

function onSubscribe() {
  error.value = ''
  const trimmed = email.value.trim()
  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    error.value = 'Please enter a valid email address.'
    return
  }
  submitted.value = true
  email.value = ''
}
</script>

<style scoped>
.site-footer {
  background: var(--bg-soft);
  border-top: 1px solid var(--border);
  margin-top: auto;
}

/* Newsletter strip */
.newsletter-strip {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border);
}
.newsletter-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}
.newsletter-heading h3 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-family: var(--font-serif);
  color: var(--heading);
  letter-spacing: 0.06em;
  font-weight: 400;
}

.newsletter-form {
  flex: 1;
  max-width: 480px;
}
.input-wrap {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--border);
  background: var(--bg);
  border-radius: var(--radius-xs);
  overflow: hidden;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}
.input-wrap:focus-within {
  border-color: var(--border-hover);
  box-shadow: 0 0 0 3px var(--accent-light);
}
.input-wrap input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.8rem 1rem;
  font-size: 0.88rem;
  color: var(--text);
  outline: none;
}
.input-wrap input::placeholder { color: var(--text-light); }

.subscribe-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 1.2rem;
  background: transparent;
  border: none;
  border-left: 1px solid var(--border);
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.04em;
  cursor: pointer;
  white-space: nowrap;
  transition: color var(--transition-fast);
}
.subscribe-btn:hover:not(:disabled) { color: var(--accent); }
.subscribe-btn:disabled { cursor: default; color: var(--accent); }

.or-text {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 0.5rem;
  text-align: right;
}
.or-text a { color: var(--text-muted); text-decoration: underline; }
.or-text a:hover { color: var(--accent); }

.form-error {
  font-size: 0.78rem;
  color: #ef4444;
  margin-top: 0.4rem;
}

/* Footer bar */
.footer-bar {
  padding: 1.4rem 0;
}
.footer-bar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.copyright {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.contact-email {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.contact-email a:hover { color: var(--accent); }

.social-links {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}
.social-link {
  color: var(--text-muted);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px; height: 32px;
  border-radius: var(--radius-full);
  transition: color var(--transition-fast), background var(--transition-fast);
}
.social-link:hover {
  color: var(--accent);
  background: var(--accent-light);
}

@media (max-width: 640px) {
  .newsletter-inner { flex-direction: column; align-items: flex-start; }
  .newsletter-form { max-width: 100%; width: 100%; }
  .footer-bar-inner { flex-direction: column; align-items: center; text-align: center; }
}
</style>
