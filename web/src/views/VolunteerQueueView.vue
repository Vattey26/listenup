<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getWaitingConversation } from '../api/conversations'
import type { Conversation } from '../types/conversation'

const items = ref<Conversation[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    items.value = await getWaitingConversation()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="w page narrow">
    <h1>Waiting requests</h1>
    <p v-if="loading" class="stt">Loading requests...</p>
    <div v-else-if="error" class="stt" role="alert">
      <p>{{ error }}</p>
      <button type="button" class="btn s" @click="load">Try again</button>
    </div>
    <p v-else-if="items.length === 0" class="stt">No one is waiting right now.</p>
    <ul v-else class="list stack" style="grid-template-columns: 1fr">
      <li v-for="c in items" :key="c.id" class="cd">
        <h3>Request {{ c.id }}</h3>
        <p>Waiting since {{ new Date(c.createdAt).toLocaleString() }}</p>
        <p style="margin-top: 12px">
          <button type="button" class="btn s" disabled>Accept (next milestone)</button>
        </p>
      </li>
    </ul>
  </div>
</template>
