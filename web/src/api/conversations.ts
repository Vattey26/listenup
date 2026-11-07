import { request } from './http'
import type { Conversation } from '@/types/conversation'

export const getWaitingConversation = () => request<Conversation[]>('/conversations?status=WAITING')
