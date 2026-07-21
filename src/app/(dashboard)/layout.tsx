import { Navbar } from "@/components/layout/Navbar"
import { PageTransition } from "@/components/layout/PageTransition"
import { Sidebar } from "@/components/layout/Sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/40">
      <Navbar />
      <div className="mx-auto flex max-w-7xl">
        <Sidebar />
        <main className="min-w-0 flex-1 p-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  )
}
