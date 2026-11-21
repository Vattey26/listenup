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
  <div class="w page narrow">
    <h1>Get help now</h1>
    <div class="note">
      <strong>In danger? Contact emergency services first.</strong>
      <p style="margin: 6px 0 0">This app is not a crisis service.</p>
    </div>
    <p v-if="usingFallback" class="stt">Could not load the latest list. Showing a built-in list.</p>
    <ul class="list stack" style="grid-template-columns: 1fr">
      <li v-for="h in helplines" :key="h.id" class="cd">
        <h3>{{ h.name }}</h3>
        <p><b>{{ h.phone }}</b></p>
        <p>{{ h.hours }}, {{ h.languages.join(', ') }}. Last checked {{ h.lastVerified }}.</p>
      </li>
    </ul>
    <p style="margin-top: 24px">
      <button type="button" class="btn o" @click="quickExit">Quick exit</button>
    </p>
  </div>
</template>
