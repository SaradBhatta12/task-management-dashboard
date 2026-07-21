import { TASK_PRIORITIES, TASK_STATUSES } from "@/constants"
import { findMockTask, removeMockTask, updateMockTask } from "@/lib/mockTasks"
import type { TaskPriority, TaskStatus, TaskUpdate } from "@/types/task"

type TaskRouteContext = {
  params: Promise<{ id: string }>
}

function isTaskUpdate(value: unknown): value is TaskUpdate {
  if (!value || typeof value !== "object") return false

  const changes = value as Record<string, unknown>

  return !(
    (changes.title !== undefined &&
      (typeof changes.title !== "string" || !changes.title.trim())) ||
    (changes.description !== undefined && typeof changes.description !== "string") ||
    (changes.status !== undefined &&
      (typeof changes.status !== "string" ||
        !TASK_STATUSES.includes(changes.status as TaskStatus))) ||
    (changes.priority !== undefined &&
      (typeof changes.priority !== "string" ||
        !TASK_PRIORITIES.includes(changes.priority as TaskPriority))) ||
    (changes.dueDate !== undefined &&
      (typeof changes.dueDate !== "string" || Number.isNaN(Date.parse(changes.dueDate))))
  )
}

export async function GET(_request: Request, context: TaskRouteContext) {
  const { id } = await context.params
  const task = findMockTask(id)

  if (!task) {
    return Response.json({ message: "Task not found" }, { status: 404 })
  }

  return Response.json(task)
}

export async function PATCH(request: Request, context: TaskRouteContext) {
  const { id } = await context.params
  const changes: unknown = await request.json()

  if (!isTaskUpdate(changes)) {
    return Response.json({ message: "Invalid task data" }, { status: 400 })
  }

  const task = updateMockTask(id, {
    ...changes,
    ...(changes.title !== undefined ? { title: changes.title.trim() } : {}),
    ...(changes.description !== undefined
      ? { description: changes.description.trim() }
      : {}),
    updatedAt: new Date().toISOString(),
  })

  if (!task) {
    return Response.json({ message: "Task not found" }, { status: 404 })
  }

  return Response.json(task)
}

export async function DELETE(_request: Request, context: TaskRouteContext) {
  const { id } = await context.params

  if (!removeMockTask(id)) {
    return Response.json({ message: "Task not found" }, { status: 404 })
  }

  return new Response(null, { status: 204 })
}
