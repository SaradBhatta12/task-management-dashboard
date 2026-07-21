export type TaskStatus = "todo" | "in-progress" | "done"
export type TaskPriority = "low" | "medium" | "high"

export type Task = {
  id: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string
  createdAt: string
  updatedAt: string
}

export type TaskInput = Pick<
  Task,
  "title" | "description" | "status" | "priority" | "dueDate"
>

export type TaskUpdate = Partial<TaskInput>
