import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 border-r p-6 md:block">
      <nav className="flex flex-col gap-3 text-sm">
        <Link href="/">Overview</Link>
        <Link href="/tasks">Tasks</Link>
      </nav>
    </aside>
  )
}
