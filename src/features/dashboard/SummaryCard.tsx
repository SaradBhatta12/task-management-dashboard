type SummaryCardProps = {
  label: string
  value: number
}

export function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <article className="rounded-xl border bg-card p-5">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </article>
  )
}
