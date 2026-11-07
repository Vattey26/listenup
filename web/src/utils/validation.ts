export interface RegisterForm {
  username: string
  password: string
  confirm: string
}

export type RegisterErrors = Partial<Record<keyof RegisterForm, string>>

export function validationRegister(f: RegisterForm): RegisterErrors {
  const errors: RegisterErrors = {}

  if (f.username.length < 3 || f.username.length > 20) {
    errors.username = 'Username must be 3 to 20 characters'
  } else if (!/^[a-z0-9_]+$/i.test(f.username)) {
    errors.username = 'Use only letters, numbers and underscores'
  }

  if (f.password.length < 8) {
    errors.password = 'Password must be at least 8 characters'
  }

  if (f.confirm !== f.password) {
    errors.confirm = 'Passwords do not match'
  }

  return errors
}
