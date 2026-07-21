"use client"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/providers/ThemeProvider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Toggle theme
    </Button>
  )
}
