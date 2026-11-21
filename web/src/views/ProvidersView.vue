<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { RouterLink, useRoute } from 'vue-router'
import { useProvidersStore } from '../stores/providers'

const store = useProvidersStore()
const route = useRoute()
const { filtered, provinces, loading, error, search, province, freeOnly } = storeToRefs(store)

onMounted(() => {
  if (route.query.free) freeOnly.value = true
  if (typeof route.query.province === 'string') province.value = route.query.province
  store.load()
})
</script>

<template>
  <div class="w page">
    <h1 style="margin-bottom: 24px">Find support</h1>
    <div class="pv">
      <aside class="side" aria-label="Filters">
        <div>
          <label for="search">Search by name</label>
          <input id="search" v-model="search" type="search" />
        </div>
        <div>
          <label for="province">Province</label>
          <select id="province" v-model="province">
            <option value="">Any province</option>
            <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>
        <label class="chk"><input v-model="freeOnly" type="checkbox" /> Free only</label>
      </aside>

      <div>
        <p v-if="loading" class="stt">Loading providers...</p>
        <div v-else-if="error" class="stt" role="alert">
          <p>{{ error }}</p>
          <button type="button" class="btn s" @click="store.load()">Try again</button>
        </div>
        <p v-else-if="filtered.length === 0" class="stt">No providers match your filters.</p>
        <ul v-else class="list">
          <li v-for="p in filtered" :key="p.id" class="cd">
            <span class="bd">Verified</span>
            <h3 style="margin-top: 12px"><RouterLink :to="`/providers/${p.id}`">{{ p.name }}</RouterLink></h3>
            <p>{{ p.type }}, {{ p.province }}. {{ p.languages.join(', ') }}.</p>
            <p><b>{{ p.priceTo === 0 ? 'Free' : '$' + p.priceFrom + ' to $' + p.priceTo }}</b></p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
