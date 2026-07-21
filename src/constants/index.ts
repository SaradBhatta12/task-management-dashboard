import type { TaskPriority, TaskStatus } from "@/types/task"

export const TASK_STATUSES: TaskStatus[] = ["todo", "in-progress", "done"]
export const TASK_PRIORITIES: TaskPriority[] = ["low", "medium", "high"]

export const DEMO_CREDENTIALS = {
  email: "alex@example.com",
  password: "123456",
} as const

export const DEMO_AUTH_TOKEN = "taskflow-demo-session"
