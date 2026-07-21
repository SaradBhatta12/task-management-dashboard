"use client"

import { Button } from "@/components/ui/button"

export function TaskForm() {
  return (
    <form className="space-y-4">
      <input className="w-full rounded-md border px-3 py-2" placeholder="Task title" />
      <Button type="submit">Save task</Button>
    </form>
  )
}
