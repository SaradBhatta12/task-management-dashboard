"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  ChevronLeft,
  CircleHelp,
  ClipboardList,
  Folder,
  LayoutDashboard,
  LogOut,
} from "lucide-react"
import { useState } from "react"

import { cn } from "@/utils"

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: ClipboardList },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "sticky top-3 hidden h-[calc(100vh-1.5rem)] shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-background shadow-sm transition-[width] duration-200 lg:flex dark:border-border",
        collapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex h-20 items-center justify-between px-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Folder className="size-5 fill-current" />
          </span>
          {!collapsed ? <span className="truncate text-xl font-bold tracking-tight">Taskflow</span> : null}
        </Link>

        {!collapsed ? (
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
            className="grid size-9 place-items-center rounded-full border border-blue-100 text-blue-600 transition-colors hover:bg-blue-50 dark:border-border dark:hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>
        ) : null}
      </div>

      {collapsed ? (
        <button
          type="button"
          aria-label="Expand sidebar"
          onClick={() => setCollapsed(false)}
          className="mx-auto mb-4 grid size-8 rotate-180 place-items-center rounded-full border text-muted-foreground hover:bg-muted"
        >
          <ChevronLeft className="size-4" />
        </button>
      ) : null}

      <div className="mx-5 h-px bg-border" />

      <nav className="flex flex-1 flex-col gap-1.5 px-3 py-5">
        {!collapsed ? (
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Workspace
          </p>
        ) : null}

        {navigation.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "text-muted-foreground hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-muted dark:hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" />
              {!collapsed ? item.label : null}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1.5 border-t p-3">
        <button
          type="button"
          title={collapsed ? "Help & support" : undefined}
          className={cn(
            "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <CircleHelp className="size-5" />
          {!collapsed ? "Help & support" : null}
        </button>
        <Link
          href="/login"
          title={collapsed ? "Log out" : undefined}
          className={cn(
            "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="size-5" />
          {!collapsed ? "Log out" : null}
        </Link>
      </div>
    </aside>
  )
}
