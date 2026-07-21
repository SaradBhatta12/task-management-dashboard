"use client"

import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FileText,
  Flag,
  Hash,
  Sparkles,
  Target,
} from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton"
import { Button } from "@/components/ui/button"
import { useGetTaskQuery } from "@/features/tasks/tasksApi"
import { setSelectedTaskId } from "@/features/tasks/tasksSlice"
import { useAppDispatch } from "@/store/hooks"

const statusDetails = {
  todo: { label: "To do", progress: 15, icon: CircleDashed },
  "in-progress": { label: "In progress", progress: 60, icon: Target },
  done: { label: "Completed", progress: 100, icon: CheckCircle2 },
}

function formatDate(value: string, style: "long" | "short" = "short") {
  return new Intl.DateTimeFormat("en", {
    ...(style === "long"
      ? { dateStyle: "long" as const }
      : { month: "short" as const, day: "numeric" as const, year: "numeric" as const }),
    timeZone: "UTC",
  }).format(new Date(value))
}

export function TaskDetailDrawer({ taskId }: { taskId: string }) {
  const dispatch = useAppDispatch()
  const reduceMotion = useReducedMotion()
  const { data: task, isLoading, isError, refetch } = useGetTaskQuery(taskId)

  useEffect(() => {
    dispatch(setSelectedTaskId(taskId))

    return () => {
      dispatch(setSelectedTaskId(null))
    }
  }, [dispatch, taskId])

  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-4">
        <LoadingSkeleton className="h-8 w-32" />
        <LoadingSkeleton className="h-80 rounded-[1.75rem]" />
        <div className="grid gap-4 lg:grid-cols-[1.4fr_0.6fr]">
          <LoadingSkeleton className="h-64" />
          <LoadingSkeleton className="h-64" />
        </div>
      </div>
    )
  }

  if (isError || !task) {
    return (
      <section className="mx-auto max-w-3xl rounded-[1.75rem] border border-red-200 bg-red-50 p-10 text-center dark:border-red-950 dark:bg-red-950/20">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-red-100 text-red-600 dark:bg-red-950/50">
          <FileText className="size-5" />
        </span>
        <h1 className="mt-4 text-xl font-semibold">Task not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This task may have been removed or is temporarily unavailable.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
          <Link
            href="/tasks"
            className="inline-flex h-8 items-center rounded-lg bg-blue-600 px-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Back to tasks
          </Link>
        </div>
      </section>
    )
  }

  const status = statusDetails[task.status]
  const StatusIcon = status.icon
  const dueDate = formatDate(`${task.dueDate}T00:00:00Z`, "long")
  const createdDate = formatDate(task.createdAt)
  const updatedDate = formatDate(task.updatedAt)

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <Link
        href="/tasks"
        className="group inline-flex items-center gap-2 rounded-full px-1 text-sm font-medium text-muted-foreground transition-colors hover:text-blue-600"
      >
        <span className="grid size-8 place-items-center rounded-full border bg-background transition-colors group-hover:border-blue-200 group-hover:bg-blue-50 dark:group-hover:border-blue-900 dark:group-hover:bg-blue-950/40">
          <ArrowLeft className="size-4" />
        </span>
        Back to tasks
      </Link>

      <motion.article
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[1.75rem] border border-blue-100 bg-card p-6 text-foreground shadow-sm sm:p-8 dark:border-border"
      >
        <span
          aria-hidden="true"
          className="absolute -right-16 -top-20 size-64 rounded-full bg-blue-100/50 blur-3xl dark:bg-blue-950/20"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-28 left-1/3 size-64 rounded-full bg-indigo-100/40 blur-3xl dark:bg-indigo-950/20"
        />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
              <StatusIcon className="size-3.5" />
              {status.label}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground dark:border-border">
              <Flag className="size-3.5" />
              {task.priority} priority
            </span>
          </div>

          <div className="mt-8 max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-300">
              <Sparkles className="size-4" />
              Task overview
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{task.title}</h1>
          </div>

          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-950 dark:bg-blue-950/20">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
                <CalendarDays className="size-4" />
                Due date
              </dt>
              <dd className="mt-2 text-sm font-semibold">{dueDate}</dd>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-950 dark:bg-blue-950/20">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
                <Clock3 className="size-4" />
                Updated
              </dt>
              <dd className="mt-2 text-sm font-semibold">{updatedDate}</dd>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-4 dark:border-blue-950 dark:bg-blue-950/20">
              <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-blue-600 dark:text-blue-300">
                <Hash className="size-4" />
                Task ID
              </dt>
              <dd className="mt-2 truncate text-sm font-semibold">{task.id}</dd>
            </div>
          </dl>
        </div>
      </motion.article>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-2xl border border-blue-100 bg-card p-6 shadow-sm dark:border-border sm:p-7">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">
              <FileText className="size-5" />
            </span>
            <div>
              <h2 className="font-semibold">Description</h2>
              <p className="text-xs text-muted-foreground">Details and context for this task</p>
            </div>
          </div>

          <p className="mt-6 min-h-28 whitespace-pre-wrap text-sm leading-7 text-muted-foreground sm:text-base">
            {task.description || "No description has been added to this task yet."}
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 dark:border-blue-950 dark:bg-blue-950/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-blue-950 dark:text-blue-100">
                  Task progress
                </p>
                <p className="mt-1 text-xs text-blue-700/70 dark:text-blue-300/70">
                  Based on the current status
                </p>
              </div>
              <span className="text-xl font-bold text-blue-600 dark:text-blue-300">
                {status.progress}%
              </span>
            </div>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-blue-100 dark:bg-blue-950">
              <motion.div
                initial={reduceMotion ? false : { width: 0 }}
                animate={{ width: `${status.progress}%` }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
              />
            </div>
          </div>
        </article>

        <aside className="rounded-2xl border border-blue-100 bg-card p-6 shadow-sm dark:border-border">
          <h2 className="font-semibold">Task information</h2>
          <dl className="mt-5 divide-y">
            <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <StatusIcon className="size-4 text-blue-500" />
                Status
              </dt>
              <dd className="text-sm font-semibold">{status.label}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Flag className="size-4 text-blue-500" />
                Priority
              </dt>
              <dd className="text-sm font-semibold capitalize">{task.priority}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="size-4 text-blue-500" />
                Created
              </dt>
              <dd className="text-right text-sm font-semibold">{createdDate}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
              <dt className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock3 className="size-4 text-blue-500" />
                Updated
              </dt>
              <dd className="text-right text-sm font-semibold">{updatedDate}</dd>
            </div>
          </dl>

          <Link
            href="/tasks"
            className="mt-6 flex h-10 items-center justify-center rounded-xl border border-blue-200 bg-transparent px-4 text-sm font-semibold text-blue-600 transition-colors hover:border-blue-300 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-300 dark:hover:bg-blue-950/30"
          >
            View all tasks
          </Link>
        </aside>
      </div>
    </section>
  )
}
