import { TaskFilters } from "@/features/tasks/TaskFilters"
import { TaskList } from "@/features/tasks/TaskList"

export default function TasksPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
      <TaskFilters />
      <TaskList />
    </section>
  )
}
