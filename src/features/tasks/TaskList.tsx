"use client"

import { AnimatePresence } from "framer-motion"
import { AlertCircle, Plus } from "lucide-react"
import { useMemo, useState } from "react"

import { ConfirmDialog } from "@/components/common/ConfirmDialog"
import { EmptyState } from "@/components/common/EmptyState"
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton"
import { Button } from "@/components/ui/button"
import { TaskCard } from "@/features/tasks/TaskCard"
import { TaskFilters } from "@/features/tasks/TaskFilters"
import { TaskForm } from "@/features/tasks/TaskForm"
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/features/tasks/tasksApi"
import { resetTaskFilters } from "@/features/tasks/tasksSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import type { Task, TaskInput } from "@/types/task"

export function TaskList() {
  const dispatch = useAppDispatch()
  const filters = useAppSelector((state) => state.tasks)
  const { data: tasks = [], isLoading, isFetching, isError, refetch } = useGetTasksQuery()
  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation()
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation()
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null)
  const [operationError, setOperationError] = useState<string | null>(null)

  const visibleTasks = useMemo(() => {
    const query = filters.search.trim().toLowerCase()

    return tasks
      .filter((task) => !query || task.title.toLowerCase().includes(query))
      .filter((task) => filters.status === "all" || task.status === filters.status)
      .filter((task) => filters.priority === "all" || task.priority === filters.priority)
      .toSorted((first, second) => {
        const difference = Date.parse(first.dueDate) - Date.parse(second.dueDate)
        return filters.sort === "due-asc" ? difference : -difference
      })
  }, [filters.priority, filters.search, filters.sort, filters.status, tasks])

  function openCreateForm() {
    setEditingTask(null)
    setOperationError(null)
    setIsFormOpen(true)
  }

  function openEditForm(task: Task) {
    setEditingTask(task)
    setOperationError(null)
    setIsFormOpen(true)
  }

  async function saveTask(values: TaskInput) {
    setOperationError(null)

    try {
      if (editingTask) {
        await updateTask({ id: editingTask.id, changes: values }).unwrap()
      } else {
        await createTask(values).unwrap()
      }

      setIsFormOpen(false)
      setEditingTask(null)
    } catch {
      setOperationError("The task could not be saved. Please try again.")
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return

    setOperationError(null)

    try {
      await deleteTask(deleteTarget.id).unwrap()
      setDeleteTarget(null)
    } catch {
      setDeleteTarget(null)
      setOperationError("The task could not be deleted. Please try again.")
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <LoadingSkeleton />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <LoadingSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-950 dark:bg-red-950/20">
        <AlertCircle className="mx-auto size-8 text-red-600" />
        <h2 className="mt-3 font-semibold">Unable to load tasks</h2>
        <p className="mt-1 text-sm text-muted-foreground">Check your connection and try again.</p>
        <Button className="mt-4" variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {visibleTasks.length} of {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
          {isFetching ? " · Updating…" : ""}
        </p>
        <Button
          onClick={openCreateForm}
          className="h-10 rounded-xl bg-blue-600 px-4 hover:bg-blue-700"
        >
          <Plus className="size-4" />
          New task
        </Button>
      </div>

      <TaskFilters />

      {operationError ? (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/30 dark:text-red-300"
        >
          {operationError}
        </p>
      ) : null}

      {visibleTasks.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false} mode="popLayout">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={openEditForm}
                onDelete={setDeleteTarget}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="space-y-3">
          <EmptyState
            title={tasks.length ? "No matching tasks" : "No tasks yet"}
            description={
              tasks.length
                ? "Try changing or clearing your filters."
                : "Create your first task to get started."
            }
          />
          {tasks.length ? (
            <Button
              variant="ghost"
              className="mx-auto flex"
              onClick={() => dispatch(resetTaskFilters())}
            >
              Clear filters
            </Button>
          ) : null}
        </div>
      )}

      <AnimatePresence>
        {isFormOpen ? (
          <TaskForm
            key={editingTask?.id ?? "new-task"}
            task={editingTask}
            isSubmitting={isCreating || isUpdating}
            apiError={operationError}
            onSubmit={saveTask}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete this task?"
        description={
          deleteTarget
            ? `“${deleteTarget.title}” will be permanently removed. This action cannot be undone.`
            : undefined
        }
        confirmLabel="Delete task"
        isConfirming={isDeleting}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
