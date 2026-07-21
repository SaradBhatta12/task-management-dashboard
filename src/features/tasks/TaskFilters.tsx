"use client"

export function TaskFilters() {
  return (
    <div className="flex gap-3">
      <input className="rounded-md border bg-background px-3 py-2" placeholder="Search tasks" />
      <select className="rounded-md border bg-background px-3 py-2" defaultValue="all">
        <option value="all">All statuses</option>
        <option value="todo">To do</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  )
}
