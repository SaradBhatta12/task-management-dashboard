"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  ChevronLeft,
  CircleHelp,
  ClipboardList,
  Folder,
  LayoutDashboard,
  LogOut,
  X,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import { clearCredentials } from "@/features/auth/authSlice"
import { closeMobileSidebar, toggleSidebar } from "@/features/ui/uiSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { cn } from "@/utils"

const navigation = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Tasks", href: "/tasks", icon: ClipboardList },
]

type SidebarContentProps = {
  collapsed: boolean
  mobile?: boolean
  pathname: string
  onCollapse: () => void
  onClose: () => void
  onLogout: () => void
}

function SidebarContent({
  collapsed,
  mobile = false,
  pathname,
  onCollapse,
  onClose,
  onLogout,
}: SidebarContentProps) {
  const hideLabels = collapsed && !mobile

  return (
    <>
      <div className="flex h-20 items-center justify-between px-5">
        <Link href="/" onClick={onClose} className="flex min-w-0 items-center gap-3">
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
            <Folder className="size-5 fill-current" />
          </span>
          {!hideLabels ? (
            <span className="truncate text-xl font-bold tracking-tight">Taskflow</span>
          ) : null}
        </Link>

        {mobile ? (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={onClose}
            className="grid size-9 place-items-center rounded-full border text-muted-foreground hover:bg-muted"
          >
            <X className="size-4" />
          </button>
        ) : !collapsed ? (
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={onCollapse}
            className="grid size-9 place-items-center rounded-full border border-blue-100 text-blue-600 transition-colors hover:bg-blue-50 dark:border-border dark:hover:bg-muted"
          >
            <ChevronLeft className="size-4" />
          </button>
        ) : null}
      </div>

      {hideLabels ? (
        <button
          type="button"
          aria-label="Expand sidebar"
          onClick={onCollapse}
          className="mx-auto mb-4 grid size-8 rotate-180 place-items-center rounded-full border text-muted-foreground hover:bg-muted"
        >
          <ChevronLeft className="size-4" />
        </button>
      ) : null}

      <div className="mx-5 h-px bg-border" />

      <nav className="flex flex-1 flex-col gap-1.5 px-3 py-5">
        {!hideLabels ? (
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
              onClick={onClose}
              title={hideLabels ? item.label : undefined}
              className={cn(
                "flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                hideLabels && "justify-center px-0",
                isActive
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "text-muted-foreground hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-muted dark:hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" />
              {!hideLabels ? item.label : null}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-1.5 border-t p-3">
        <button
          type="button"
          title={hideLabels ? "Help and support" : undefined}
          className={cn(
            "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground",
            hideLabels && "justify-center px-0",
          )}
        >
          <CircleHelp className="size-5" />
          {!hideLabels ? "Help and support" : null}
        </button>
        <button
          type="button"
          onClick={onLogout}
          title={hideLabels ? "Log out" : undefined}
          className={cn(
            "flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-muted-foreground hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30",
            hideLabels && "justify-center px-0",
          )}
        >
          <LogOut className="size-5" />
          {!hideLabels ? "Log out" : null}
        </button>
      </div>
    </>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const reduceMotion = useReducedMotion()
  const { sidebarCollapsed, mobileSidebarOpen } = useAppSelector((state) => state.ui)

  useEffect(() => {
    document.body.style.overflow = mobileSidebarOpen ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileSidebarOpen])

  function closeMobile() {
    dispatch(closeMobileSidebar())
  }

  function handleLogout() {
    dispatch(clearCredentials())
    dispatch(closeMobileSidebar())
    router.replace("/login")
  }

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 256 }}
        transition={
          reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 34 }
        }
        className="sticky top-3 hidden h-[calc(100vh-1.5rem)] shrink-0 flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-background shadow-sm lg:flex dark:border-border"
      >
        <SidebarContent
          collapsed={sidebarCollapsed}
          pathname={pathname}
          onCollapse={() => dispatch(toggleSidebar())}
          onClose={() => undefined}
          onLogout={handleLogout}
        />
      </motion.aside>

      <AnimatePresence>
        {mobileSidebarOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobile}
              className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={reduceMotion ? false : { x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-3 left-3 z-50 flex w-72 flex-col overflow-hidden rounded-[1.75rem] border border-blue-100 bg-background shadow-2xl lg:hidden dark:border-border"
            >
              <SidebarContent
                collapsed={false}
                mobile
                pathname={pathname}
                onCollapse={() => undefined}
                onClose={closeMobile}
                onLogout={handleLogout}
              />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
