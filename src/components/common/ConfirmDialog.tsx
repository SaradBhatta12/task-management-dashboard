"use client"

import { TriangleAlert } from "lucide-react"
import { useId } from "react"

import { Button } from "@/components/ui/button"

type ConfirmDialogProps = {
  open?: boolean
  title: string
  description?: string
  confirmLabel?: string
  isConfirming?: boolean
  onConfirm?: () => void
  onCancel?: () => void
}

export function ConfirmDialog({
  open = false,
  title,
  description,
  confirmLabel = "Confirm",
  isConfirming = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const titleId = useId()
  const descriptionId = useId()

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-2xl"
      >
        <span className="mb-4 grid size-11 place-items-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40">
          <TriangleAlert className="size-5" />
        </span>
        <h2 id={titleId} className="text-lg font-semibold">{title}</h2>
        {description ? (
          <p id={descriptionId} className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isConfirming}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isConfirming}>
            {isConfirming ? "Deleting…" : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  )
}
