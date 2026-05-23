import { ref, computed } from 'vue'

// Reactive state
const isSignedIn = ref(localStorage.getItem('isSignedIn') === 'true')
const userName = ref(localStorage.getItem('userName') || '')

// Sign in function
export function useAuth() {
  const signIn = (username) => {
    isSignedIn.value = true
    userName.value = username
    localStorage.setItem('isSignedIn', 'true')
    localStorage.setItem('userName', username)
  }

  const signOut = () => {
    isSignedIn.value = false
    userName.value = ''
    localStorage.removeItem('isSignedIn')
    localStorage.removeItem('userName')
  }

  return {
    isSignedIn: computed(() => isSignedIn.value),
    userName: computed(() => userName.value),
    signIn,
    signOut
  }
}
