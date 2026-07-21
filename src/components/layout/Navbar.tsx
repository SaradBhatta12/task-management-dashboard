import Link from "next/link"
import { Bell, CheckCircle2, ChevronDown, Folder, Search } from "lucide-react"

import { ThemeToggle } from "./ThemeToggle"

export function Navbar() {
  return (
    <header className="sticky top-3 z-20 flex h-[4.5rem] items-center justify-between rounded-[1.75rem] border border-blue-100 bg-background/95 px-4 shadow-sm backdrop-blur sm:px-6 dark:border-border">
      <div className="flex min-w-0 items-center gap-3">
        <Link href="/" className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white lg:hidden">
          <Folder className="size-5 fill-current" />
        </Link>

        <div className="hidden min-w-0 items-center gap-3 sm:flex">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold sm:text-base">Welcome back, Alex</p>
            <p className="truncate text-xs text-muted-foreground">Stay on top of your tasks today</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          aria-label="Search"
          className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Search className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="relative grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-orange-500 ring-2 ring-background" />
        </button>

        <ThemeToggle />

        <button type="button" className="ml-1 flex items-center gap-2 rounded-full pl-1 sm:pr-2">
          <span className="grid size-10 place-items-center rounded-full bg-orange-500 text-sm font-semibold text-white">AS</span>
          <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
        </button>
      </div>
    </header>
  )
}
