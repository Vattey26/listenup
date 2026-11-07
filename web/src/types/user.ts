export interface User {
  id: number
  username: string
  role: 'MEMBER' | 'VOLUNTEER' | 'ADMIN'
  approved: boolean
  active: boolean
}
