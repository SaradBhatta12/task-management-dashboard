import { DashboardStats } from "@/features/dashboard/DashboardStats"

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">A placeholder overview for your tasks.</p>
      </div>
      <DashboardStats />
    </section>
  )
}
