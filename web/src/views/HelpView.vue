<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHelplines } from '../api/helplines'
import type { Helpline } from '../types/helplines'

const fallback: Helpline[] = [
  { id: 1, name: 'Sample Helpline A', phone: '000 000 000', hours: 'Placeholder', languages: ['Khmer'], priority: 1, lastVerified: '2026-01-01' },
]

const helplines = ref<Helpline[]>(fallback)
const usingFallback = ref(false)

onMounted(async () => {
  try {
    helplines.value = await getHelplines()
  } catch {
    usingFallback.value = true
  }
})

function quickExit() {
  window.location.replace('https://www.google.com')
}
</script>

<template>
  <h1>Get help now</h1>
  <p><strong>In danger? Contact emergency services first.</strong> This app is not a crisis service.</p>
  <p v-if="usingFallback">Could not load the latest list. Showing a built-in list.</p>
  <ul>
    <li v-for="h in helplines" :key="h.id">
      <strong>{{ h.name }}</strong>
      <div>{{ h.phone }}</div>
      <div>{{ h.hours }}, {{ h.languages.join(', ') }}, last checked {{ h.lastVerified }}</div>
    </li>
  </ul>
  <button type="button" @click="quickExit">Quick exit</button>
</template>