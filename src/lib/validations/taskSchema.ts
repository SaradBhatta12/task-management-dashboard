import type { TaskInput } from "@/types/task"

export type TaskErrors = Partial<Record<keyof TaskInput, string>>

export function validateTask(values: TaskInput): TaskErrors {
  const errors: TaskErrors = {}

  if (!values.title.trim()) {
    errors.title = "Title is required"
  } else if (values.title.trim().length > 120) {
    errors.title = "Title must be 120 characters or fewer"
  }

  if (values.description.trim().length > 600) {
    errors.description = "Description must be 600 characters or fewer"
  }

  if (!values.dueDate || Number.isNaN(Date.parse(values.dueDate))) {
    errors.dueDate = "Choose a valid due date"
  }

  return errors
}
