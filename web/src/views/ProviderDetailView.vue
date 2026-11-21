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
  <div class="w page narrow">
    <RouterLink class="back" to="/providers">&larr; Back to list</RouterLink>

    <p v-if="loading" class="stt">Loading provider...</p>
    <div v-else-if="error" class="stt" role="alert">
      <p>{{ error }}</p>
      <button type="button" class="btn s" @click="load">Try again</button>
    </div>
    <article v-else-if="provider" class="cd">
      <span v-if="provider.verified" class="bd">Verified</span>
      <h1 style="margin-top: 12px">{{ provider.name }}</h1>
      <p>{{ provider.type }}</p>
      <dl class="dl">
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
  </div>
</template>
