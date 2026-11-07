<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const username = ref('')
const fieldError = ref('')

async function onSubmitted() {
  fieldError.value = username.value.trim() ? '' : 'Enter your username'
  if (fieldError.value) return
  if (await auth.login(username.value.trim())) {
    const r = route.query.redirect
    router.push(typeof r === 'string' && r.startsWith('/') && !r.startsWith('//') ? r : '/')
  }
}
</script>

<template>
  <h1>Log in</h1>
  <p>Prototype login: username only. Passwords come later.</p>
  <form novalidate @submit.prevent="onSubmitted">
    <label for="username">Username</label>
    <input
      id="username"
      v-model="username"
      autocomplete="username"
    />
    <p v-if="fieldError" role="alert">{{ fieldError }}</p>
    <p v-if="auth.error" role="alert">{{ auth.error }}</p>
    <button type="submit" :disabled="auth.loading">Log in</button>
  </form>
</template>
