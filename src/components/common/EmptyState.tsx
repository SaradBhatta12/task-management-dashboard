type EmptyStateProps = {
  title?: string
  description?: string
}

export function EmptyState({
  title = "Nothing here yet",
  description = "Create your first item to get started.",
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed p-10 text-center">
      <h2 className="font-medium">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
