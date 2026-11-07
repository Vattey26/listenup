<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'
import { useProvidersStore } from '../stores/providers'

const store = useProvidersStore()
const { filtered, provinces, loading, error, search, province, freeOnly } = storeToRefs(store)

onMounted(() => store.load())
</script>

<template>
  <h1>Find support</h1>

  <label for="search">Search by name</label>
  <input id="search" v-model="search" type="search" />

  <label for="province">Province</label>
  <select id="province" v-model="province">
    <option value="">Any province</option>
    <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
  </select>

  <label><input v-model="freeOnly" type="checkbox" /> Free only</label>

  <p v-if="loading">Loading providers...</p>
  <div v-else-if="error" role="alert">
    <p>{{ error }}</p>
    <button type="button" @click="store.load()">Try again</button>
  </div>
  <p v-else-if="filtered.length === 0">No providers match your filters.</p>
  <ul v-else>
    <li v-for="p in filtered" :key="p.id">
      <RouterLink :to="`/providers/${p.id}`">{{ p.name }}</RouterLink>
      <div>{{ p.type }}, {{ p.province }}, {{ p.languages.join(', ') }}</div>
      <div>{{ p.priceTo === 0 ? 'Free' : '$' + p.priceFrom + ' to $' + p.priceTo }}</div>
    </li>
  </ul>
</template>
