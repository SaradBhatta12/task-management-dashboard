"use client"

import { RotateCcw, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  resetTaskFilters,
  setDueDateSort,
  setPriorityFilter,
  setStatusFilter,
  setTaskSearch,
  type DueDateSort,
  type PriorityFilter,
  type StatusFilter,
} from "@/features/tasks/tasksSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"

export function TaskFilters() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.tasks)
  const hasActiveFilters =
    filters.search !== "" ||
    filters.status !== "all" ||
    filters.priority !== "all" ||
    filters.sort !== "due-asc"

  return (
    <div className="grid gap-3 rounded-2xl border bg-muted/25 p-3 sm:grid-cols-2 xl:grid-cols-[minmax(14rem,1fr)_repeat(3,auto)_auto]">
      <label className="relative min-w-0">
        <span className="sr-only">Search tasks by title</span>
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={filters.search}
          onChange={(event) => dispatch(setTaskSearch(event.target.value))}
          className="h-10 w-full rounded-xl border bg-background pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15"
          placeholder="Search tasks by title…"
        />
      </label>

      <label>
        <span className="sr-only">Filter by status</span>
        <select
          value={filters.status}
          onChange={(event) => dispatch(setStatusFilter(event.target.value as StatusFilter))}
          className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-blue-500 sm:w-auto"
        >
          <option value="all">All statuses</option>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Completed</option>
        </select>
      </label>

      <label>
        <span className="sr-only">Filter by priority</span>
        <select
          value={filters.priority}
          onChange={(event) => dispatch(setPriorityFilter(event.target.value as PriorityFilter))}
          className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-blue-500 sm:w-auto"
        >
          <option value="all">All priorities</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>
      </label>

      <label>
        <span className="sr-only">Sort by due date</span>
        <select
          value={filters.sort}
          onChange={(event) => dispatch(setDueDateSort(event.target.value as DueDateSort))}
          className="h-10 w-full rounded-xl border bg-background px-3 text-sm outline-none focus:border-blue-500 sm:w-auto"
        >
          <option value="due-asc">Due date: earliest</option>
          <option value="due-desc">Due date: latest</option>
        </select>
      </label>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="Reset task filters"
        title="Reset filters"
        disabled={!hasActiveFilters}
        onClick={() => dispatch(resetTaskFilters())}
        className="justify-self-end rounded-xl"
      >
        <RotateCcw className="size-4" />
      </Button>
    </div>
  )
}
