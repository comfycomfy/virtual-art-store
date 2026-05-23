import { ref, computed } from 'vue'
import { api } from '../api/client.js'

// Module-level reactive state (shared across all composable calls)
const token      = ref(localStorage.getItem('token') || '')
const user       = ref(JSON.parse(localStorage.getItem('user') || 'null'))
const isSignedIn = computed(() => !!token.value)
const userName   = computed(() => user.value?.username || '')

export function useAuth() {
  async function signIn(email, password) {
    const data = await api.post('/auth/login', { email, password })
    token.value = data.token
    user.value  = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data.user
  }

  async function register(username, email, password) {
    const data = await api.post('/auth/register', { username, email, password })
    token.value = data.token
    user.value  = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    return data.user
  }

  function signOut() {
    token.value = ''
    user.value  = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { isSignedIn, userName, user, signIn, register, signOut }
}
