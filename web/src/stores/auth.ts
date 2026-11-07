import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '../types/user'
import { createUser, findUserByUsername } from '../api/users'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const isLoggedIn = computed(() => user.value !== null)

  async function register(username: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const name = username.toLowerCase()
      const existing = await findUserByUsername(name)
      if (existing.length > 0) {
        error.value = 'That username is already taken'
        return false
      }
      user.value = await createUser({
        username: name,
        role: 'MEMBER',
        approved: true,
        active: true,
      })
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  async function login(username: string): Promise<boolean> {
    loading.value = true
    error.value = null
    try {
      const match = (await findUserByUsername(username.toLowerCase()))[0]
      if (!match || !match.active) {
        error.value = 'No active user with that username'
        return false
      }
      user.value = match
      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
  }

  return { user, loading, error, isLoggedIn, register, login, logout }
})
