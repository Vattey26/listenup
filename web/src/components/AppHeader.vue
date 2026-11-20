<script setup lang="ts">
import { watch } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import UrgentHelpButton from './UrgentHelpButton.vue';

const auth = useAuthStore();
const route = useRoute();
const router = userRouter();
const provinces = ['Phnom Penh', 'Siem Reap', 'Battambang', 'Kampot']

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
    <div>
      <RouterLink></RouterLink>
      <nav>
        <div>
          <button></button>
          <div></div>
        </div>
      </nav>
    </div>
  </header>
</template>
