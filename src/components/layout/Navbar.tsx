"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Bell, CheckCircle2, ChevronDown, LogOut, Menu, Search, UserRound } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import { clearCredentials } from "@/features/auth/authSlice"
import { openMobileSidebar } from "@/features/ui/uiSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

import { ThemeToggle } from "./ThemeToggle"

function getInitials(name?: string) {
  if (!name) return "TU"

  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("")
}

export function Navbar() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const reduceMotion = useReducedMotion()
  const user = useAppSelector((state) => state.auth.user)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const firstName = user?.name.split(" ")[0] || "there"
  const initials = getInitials(user?.name)

  useEffect(() => {
    if (!profileMenuOpen) return

    function handlePointerDown(event: PointerEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileMenuOpen(false)
      }
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [profileMenuOpen])

  function handleLogout() {
    setProfileMenuOpen(false)
    dispatch(clearCredentials())
    router.replace("/login")
  }

  return (
    <header className="sticky top-3 z-20 flex h-[4.5rem] items-center justify-between rounded-[1.75rem] border border-blue-100 bg-background/95 px-4 shadow-sm backdrop-blur sm:px-6 dark:border-border">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          aria-label="Open navigation"
          onClick={() => dispatch(openMobileSidebar())}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-600 text-white lg:hidden"
        >
          <Menu className="size-5" />
        </button>

        <div className="hidden min-w-0 items-center gap-3 sm:flex">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <CheckCircle2 className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold sm:text-base">Welcome back, {firstName}</p>
            <p className="truncate text-xs text-muted-foreground">
              Stay on top of your tasks today
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <Link
          href="/tasks"
          aria-label="Search tasks"
          className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Search className="size-5" />
        </Link>
        <button
          type="button"
          aria-label="Notifications"
          title="No new notifications"
          className="relative grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="size-5" />
        </button>

        <ThemeToggle />

        <div ref={profileMenuRef} className="relative">
          <button
            type="button"
            aria-label="Open profile menu"
            aria-haspopup="menu"
            aria-expanded={profileMenuOpen}
            onClick={() => setProfileMenuOpen((open) => !open)}
            className="ml-1 flex items-center gap-2 rounded-full pl-1 sm:pr-2"
          >
            <span className="grid size-10 place-items-center rounded-full bg-orange-500 text-sm font-semibold text-white">
              {initials}
            </span>
            <ChevronDown
              className={`hidden size-4 text-muted-foreground transition-transform sm:block ${profileMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {profileMenuOpen ? (
              <motion.div
                role="menu"
                initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.16, ease: "easeOut" }}
                className="absolute right-0 top-[calc(100%+0.75rem)] z-50 w-64 overflow-hidden rounded-2xl border border-blue-100 bg-popover p-2 text-popover-foreground shadow-xl shadow-slate-950/10 dark:border-border"
              >
                <div className="flex items-center gap-3 px-3 py-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-orange-500 text-sm font-semibold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {user?.name || "Taskflow User"}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email || "Signed in"}
                    </p>
                  </div>
                </div>

                <div className="my-1 h-px bg-border" />

                <button
                  type="button"
                  role="menuitem"
                  disabled
                  aria-disabled="true"
                  className="flex h-10 w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 text-sm text-muted-foreground opacity-50"
                >
                  <UserRound className="size-4" />
                  View profile
                  <span className="ml-auto text-[10px] uppercase tracking-wide">Soon</span>
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
