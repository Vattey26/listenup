import { request } from './http'
import type { Helpline } from '../types/helpline'

export const getHelplines = () => request<Helpline[]>('/helplines?_sort=priority')