<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { getProvider } from '../api/providers'
import type { Provider } from '../types/provider'

const props = defineProps<{ id: string }>()

const provider = ref<Provider | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

async function load() {
  loading.value = true
  error.value = null
  try {
    provider.value = await getProvider(Number(props.id))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Something went wrong'
  } finally {
    loading.value = false
  }
}

watch(() => props.id, load, { immediate: true })
</script>

<template>
  <RouterLink to="/providers">Back to list</RouterLink>

  <p v-if="loading">Loading provider...</p>
  <div v-else-if="error" role="alert">
    <p>{{ error }}</p>
    <button type="button" @click="load">Try again</button>
  </div>
  <article v-else-if="provider">
    <h1>{{ provider.name }}</h1>
    <p>{{ provider.type }}<span v-if="provider.verified"> (verified)</span></p>
    <dl>
      <dt>Province</dt>
      <dd>{{ provider.province }}</dd>
      <dt>Languages</dt>
      <dd>{{ provider.languages.join(', ') }}</dd>
      <dt>Price</dt>
      <dd>{{ provider.priceTo === 0 ? 'Free' : '$' + provider.priceFrom + ' to $' + provider.priceTo }}</dd>
      <dt>Sessions</dt>
      <dd>{{ provider.delivery }}</dd>
      <dt>Contact</dt>
      <dd>{{ provider.contact }}</dd>
    </dl>
  </article>
</template>