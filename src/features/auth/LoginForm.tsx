"use client"

import { Button } from "@/components/ui/button"

export function LoginForm() {
  return (
    <form className="w-full max-w-sm space-y-4 rounded-xl border bg-card p-6">
      <div>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">Dummy authentication form.</p>
      </div>
      <input className="w-full rounded-md border bg-background px-3 py-2" type="email" placeholder="Email" />
      <input className="w-full rounded-md border bg-background px-3 py-2" type="password" placeholder="Password" />
      <Button className="w-full" type="submit">Sign in</Button>
    </form>
  )
}
