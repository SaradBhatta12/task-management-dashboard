export type TaskInput = {
  title: string
  description?: string
}

export function isTaskInput(value: unknown): value is TaskInput {
  return typeof value === "object" && value !== null && "title" in value
}
