<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const username = ref('')
const fieldError = ref('')

async function onSubmit() {
  fieldError.value = username.value.trim() ? '' : 'Enter your username'
  if (fieldError.value) return
  if (await auth.login(username.value.trim())) {
    const r = route.query.redirect
    router.push(typeof r === 'string' && r.startsWith('/') && !r.startsWith('//') ? r : '/')
  }
}
</script>

<template>
  <div class="w page narrow">
    <h1>Log in</h1>
    <p>Prototype login: username only. Passwords come later.</p>
    <form novalidate @submit.prevent="onSubmit">
      <div class="fld">
        <label for="username">Username</label>
        <input id="username" v-model="username" autocomplete="username" />
        <p v-if="fieldError" class="err" role="alert">{{ fieldError }}</p>
      </div>
      <p v-if="auth.error" class="err" role="alert">{{ auth.error }}</p>
      <button type="submit" class="btn" :disabled="auth.loading">Log in</button>
    </form>
    <p>No account yet? <RouterLink to="/register"><b>Create an account</b></RouterLink></p>
  </div>
</template>
