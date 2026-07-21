"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CalendarDays, ChevronRight, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { setSelectedTaskId } from "@/features/tasks/tasksSlice"
import { useAppDispatch } from "@/store/hooks"
import type { Task } from "@/types/task"
import { cn } from "@/utils"

const statusStyles = {
  todo: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  "in-progress": "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300",
  done: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
}

const priorityStyles = {
  low: "text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300",
  medium: "text-amber-700 bg-amber-50 dark:bg-amber-950/40 dark:text-amber-300",
  high: "text-red-700 bg-red-50 dark:bg-red-950/40 dark:text-red-300",
}

const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Completed",
}

type TaskCardProps = {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const dispatch = useAppDispatch()
  const reduceMotion = useReducedMotion()
  const dueDate = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${task.dueDate}T00:00:00Z`))

  return (
    <motion.article
      layout
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97 }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="group flex min-h-60 flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-blue-200 hover:shadow-lg hover:shadow-blue-950/5 dark:hover:border-blue-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              statusStyles[task.status],
            )}
          >
            {statusLabels[task.status]}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
              priorityStyles[task.priority],
            )}
          >
            {task.priority}
          </span>
        </div>

        <div className="flex opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Edit ${task.title}`}
            onClick={() => onEdit(task)}
          >
            <Pencil className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`Delete ${task.title}`}
            onClick={() => onDelete(task)}
            className="hover:text-red-600"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      </div>

      <div className="mt-5 flex-1">
        <h2 className="line-clamp-2 text-lg font-semibold tracking-tight">{task.title}</h2>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {task.description || "No description provided."}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t pt-4">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="size-4" />
          Due {dueDate}
        </span>
        <Link
          href={`/tasks/${task.id}`}
          onClick={() => dispatch(setSelectedTaskId(task.id))}
          className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Details
          <ChevronRight className="size-3.5" />
        </Link>
      </div>
    </motion.article>
  )
}
