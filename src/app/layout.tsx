import type { Metadata } from "next"
import type { ReactNode } from "react"

import { ReduxProvider } from "@/lib/providers/ReduxProvider"
import { ThemeProvider } from "@/lib/providers/ThemeProvider"

import "./globals.css"

export const metadata: Metadata = {
  title: "Task Management Dashboard",
  description: "A task management dashboard starter",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
