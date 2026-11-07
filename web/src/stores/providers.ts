import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Provider } from '../types/provider'
import { getProviders as fetchProviders } from '../api/providers'

export const useProvidersStore = defineStore('provider', () => {
  const items = ref<Provider[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const search = ref('')
  const province = ref('')
  const freeOnly = ref(false)

  const filtered = computed(() =>
    items.value.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.value.toLowerCase())
      const matchesProvince = !province.value || p.province === province.value
      const matchesFree = !freeOnly.value || p.priceTo === 0
      return p.verified && matchesSearch && matchesProvince && matchesFree
    }),
  )

  const provinces = computed(() => [...new Set(items.value.map((p) => p.province))].sort())

  async function load() {
    loading.value = true
    error.value = null
    try {
      items.value = await fetchProviders()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Something went wrong'
    } finally {
      loading.value = false
    }
  }

  return { items, loading, error, search, province, freeOnly, filtered, provinces, load }
})
