export function TaskDetailDrawer({ taskId }: { taskId: string }) {
  return (
    <section className="rounded-xl border bg-card p-6">
      <h1 className="text-2xl font-semibold">Task details</h1>
      <p className="mt-2 text-muted-foreground">Placeholder for task {taskId}.</p>
    </section>
  )
}
