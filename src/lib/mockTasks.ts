import type { Task } from "@/types/task"

const seedTasks: Task[] = [
  {
    id: "task-1",
    title: "Finalize dashboard wireframes",
    description: "Review the responsive dashboard screens and prepare the final handoff notes.",
    status: "in-progress",
    priority: "high",
    dueDate: "2026-07-23",
    createdAt: "2026-07-18T08:30:00.000Z",
    updatedAt: "2026-07-21T04:15:00.000Z",
  },
  {
    id: "task-2",
    title: "Prepare sprint planning notes",
    description: "Collect open questions and estimates for the upcoming planning session.",
    status: "todo",
    priority: "medium",
    dueDate: "2026-07-25",
    createdAt: "2026-07-19T10:00:00.000Z",
    updatedAt: "2026-07-19T10:00:00.000Z",
  },
  {
    id: "task-3",
    title: "Resolve accessibility review",
    description: "Address focus states, labels, and keyboard navigation findings.",
    status: "done",
    priority: "high",
    dueDate: "2026-07-20",
    createdAt: "2026-07-16T06:45:00.000Z",
    updatedAt: "2026-07-20T12:20:00.000Z",
  },
  {
    id: "task-4",
    title: "Update project documentation",
    description: "Document local setup, environment variables, and the release workflow.",
    status: "todo",
    priority: "low",
    dueDate: "2026-07-29",
    createdAt: "2026-07-20T09:10:00.000Z",
    updatedAt: "2026-07-20T09:10:00.000Z",
  },
]

const globalForTasks = globalThis as typeof globalThis & {
  taskflowMockTasks?: Task[]
}

export function getMockTasks() {
  if (!globalForTasks.taskflowMockTasks) {
    globalForTasks.taskflowMockTasks = seedTasks.map((task) => ({ ...task }))
  }

  return globalForTasks.taskflowMockTasks
}

export function findMockTask(id: string) {
  return getMockTasks().find((task) => task.id === id)
}

export function addMockTask(task: Task) {
  getMockTasks().unshift(task)
  return task
}

export function updateMockTask(id: string, changes: Partial<Task>) {
  const tasks = getMockTasks()
  const index = tasks.findIndex((task) => task.id === id)

  if (index === -1) return null

  tasks[index] = { ...tasks[index], ...changes, id }
  return tasks[index]
}

export function removeMockTask(id: string) {
  const tasks = getMockTasks()
  const index = tasks.findIndex((task) => task.id === id)

  if (index === -1) return false

  tasks.splice(index, 1)
  return true
}
