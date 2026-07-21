export type LoginInput = {
  email: string
  password: string
}

export function isLoginInput(value: unknown): value is LoginInput {
  return typeof value === "object" && value !== null && "email" in value && "password" in value
}
