"use client"

import { Button } from "@/components/ui/button"

type ConfirmDialogProps = {
  open?: boolean
  title: string
  description?: string
  onConfirm?: () => void
  onCancel?: () => void
}

export function ConfirmDialog({
  open = false,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <div role="alertdialog" aria-modal="true" className="rounded-lg border bg-card p-4">
      <h2 className="font-semibold">{title}</h2>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      <div className="mt-4 flex gap-2">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={onConfirm}>Confirm</Button>
      </div>
    </div>
  )
}
