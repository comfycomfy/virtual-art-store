<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Left side - Illustration/branding -->
      <div class="login-left">
        <div class="login-branding">
          <svg class="login-logo" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <circle cx="16" cy="16" r="14" stroke="currentColor" stroke-width="1.5"/>
            <circle cx="10" cy="12" r="2.5" fill="currentColor"/>
            <circle cx="22" cy="12" r="2.5" fill="currentColor"/>
            <circle cx="10" cy="22" r="2.5" fill="currentColor"/>
            <circle cx="22" cy="22" r="2.5" fill="currentColor"/>
            <circle cx="16" cy="17" r="3.5" fill="var(--accent)"/>
          </svg>
          <h2 class="login-brand-text">Artisan</h2>
          <p class="login-tagline">Fine Art Store</p>
        </div>
      </div>

      <!-- Right side - Form -->
      <div class="login-right">
        <div class="login-card">
          <h1 class="login-title">Sign in with email</h1>
          <p class="login-subtitle">Make it easy to bring your events data and team together. For free.</p>

          <!-- Social login buttons (optional) -->
          <div class="social-login-group">
            <button type="button" class="social-btn google-btn" aria-label="Sign in with Google" @click.prevent>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Google</span>
            </button>
            <button type="button" class="social-btn microsoft-btn" aria-label="Sign in with Microsoft" @click.prevent>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
              </svg>
              <span>Microsoft</span>
            </button>
            <button type="button" class="social-btn apple-btn" aria-label="Sign in with Apple" @click.prevent>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 13.5c-.91 2.83.37 5.48 2.96 6.13.63.15 1.44.05 1.44-.94V18c0-2.37-1.37-4.4-3.4-5.5zm.44-3.5c1.22 0 2.45-.61 2.45-2.6S18.71 5 17.49 5c-1.9 0-3.15 1.17-3.15 3.09s1.25 3.09 3.15 3.09z"/>
                <path d="M10.88 13.5C9.16 13.5 8 14.88 8 16.6s1.16 3.1 3.09 3.1c1.52 0 2.81-.93 3.15-2.29h-1.64c-.3.67-1.04 1.13-1.51 1.13-1.4 0-2.35-.91-2.35-2.2 0-1.28.95-2.2 2.35-2.2.47 0 1.21.45 1.51 1.13h1.64c-.35-1.35-1.63-2.27-3.15-2.27z"/>
              </svg>
              <span>Apple</span>
            </button>
            <button type="button" class="social-btn sso-btn" aria-label="Sign in with SSO" @click.prevent>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
              </svg>
              <span>SSO</span>
            </button>
          </div>

          <!-- Divider -->
          <div class="divider">
            <span>or</span>
          </div>

          <!-- Email/Password form -->
          <form class="login-form" @submit.prevent="handleLogin" novalidate>
            <!-- Username -->
            <div class="form-group">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                class="form-input"
                :class="{ 'error': errors.username }"
                placeholder="Choose a username"
                @blur="validateField('username')"
              />
              <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{ 'error': errors.email }"
                placeholder="you@example.com"
                autocomplete="email"
                @blur="validateField('email')"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <!-- Password -->
            <div class="form-group">
              <label for="password" class="form-label">Password</label>
              <div class="password-wrap">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  class="form-input"
                  :class="{ 'error': errors.password }"
                  placeholder="••••••••••••"
                  autocomplete="current-password"
                  @blur="validateField('password')"
                />
                <button
                  type="button"
                  class="password-toggle"
                  :aria-label="showPassword ? 'Hide password' : 'Show password'"
                  @click.prevent="showPassword = !showPassword"
                >
                  <svg v-if="showPassword" width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                  <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                </button>
              </div>
              <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
            </div>

            <!-- Forgot password link -->
            <div class="forgot-password">
              <a href="#" @click.prevent>Forgot password?</a>
            </div>

            <!-- Sign in button -->
            <button type="submit" class="btn-signin" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="btn-loader"></span>
              <span>{{ isSubmitting ? 'Signing in...' : 'Sign in' }}</span>
            </button>

            <!-- Sign up link -->
            <p class="signup-link">
              Or <a href="#" @click.prevent>create a link</a>
            </p>

            <!-- Legal text -->
            <p class="legal-text">
              By signing up you agree to our <a href="#" @click.prevent>Terms of Service</a> & <a href="#" @click.prevent>Privacy Policy</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { signIn } = useAuth()

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const errors = reactive({
  username: '',
  email: '',
  password: ''
})

const showPassword = ref(false)
const isSubmitting = ref(false)

const validationRules = {
  username: (value) => {
    if (!value.trim()) return 'Username is required'
    if (value.trim().length < 3) return 'Username must be at least 3 characters'
    if (value.trim().length > 20) return 'Username must be 20 characters or less'
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) return 'Username can only contain letters, numbers, underscores, and hyphens'
    return ''
  },
  email: (value) => {
    if (!value.trim()) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Please enter a valid email address'
    return ''
  },
  password: (value) => {
    if (!value.trim()) return 'Password is required'
    if (value.length < 6) return 'Password must be at least 6 characters'
    return ''
  }
}

function validateField(fieldName) {
  const value = form[fieldName]
  errors[fieldName] = validationRules[fieldName](value)
}

function validateForm() {
  let isValid = true
  Object.keys(form).forEach(fieldName => {
    validateField(fieldName)
    if (errors[fieldName]) isValid = false
  })
  return isValid
}

async function handleLogin() {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Sign in user with username
    signIn(form.username)
    
    // Reset form
    form.username = ''
    form.email = ''
    form.password = ''
    showPassword.value = false
    
    // Redirect to home
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--bg);
  padding: 20px;
  margin-top: var(--nav-height);
}

.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1000px;
  width: 100%;
  align-items: center;
}

/* Left side - Branding */
.login-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.login-branding {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.login-logo {
  width: 120px;
  height: 120px;
  color: var(--accent);
  opacity: 0.8;
}

.login-brand-text {
  font-size: 2.5rem;
  font-family: var(--font-serif);
  color: var(--heading);
  margin: 0;
  line-height: 1;
}

.login-tagline {
  font-size: 1rem;
  color: var(--text-muted);
  margin: 0;
  font-weight: 400;
}

/* Right side - Form */
.login-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: var(--shadow-sm);
}

.login-title {
  font-size: 1.5rem;
  font-family: var(--font-serif);
  color: var(--heading);
  margin: 0 0 8px 0;
  font-weight: 700;
}

.login-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0 0 24px 0;
  line-height: 1.5;
}

/* Social login */
.social-login-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.social-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 8px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--bg);
  color: var(--text);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
}

.social-btn:hover {
  border-color: var(--accent);
  background-color: var(--accent-light);
}

.social-btn span {
  display: none;
}

@media (max-width: 600px) {
  .social-btn span {
    display: block;
  }

  .social-login-group {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 24px 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: var(--border);
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  color: var(--text);
  font-size: 0.9rem;
}

.form-input {
  padding: 12px 14px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--bg);
  color: var(--text);
  font-size: 0.95rem;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
  font-family: var(--font-sans);
}

.form-input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.1);
}

.form-input.error {
  border-color: #d32f2f;
  background-color: rgba(211, 47, 47, 0.03);
}

.form-input.error:focus {
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
  border-color: #d32f2f;
}

.password-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.password-toggle {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color var(--transition-fast);
}

.password-toggle:hover {
  color: var(--text);
}

.error-message {
  color: #d32f2f;
  font-size: 0.8rem;
  font-weight: 500;
}

.forgot-password {
  text-align: right;
  margin-top: -8px;
}

.forgot-password a {
  color: var(--accent);
  font-weight: 500;
  font-size: 0.9rem;
  transition: color var(--transition-fast);
}

.forgot-password a:hover {
  color: var(--accent-hover);
}

/* Sign in button */
.btn-signin {
  padding: 12px 16px;
  background-color: var(--accent);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 4px;
}

.btn-signin:hover:not(:disabled) {
  background-color: var(--accent-hover);
  box-shadow: 0 4px 12px rgba(var(--accent-rgb), 0.3);
}

.btn-signin:active:not(:disabled) {
  transform: translateY(0);
}

.btn-signin:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.btn-loader {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Links */
.signup-link {
  text-align: center;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

.signup-link a {
  color: var(--accent);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.signup-link a:hover {
  color: var(--accent-hover);
}

.legal-text {
  font-size: 0.8rem;
  color: var(--text-light);
  text-align: center;
  margin: 0;
  line-height: 1.5;
}

.legal-text a {
  color: var(--accent);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.legal-text a:hover {
  color: var(--accent-hover);
}

/* Responsive */
@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .login-left {
    display: none;
  }

  .login-card {
    padding: 30px;
  }

  .login-title {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .login-page {
    padding: 16px;
  }

  .login-card {
    padding: 24px;
    border-radius: var(--radius-md);
  }

  .login-title {
    font-size: 1.1rem;
  }

  .login-subtitle {
    font-size: 0.85rem;
  }

  .social-login-group {
    gap: 10px;
  }

  .social-btn {
    padding: 10px 6px;
  }
}
</style>
