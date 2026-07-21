import { DashboardStats } from "@/features/dashboard/DashboardStats"

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A live overview of your workload and upcoming deadlines.
        </p>
      </div>
      <DashboardStats />
    </section>
  )
}
