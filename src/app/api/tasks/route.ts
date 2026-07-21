import { addMockTask, getMockTasks } from "@/lib/mockTasks"
import { TASK_PRIORITIES, TASK_STATUSES } from "@/constants"
import type { Task, TaskInput } from "@/types/task"

function isTaskInput(value: unknown): value is TaskInput {
  if (!value || typeof value !== "object") return false

  const input = value as Partial<TaskInput>

  return Boolean(
    typeof input.title === "string" &&
      input.title.trim() &&
      typeof input.description === "string" &&
      typeof input.status === "string" &&
      TASK_STATUSES.includes(input.status) &&
      typeof input.priority === "string" &&
      TASK_PRIORITIES.includes(input.priority) &&
      typeof input.dueDate === "string" &&
      !Number.isNaN(Date.parse(input.dueDate)),
  )
}

export async function GET() {
  return Response.json(getMockTasks())
}

export async function POST(request: Request) {
  const input: unknown = await request.json()

  if (!isTaskInput(input)) {
    return Response.json({ message: "Invalid task data" }, { status: 400 })
  }

  const now = new Date().toISOString()
  const task: Task = {
    ...input,
    title: input.title.trim(),
    description: input.description.trim(),
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
  }

  return Response.json(addMockTask(task), { status: 201 })
}
