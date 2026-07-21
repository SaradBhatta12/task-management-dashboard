import { Navbar } from "@/components/layout/Navbar"
import { PageTransition } from "@/components/layout/PageTransition"
import { Sidebar } from "@/components/layout/Sidebar"
import { ProtectedRoute } from "@/features/auth/ProtectedRoute"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen gap-3 bg-slate-50 p-3 dark:bg-background">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <Navbar />
          <main className="mx-auto mt-3 min-h-[calc(100vh-6.75rem)] w-full max-w-[96rem] rounded-[1.5rem] border border-blue-100 bg-background p-4 shadow-sm sm:p-6 lg:p-8 dark:border-border">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
