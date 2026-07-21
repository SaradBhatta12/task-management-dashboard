"use client"

import { Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/providers/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle color theme"
      className="rounded-full border-blue-100 text-blue-600 dark:border-border dark:text-blue-400"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="size-4" />
    </Button>
  )
}
