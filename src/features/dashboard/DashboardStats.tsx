import { SummaryCard } from "./SummaryCard"

export function DashboardStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard label="Total tasks" value={0} />
      <SummaryCard label="In progress" value={0} />
      <SummaryCard label="Completed" value={0} />
    </div>
  )
}
