<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getWaitingConversation } from '@/api/conversations';
import type { Conversation } from '@/types/conversation';

const items = ref<Conversation[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    items.value = await getWaitingConversation()
  } catch (e) {
    error.value = e instanceof Error ? e.message: 'Something went wrong'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <h1>Waiting requests</h1>
  <p v-if="loading">Loading requests...</p>
  <div v-else-if="error" role="alert">
    <p>{{ error }}</p>
    <button type="button" @click="load">Try again</button>
  </div>
  <p v-else-if="items.length === 0">No one is waiting right now.</p>
  <ul v-else>
    <li v-for="c in items" :key="c.id">
      Request {{ c.id }}, waiting since {{ c.createdAt }}
      <button type="button" disable>Accept (next milstone)</button>
    </li>
  </ul>
</template>
