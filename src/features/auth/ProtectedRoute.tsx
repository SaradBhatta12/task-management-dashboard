"use client"

import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

import { DEMO_AUTH_TOKEN, DEMO_CREDENTIALS } from "@/constants"
import { useAppSelector } from "@/store/hooks"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter()
  const isAuthenticated = useAppSelector(
    (state) =>
      state.auth.token === DEMO_AUTH_TOKEN && state.auth.user?.email === DEMO_CREDENTIALS.email,
  )

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-muted-foreground dark:bg-background">
        Checking your session…
      </div>
    )
  }

  return children
}
