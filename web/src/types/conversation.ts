export interface Conversation {
  id: Number
  status: 'WAITING' | 'ACTIVE' | 'CLOSED'
  memberId: number
  volunteerId: number | null
  createdAt: string
  closedAt: string | null
}
