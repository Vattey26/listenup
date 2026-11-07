import { describe, it, expect } from 'vitest'
import { validationRegister } from '../utils/validation'

describe('validationRegister', () => {
  it('accepts a valid form', () => {
    expect(
      validationRegister({ username: 'dara_01', password: 'longenough', confirm: 'longenough' }),
    ).toEqual({})
  })
  it('rejects a short username', () => {
    expect(
      validationRegister({ username: 'ab', password: 'longenough', confirm: 'longenough' })
        .username,
    ).toBeDefined()
  })
  it('rejects mismatched passwords', () => {
    expect(
      validationRegister({ username: 'dara_01', password: 'longenough', confirm: 'different' })
        .confirm,
    ).toBe('Passwords do not match')
  })
})
