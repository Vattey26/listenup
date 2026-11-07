import type { Provider } from '../types/provider'

const BASE_URL = 'http://localhost:3001'

export async function fetchProviders(): Promise<Provider[]> {
  const res = await fetch(`${BASE_URL}/providers`)
  if (!res.ok) throw new Error(`Could not load providers (${res.status})`)
  return res.json()
}

export async function fetchProvider(id: number): Promise<Provider> {
  const res = await fetch(`${BASE_URL}/providers/${id}`)
  if (!res.ok) throw new Error(`Could not load provider (${res.status})`)
  return res.json()
}