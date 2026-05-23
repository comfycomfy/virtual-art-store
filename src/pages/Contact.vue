<template>
  <div class="contact-page">
    <!-- Page header banner -->
    <div class="contact-banner">
      <div class="container">
        <h1 class="contact-title">Contact Us</h1>
        <p class="contact-sub">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
    </div>

    <!-- Main contact section -->
    <div class="container contact-container">
      <div class="contact-layout">
        <!-- Contact form -->
        <div class="contact-form-wrap">
          <form class="contact-form" @submit.prevent="submitForm" novalidate>
            <!-- Name fields -->
            <div class="form-row">
              <div class="form-group">
                <label for="first-name" class="form-label">
                  First Name
                  <span class="required-indicator">(required)</span>
                </label>
                <input
                  id="first-name"
                  v-model="form.firstName"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.firstName }"
                  placeholder="John"
                  @blur="validateField('firstName')"
                />
                <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
              </div>
              <div class="form-group">
                <label for="last-name" class="form-label">
                  Last Name
                  <span class="required-indicator">(required)</span>
                </label>
                <input
                  id="last-name"
                  v-model="form.lastName"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.lastName }"
                  placeholder="Doe"
                  @blur="validateField('lastName')"
                />
                <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
              </div>
            </div>

            <!-- Email field -->
            <div class="form-group">
              <label for="email" class="form-label">
                Email
                <span class="required-indicator">(required)</span>
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                class="form-input"
                :class="{ 'error': errors.email }"
                placeholder="john@example.com"
                autocomplete="email"
                @blur="validateField('email')"
              />
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>

            <!-- Message field -->
            <div class="form-group">
              <label for="message" class="form-label">
                Message
                <span class="required-indicator">(required)</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                class="form-textarea"
                :class="{ 'error': errors.message }"
                placeholder="Tell us about your inquiry..."
                rows="6"
                @blur="validateField('message')"
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <!-- Submit button -->
            <button type="submit" class="btn btn-primary contact-submit" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="btn-loader"></span>
              <span>{{ isSubmitting ? 'Sending...' : 'Send Message' }}</span>
            </button>

            <!-- Success message -->
            <transition name="fade">
              <div v-if="successMessage" class="success-message" role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {{ successMessage }}
              </div>
            </transition>
          </form>
        </div>

        <!-- Contact info sidebar -->
        <div class="contact-info-wrap">
          <!-- Mailing address -->
          <div class="info-section">
            <h3 class="info-title">Mailing Address</h3>
            <address class="info-content">
              <p>325 – 1831 College Avenue</p>
              <p>Regina, Saskatchewan</p>
              <p>S4P 4V5</p>
              <p>Canada</p>
            </address>
          </div>

          <!-- Email -->
          <div class="info-section">
            <h3 class="info-title">Email</h3>
            <p class="info-content">
              <a href="mailto:info@saskgalleries.ca" class="contact-link">info@saskgalleries.ca</a>
            </p>
          </div>

          <!-- Phone -->
          <div class="info-section">
            <h3 class="info-title">Phone</h3>
            <p class="info-content">
              <a href="tel:+13067753323" class="contact-link">(306) 775-3323</a>
            </p>
          </div>

          <!-- Social media -->
          <div class="info-section info-section-social">
            <h3 class="info-title">Follow Us</h3>
            <nav class="social-links-contact" aria-label="Social media links">
              <!-- Facebook -->
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" class="social-link-icon" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <!-- Instagram -->
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" class="social-link-icon" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <circle cx="17.5" cy="6.5" r="1.5"/>
                </svg>
              </a>
              <!-- TikTok -->
              <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" class="social-link-icon" aria-label="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.9 2.9 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.36-.04z"/>
                </svg>
              </a>
              <!-- YouTube -->
              <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" class="social-link-icon" aria-label="YouTube">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <!-- Twitter -->
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" class="social-link-icon" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form state
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')

// Validation rules
const validationRules = {
  firstName: (value) => {
    if (!value.trim()) return 'First name is required'
    if (value.trim().length < 2) return 'First name must be at least 2 characters'
    return ''
  },
  lastName: (value) => {
    if (!value.trim()) return 'Last name is required'
    if (value.trim().length < 2) return 'Last name must be at least 2 characters'
    return ''
  },
  email: (value) => {
    if (!value.trim()) return 'Email is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) return 'Please enter a valid email address'
    return ''
  },
  message: (value) => {
    if (!value.trim()) return 'Message is required'
    if (value.trim().length < 10) return 'Message must be at least 10 characters'
    return ''
  }
}

// Validate individual field
function validateField(fieldName) {
  const value = form[fieldName]
  errors[fieldName] = validationRules[fieldName](value)
}

// Validate all fields
function validateForm() {
  let isValid = true
  Object.keys(form).forEach(fieldName => {
    validateField(fieldName)
    if (errors[fieldName]) isValid = false
  })
  return isValid
}

// Submit form
async function submitForm() {
  successMessage.value = ''

  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    // Simulate API call (replace with actual backend call)
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Show success message
    successMessage.value = 'Thank you! We received your message and will get back to you soon.'

    // Reset form
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.message = ''
    Object.keys(errors).forEach(key => errors[key] = '')

    // Auto-hide success message after 5 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  } catch (error) {
    successMessage.value = 'Something went wrong. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
/* Page header */
.contact-banner {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
  margin-top: var(--nav-height);
}

.contact-title {
  font-size: 2.5rem;
  margin-bottom: 12px;
  font-family: var(--font-serif);
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--bg-soft);
}

.contact-sub {
  font-size: 1.1rem;
  opacity: 0.95;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.6;
}

/* Main container */
.contact-container {
  padding: 60px 0;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;
}

/* Form styles */
.contact-form-wrap {
  display: flex;
  flex-direction: column;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-weight: 600;
  color: var(--text);
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
}

.required-indicator {
  font-weight: 400;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.form-input,
.form-textarea {
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--bg);
  color: var(--text);
  font-size: 1rem;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
  font-family: var(--font-sans);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(var(--accent-rgb), 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #d32f2f;
  background-color: rgba(211, 47, 47, 0.03);
}

.form-input.error:focus,
.form-textarea.error:focus {
  box-shadow: 0 0 0 3px rgba(211, 47, 47, 0.1);
  border-color: #d32f2f;
}

.form-textarea {
  resize: vertical;
  min-height: 140px;
  font-family: var(--font-sans);
}

.error-message {
  color: #d32f2f;
  font-size: 0.85rem;
  font-weight: 500;
  margin-top: -4px;
}

/* Submit button */
.contact-submit {
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 32px;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.5px;
}

.btn-loader {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.contact-submit:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

/* Success message */
.success-message {
  padding: 14px 16px;
  background-color: rgba(76, 175, 80, 0.1);
  border: 1px solid rgba(76, 175, 80, 0.3);
  border-radius: var(--radius-md);
  color: #2e7d32;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: slideInUp 0.3s ease;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Contact info sidebar */
.contact-info-wrap {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 20px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.info-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--heading);
  margin-bottom: 4px;
}

.info-content {
  font-size: 0.95rem;
  color: var(--text);
  line-height: 1.8;
  font-style: normal;
}

.contact-link {
  color: var(--accent);
  font-weight: 500;
  transition: color var(--transition-fast);
}

.contact-link:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}

/* Social links */
.social-links-contact {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.social-link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  background-color: var(--accent-light);
  color: var(--accent);
  transition: all var(--transition-base);
  border: 1px solid transparent;
}

.social-link-icon:hover {
  background-color: var(--accent);
  color: white;
  transform: translateY(-2px);
}

/* Button primary style */
.btn {
  border: none;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all var(--transition-base);
  cursor: pointer;
}

.btn-primary {
  background-color: var(--accent);
  color: white;
  padding: 14px 32px;
}

.btn-primary:hover:not(:disabled) {
  background-color: var(--accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--accent-rgb), 0.3);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive design */
@media (max-width: 768px) {
  .contact-title {
    font-size: 2rem;
  }

  .contact-sub {
    font-size: 1rem;
  }

  .contact-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-info-wrap {
    padding: 0;
    order: -1;
    border-bottom: 1px solid var(--border);
    padding-bottom: 40px;
  }

  .info-section-social {
    gap: 16px;
  }

  .contact-submit {
    width: 100%;
  }

  .contact-banner {
    padding: 40px 0;
    margin-top: calc(var(--nav-height) + 20px);
  }

  .contact-sub {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 40px 0;
  }

  .contact-title {
    font-size: 1.75rem;
  }

  .contact-form {
    gap: 18px;
  }

  .contact-info-wrap {
    gap: 30px;
  }

  .social-link-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
