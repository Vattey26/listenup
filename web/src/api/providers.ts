import { request } from './http'
import type { Provider } from '../types/provider'

export const getProviders = () => request<Provider[]>('/providers')
export const getProvider = (id: number) => request<Provider>(`/providers/${id}`)
