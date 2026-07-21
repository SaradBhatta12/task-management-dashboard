"use client"

import { ArrowLeft, CalendarDays, Clock3, Flag } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

import { LoadingSkeleton } from "@/components/common/LoadingSkeleton"
import { Button } from "@/components/ui/button"
import { useGetTaskQuery } from "@/features/tasks/tasksApi"
import { setSelectedTaskId } from "@/features/tasks/tasksSlice"
import { useAppDispatch } from "@/store/hooks"

export function TaskDetailDrawer({ taskId }: { taskId: string }) {
  const dispatch = useAppDispatch()
  const { data: task, isLoading, isError, refetch } = useGetTaskQuery(taskId)

  useEffect(() => {
    dispatch(setSelectedTaskId(taskId))

    return () => {
      dispatch(setSelectedTaskId(null))
    }
  }, [dispatch, taskId])

  if (isLoading) {
    return <LoadingSkeleton />
  }

  if (isError || !task) {
    return (
      <section className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-950 dark:bg-red-950/20">
        <h1 className="text-xl font-semibold">Task not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This task may have been removed or is temporarily unavailable.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Button variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
          <Link
            href="/tasks"
            className="inline-flex h-8 items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
          >
            Back to tasks
          </Link>
        </div>
      </section>
    )
  }

  const dueDate = new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${task.dueDate}T00:00:00Z`))
  const updatedDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(task.updatedAt))

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/tasks"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to tasks
      </Link>

      <article className="rounded-2xl border bg-card p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            {task.status.replace("-", " ")}
          </span>
          <span className="rounded-full bg-muted px-3 py-1 capitalize text-muted-foreground">
            {task.priority} priority
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight">{task.title}</h1>
        <p className="mt-4 whitespace-pre-wrap text-base leading-7 text-muted-foreground">
          {task.description || "No description provided."}
        </p>

        <dl className="mt-8 grid gap-4 border-t pt-6 sm:grid-cols-3">
          <div className="rounded-xl bg-muted/50 p-4">
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <CalendarDays className="size-4" />
              Due date
            </dt>
            <dd className="mt-2 text-sm font-semibold">{dueDate}</dd>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Flag className="size-4" />
              Priority
            </dt>
            <dd className="mt-2 text-sm font-semibold capitalize">{task.priority}</dd>
          </div>
          <div className="rounded-xl bg-muted/50 p-4">
            <dt className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Clock3 className="size-4" />
              Last updated
            </dt>
            <dd className="mt-2 text-sm font-semibold">{updatedDate}</dd>
          </div>
        </dl>
      </article>
    </section>
  )
}
