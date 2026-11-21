<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const roleLabel = computed(() => {
  switch (auth.user?.role) {
    case 'VOLUNTEER': return 'Volunteer'
    case 'ADMIN': return 'Admin'
    default: return 'Member'
  }
})
</script>

<template>
  <div class="w page narrow">
    <h1 style="margin-bottom: 24px">Your profile</h1>
    <section v-if="auth.user" class="cd">
      <div class="pcard">
        <span class="av" aria-hidden="true">{{ auth.user.username.charAt(0) }}</span>
        <div>
          <h2 style="font-size: 28px">{{ auth.user.username }}</h2>
          <p>{{ roleLabel }}</p>
        </div>
      </div>
      <dl class="dl">
        <dt>Role</dt>
        <dd>{{ roleLabel }}</dd>
        <dt>Status</dt>
        <dd>{{ auth.user.approved ? 'Approved' : 'Waiting for approval' }}</dd>
        <dt>Account</dt>
        <dd>{{ auth.user.active ? 'Active' : 'Deactivated' }}</dd>
      </dl>
      <p style="margin-top: 24px"><RouterLink class="btn o s" to="/">Back to home</RouterLink></p>
    </section>
  </div>
</template>
