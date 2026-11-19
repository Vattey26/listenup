<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import UrgentHelpButton from './UrgentHelpButton.vue';

const auth = useAuthStore();
const route = useRoute();
const router = useRouter();
const provinces = ['Phnom Penh', 'Siem Reap', 'Battambang', 'Kampot']

function closeMenu() {
  const el = document.activeElement
  if (el instanceof HTMLAnchorElement) el.blur();
}

watch(() => route.fullPath, closeMenu)

function logout() {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <header class="hd">
    <div class="w">
      <RouterLink class="lg" to="/"><i></i>ListenUp</RouterLink>
      <nav class="nv" aria-label="Main">
        <div class="dd" @keydown.esc="closeMenu">
          <button class="ddb" type="button" aria-haspopup="true">
            Find Support <span aria-hidden="true">&#966;</span>
          </button>
          <div class="mega">
            <div>
              <h3>Browse</h3>
              <RouterLink to="/porviders?free=1">Free services</RouterLink>
              <RouterLink to="/providers">All providers</RouterLink>
            </div>
            <div class="ft">
              <h3>By province</h3>
              <RouterLink v-for="p in provinces" :key="p" :to="{ path: '/providers', query: { province: p } }">{{ p }}</RouterLink>
            </div>
            <div class="ft">
              <h3>Not sure where to start?</h3>
              <p style="margin: 0 0 12px">Talk to volunteer, Chat. No real or email needed.</p>
              <RouterLink class="btn s" to="/chat/waiting">Talk to somone</RouterLink>
            </div>
          </div>
        </div>
        <div class="dd" @keydown.esc="closeMenu">
          <button class="ddb" type="button" aria-haspopup="true">
            learn <span aria-hidden="true">&#9662;</span>
          </button>
          <div class="mega s">
            <div>
              <RouterLink to="/#how">How ListenUp works</RouterLink>
              <RouterLink to="/#faq">Question</RouterLink>
              <RouterLink to="/help">Safety and help</RouterLink>
            </div>
          </div>
        </div>
      <RouterLink class="nl" to="help">Immediate help</RouterLink>
      </nav>
      <UrgentHelpButton />
      <RouterLink v-if="!auth.isLoggedIn" class="nl" to="/login">Log in</RouterLink>
      <template v-else>
        <RouterLink v-if="auth.user?.role === 'VOLUNTEER'" class="nl" to="/volunteer">Queue</RouterLink>
        <button type="button" class="nl" @click="logout">Log out ({{ auth.user?.username }})</button>
      </template>
      <RouterLink class="btn s" to="/chat/waiting">Talk to someone</RouterLink>
    </div>
  </header>
</template>
