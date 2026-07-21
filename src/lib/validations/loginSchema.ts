export type LoginInput = {
  email: string
  password: string
}

export type LoginErrors = Partial<Record<keyof LoginInput, string>>

export function validateLogin(values: LoginInput): LoginErrors {
  const errors: LoginErrors = {}

  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Enter a valid email address"
  }

  if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters"
  }

  return errors
}
