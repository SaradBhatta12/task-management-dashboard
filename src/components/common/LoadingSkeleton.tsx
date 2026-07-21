import { cn } from "@/utils"

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div aria-label="Loading" className={cn("h-24 animate-pulse rounded-xl bg-muted", className)} />
  )
}
