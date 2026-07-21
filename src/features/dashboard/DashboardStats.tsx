"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  ListTodo,
  TriangleAlert,
} from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton"
import { Button } from "@/components/ui/button"
import { useGetTasksQuery } from "@/features/tasks/tasksApi"

import { SummaryCard } from "./SummaryCard"

export function DashboardStats() {
  const reduceMotion = useReducedMotion()
  const { data: tasks = [], isLoading, isError, refetch } = useGetTasksQuery()

  const summary = useMemo(() => {
    const completed = tasks.filter((task) => task.status === "done").length
    const pending = tasks.length - completed
    const highPriority = tasks.filter(
      (task) => task.priority === "high" && task.status !== "done",
    ).length
    const upcoming = tasks
      .filter((task) => task.status !== "done")
      .toSorted((first, second) => Date.parse(first.dueDate) - Date.parse(second.dueDate))
      .slice(0, 3)

    return {
      completed,
      pending,
      highPriority,
      upcoming,
      completionRate: tasks.length ? Math.round((completed / tasks.length) * 100) : 0,
    }
  }, [tasks])

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <LoadingSkeleton key={index} className="h-40" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-950 dark:bg-red-950/20">
        <AlertCircle className="mx-auto size-8 text-red-600" />
        <h2 className="mt-3 font-semibold">Unable to load your dashboard</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Task information is temporarily unavailable.
        </p>
        <Button className="mt-4" variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total tasks"
          value={tasks.length}
          description="All tasks in your workspace"
          icon={ListTodo}
        />
        <SummaryCard
          label="Completed"
          value={summary.completed}
          description={`${summary.completionRate}% completion rate`}
          icon={CheckCircle2}
          tone="green"
        />
        <SummaryCard
          label="Pending"
          value={summary.pending}
          description="Tasks still requiring attention"
          icon={CircleDashed}
          tone="amber"
        />
        <SummaryCard
          label="High priority"
          value={summary.highPriority}
          description="Open tasks marked as urgent"
          icon={TriangleAlert}
          tone="red"
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl border bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Overall progress</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Keep moving tasks across the finish line.
              </p>
            </div>
            <span className="text-2xl font-bold text-blue-600">{summary.completionRate}%</span>
          </div>
          <div
            role="progressbar"
            aria-label="Task completion progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={summary.completionRate}
            className="mt-6 h-3 overflow-hidden rounded-full bg-muted"
          >
            <motion.div
              initial={reduceMotion ? false : { width: 0 }}
              animate={{ width: `${summary.completionRate}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-full rounded-full bg-blue-600"
            />
          </div>
          <div className="mt-4 flex justify-between text-xs text-muted-foreground">
            <span>{summary.completed} completed</span>
            <span>{summary.pending} remaining</span>
          </div>
        </section>

        <section className="rounded-2xl border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">Next up</h2>
              <p className="mt-1 text-sm text-muted-foreground">Your nearest open deadlines.</p>
            </div>
            <Link href="/tasks" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>

          <div className="mt-5 space-y-2">
            {summary.upcoming.length ? (
              summary.upcoming.map((task) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="flex items-center justify-between gap-4 rounded-xl border p-3 transition-colors hover:border-blue-200 hover:bg-blue-50/50 dark:hover:border-blue-900 dark:hover:bg-blue-950/20"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium">{task.title}</span>
                    <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      Due {task.dueDate}
                    </span>
                  </span>
                  <span className="shrink-0 rounded-full bg-muted px-2.5 py-1 text-xs capitalize text-muted-foreground">
                    {task.priority}
                  </span>
                </Link>
              ))
            ) : (
              <p className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                No pending tasks. Nice work!
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
