<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import UrgentHelpButton from './components/UrgentHelpButton.vue'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const router = useRouter()

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="top">
    <strong>ListenUp</strong>
    <UrgentHelpButton />
  </header>
  <p class="banner">Prototype only. Not a crisis service. Fake data.</p>
  <main><RouterView /></main>
  <nav class="bottom">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/providers">Find help</RouterLink>
    <RouterLink to="/register">Account</RouterLink>
    <RouterLink v-if="!auth.isLoggedIn" to="/login">Log in</RouterLink>
    <template v-else>
      <RouterLink v-if="auth.user?.role === 'VOLUNTEER'" to="volunteer">Queue</RouterLink>
      <button type="button" @click="logout">Log out ({{ auth.user?.username }})</button>
    </template>
  </nav>
</template>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #999;
}
.banner {
  margin: 0;
  padding: 0.4rem 1rem;
  background: #eee;
  color: #444;
  font-size: 0.8rem;
  text-align: center;
}
main {
  padding: 1rem;
}
.bottom {
  display: flex;
  justify-content: space-around;
  padding: 0.9rem;
  border-top: 1px solid #999;
}
</style>
