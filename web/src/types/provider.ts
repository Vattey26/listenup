export interface Provider {
  id: number
  name: string
  type: 'THERAPIST' | 'CLINIC' | 'NGO'
  province: string
  languages: string[]
  contact: string
  priceFrom: number
  priceTo: number
  delivery: 'ONLINE' | 'IN_PERSON' | 'BOTH'
  verified: boolean
}
