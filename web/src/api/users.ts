import { request } from './http'
import type { User } from '../types/user'

export const findUserByUsername = (username: string) =>
  request<User[]>(`/users?username=${encodeURIComponent(username)}`)

export const createUser = (data: Omit<User, 'id'>) =>
  request<User>('/users', { method: 'POST', body: JSON.stringify(data) })
