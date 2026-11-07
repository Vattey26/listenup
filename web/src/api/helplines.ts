import { request } from './http'
import type { Helpline } from '../types/helplines'

export const getHelplines = () => request<Helpline[]>('/helplines?_sort=priority')
