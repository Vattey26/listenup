<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import UrgentHelpButton from './UrgentHelpButton.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const provinces = ['Phnom Penh', 'Siem Reap', 'Battambang', 'Kampot']

// Menus open on hover or focus, so blurring closes them
function closeMenus() {
  const el = document.activeElement
  if (el instanceof HTMLElement) el.blur()
}
watch(() => route.fullPath, closeMenus)

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
        <div class="dd" @keydown.esc="closeMenus">
          <button class="ddb" type="button" aria-haspopup="true">Find support</button>
          <div class="mega">
            <div>
              <h3>Browse</h3>
              <RouterLink to="/providers?free=1">Free services</RouterLink>
              <RouterLink to="/providers">All providers</RouterLink>
            </div>
            <div>
              <h3>By province</h3>
              <RouterLink
                v-for="p in provinces"
                :key="p"
                :to="{ path: '/providers', query: { province: p } }"
                >{{ p }}</RouterLink
              >
            </div>
            <div class="ft">
              <h3>Not sure where to start?</h3>
              <p style="margin: 0 0 12px">
                Talk to a volunteer in writing. No real name or email needed.
              </p>
              <RouterLink class="btn s" to="/chat/waiting">Talk to someone</RouterLink>
            </div>
          </div>
        </div>

        <div class="dd" @keydown.esc="closeMenus">
          <button class="ddb" type="button" aria-haspopup="true">Learn</button>
          <div class="mega s">
            <div>
              <RouterLink to="/#how">How ListenUp works</RouterLink>
              <RouterLink to="/#faq">Questions</RouterLink>
              <RouterLink to="/help">Safety and help</RouterLink>
            </div>
          </div>
        </div>

        <RouterLink class="nl" to="/help">Immediate help</RouterLink>
        <RouterLink v-if="auth.user?.role === 'VOLUNTEER'" class="nl" to="/volunteer"
          >Queue</RouterLink
        >
      </nav>

      <span class="sp"></span>

      <UrgentHelpButton />
      <RouterLink v-if="!auth.user || auth.user.role === 'MEMBER'" class="btn s" to="/chat/waiting"
        >Talk to someone</RouterLink
      >

      <template v-if="auth.user">
        <RouterLink class="pf" to="/profile" aria-label="Your profile">
          <span class="av" aria-hidden="true">{{ auth.user.username.charAt(0) }}</span>
          <span class="un">{{ auth.user.username }}</span>
        </RouterLink>
        <button type="button" class="btn o s" @click="logout">Log out</button>
      </template>
      <RouterLink v-else class="nl" to="/login">Log in</RouterLink>
    </div>
  </header>
</template>
