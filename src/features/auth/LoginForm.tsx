"use client"

import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { DEMO_AUTH_TOKEN, DEMO_CREDENTIALS } from "@/constants"
import { setCredentials } from "@/features/auth/authSlice"
import { validateLogin, type LoginErrors, type LoginInput } from "@/lib/validations/loginSchema"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { cn } from "@/utils"

const initialValues: LoginInput = {
  email: "",
  password: "",
}

export function LoginForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(
    (state) =>
      state.auth.token === DEMO_AUTH_TOKEN && state.auth.user?.email === DEMO_CREDENTIALS.email,
  )
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/")
    }
  }, [isAuthenticated, router])

  function updateField(field: keyof LoginInput, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validateLogin(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)

    const displayName = values.email
      .split("@")[0]
      .split(/[._-]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")

    dispatch(
      setCredentials({
        user: {
          id: crypto.randomUUID(),
          name: displayName || "Taskflow User",
          email: values.email,
        },
        token: DEMO_AUTH_TOKEN,
      }),
    )

    router.replace("/")
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="w-full max-w-md space-y-6 rounded-[1.75rem] border border-blue-100 bg-card p-6 shadow-xl shadow-blue-950/5 sm:p-8 dark:border-border"
    >
      <div className="space-y-2 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
          <LockKeyhole className="size-5" />
        </span>
        <h1 className="text-2xl font-bold tracking-tight">Welcome to Taskflow</h1>
        <p className="text-sm text-muted-foreground">Use the demo account credentials below.</p>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 text-xs dark:border-blue-950 dark:bg-blue-950/20">
        <p className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Email</span>
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            {DEMO_CREDENTIALS.email}
          </span>
        </p>
        <p className="mt-2 flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Password</span>
          <span className="font-semibold text-blue-700 dark:text-blue-300">
            {DEMO_CREDENTIALS.password}
          </span>
        </p>
      </div>

      <div className="space-y-4">
        <label className="block space-y-2 text-sm font-medium">
          Email address
          <span className="relative block">
            <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoComplete="email"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={cn(
                "h-11 w-full rounded-xl border bg-background pl-10 pr-3 font-normal outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15",
                errors.email && "border-destructive",
              )}
              type="email"
              placeholder="alex@example.com"
            />
          </span>
          {errors.email ? (
            <span id="email-error" className="block text-xs text-destructive">
              {errors.email}
            </span>
          ) : null}
        </label>

        <label className="block space-y-2 text-sm font-medium">
          Password
          <span className="relative block">
            <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              autoComplete="current-password"
              value={values.password}
              onChange={(event) => updateField("password", event.target.value)}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={cn(
                "h-11 w-full rounded-xl border bg-background pl-10 pr-11 font-normal outline-none transition focus:border-blue-500 focus:ring-3 focus:ring-blue-500/15",
                errors.password && "border-destructive",
              )}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((visible) => !visible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </span>
          {errors.password ? (
            <span id="password-error" className="block text-xs text-destructive">
              {errors.password}
            </span>
          ) : null}
        </label>
      </div>

      <Button
        className="h-11 w-full rounded-xl bg-blue-600 hover:bg-blue-700"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  )
}
