"use client"

import { X } from "lucide-react"
import { useId, useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { validateTask, type TaskErrors } from "@/lib/validations/taskSchema"
import type { Task, TaskInput, TaskPriority, TaskStatus } from "@/types/task"
import { cn } from "@/utils"

type TaskFormProps = {
  task?: Task | null
  isSubmitting?: boolean
  apiError?: string | null
  onSubmit: (values: TaskInput) => Promise<void>
  onCancel: () => void
}

function tomorrow() {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString().slice(0, 10)
}

export function TaskForm({
  task,
  isSubmitting = false,
  apiError,
  onSubmit,
  onCancel,
}: TaskFormProps) {
  const titleId = useId()
  const [values, setValues] = useState<TaskInput>({
    title: task?.title ?? "",
    description: task?.description ?? "",
    status: task?.status ?? "todo",
    priority: task?.priority ?? "medium",
    dueDate: task?.dueDate ?? tomorrow(),
  })
  const [errors, setErrors] = useState<TaskErrors>({})

  function setField<Key extends keyof TaskInput>(field: Key, value: TaskInput[Key]) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const validationErrors = validateTask(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    await onSubmit({
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
    })
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center overflow-y-auto bg-slate-950/40 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="my-auto w-full max-w-2xl rounded-[1.5rem] border bg-card p-5 shadow-2xl sm:p-6"
        aria-labelledby={titleId}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-xl font-semibold">{task ? "Edit task" : "Create a new task"}</h2>
            <p className="mt-1 text-sm text-muted-foreground">Add the details your team needs to complete this work.</p>
          </div>
          <Button type="button" variant="ghost" size="icon" aria-label="Close task form" onClick={onCancel}>
            <X className="size-4" />
          </Button>
        </div>

        <div className="space-y-5">
          <label className="block space-y-2 text-sm font-medium">
            Title
            <input
              autoFocus
              value={values.title}
              onChange={(event) => setField("title", event.target.value)}
              aria-invalid={Boolean(errors.title)}
              className={cn(
                "h-11 w-full rounded-xl border bg-background px-3 font-normal outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15",
                errors.title && "border-destructive",
              )}
              placeholder="What needs to be done?"
            />
            {errors.title ? <span className="block text-xs text-destructive">{errors.title}</span> : null}
          </label>

          <label className="block space-y-2 text-sm font-medium">
            Description
            <textarea
              value={values.description}
              onChange={(event) => setField("description", event.target.value)}
              aria-invalid={Boolean(errors.description)}
              className={cn(
                "min-h-28 w-full resize-y rounded-xl border bg-background p-3 font-normal outline-none focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15",
                errors.description && "border-destructive",
              )}
              placeholder="Add context, acceptance criteria, or useful links…"
            />
            <span className="flex justify-between text-xs text-muted-foreground">
              <span className="text-destructive">{errors.description}</span>
              <span>{values.description.length}/600</span>
            </span>
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2 text-sm font-medium">
              Status
              <select
                value={values.status}
                onChange={(event) => setField("status", event.target.value as TaskStatus)}
                className="h-11 w-full rounded-xl border bg-background px-3 font-normal outline-none focus:border-blue-500"
              >
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="done">Completed</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium">
              Priority
              <select
                value={values.priority}
                onChange={(event) => setField("priority", event.target.value as TaskPriority)}
                className="h-11 w-full rounded-xl border bg-background px-3 font-normal outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label className="space-y-2 text-sm font-medium">
              Due date
              <input
                type="date"
                value={values.dueDate}
                onChange={(event) => setField("dueDate", event.target.value)}
                aria-invalid={Boolean(errors.dueDate)}
                className={cn(
                  "h-11 w-full rounded-xl border bg-background px-3 font-normal outline-none focus:border-blue-500",
                  errors.dueDate && "border-destructive",
                )}
              />
            </label>
          </div>
        </div>

        {apiError ? <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">{apiError}</p> : null}

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : task ? "Save changes" : "Create task"}
          </Button>
        </div>
      </form>
    </div>
  )
}
