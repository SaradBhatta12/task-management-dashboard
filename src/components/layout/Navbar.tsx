import Link from "next/link"

import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="font-semibold">Task Dashboard</Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
