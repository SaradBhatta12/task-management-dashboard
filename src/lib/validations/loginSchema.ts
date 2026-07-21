import { DEMO_CREDENTIALS } from "@/constants"

export type LoginInput = {
  email: string
  password: string
}

export type LoginErrors = Partial<Record<keyof LoginInput, string>>

export function validateLogin(values: LoginInput): LoginErrors {
  const errors: LoginErrors = {}

  if (values.email !== DEMO_CREDENTIALS.email) {
    errors.email = "Email does not match the demo account"
  }

  if (values.password !== DEMO_CREDENTIALS.password) {
    errors.password = "Password does not match the demo account"
  }

  return errors
}
