import type { Metadata } from "next"

import { ReduxProvider } from "@/lib/providers/ReduxProvider"
import { ThemeProvider } from "@/lib/providers/ThemeProvider"

import "./globals.css"

export const metadata: Metadata = {
  title: "Task Management Dashboard",
  description: "A task management dashboard starter",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
