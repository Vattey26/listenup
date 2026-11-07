export interface Conversation {
  id: number
  status: 'WAITING' | 'ACTIVE' | 'CLOSED'
  memberId: number
  volunteerId: number | null
  createdAt: string
  closedAt: string | null
}
