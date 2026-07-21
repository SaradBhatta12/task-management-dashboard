import type { Task } from "@/types/task"

export function TaskCard({ task }: { task: Task }) {
  return (
    <article className="rounded-xl border bg-card p-4">
      <h2 className="font-medium">{task.title}</h2>
      <p className="text-sm text-muted-foreground">{task.status}</p>
    </article>
  )
}
