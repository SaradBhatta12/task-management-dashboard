import { TaskList } from "@/features/tasks/TaskList"

export default function TasksPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">Create, prioritize, and track work from one place.</p>
      </div>
      <TaskList />
    </section>
  )
}
