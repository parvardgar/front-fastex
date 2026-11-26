
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { tokenStorage } from "@/lib/auth/token-storage"

import { login } from "../api/login"

export function LoginForm() {
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setError(null)

    const normalizedMobile = mobile.trim()

    if (!normalizedMobile) {
      setError("شماره موبایل را وارد کنید.")
      return
    }

    if (!password) {
      setError("رمز عبور را وارد کنید.")
      return
    }

    setIsLoading(true)

    try {
      const { access } = await login({
        mobile: normalizedMobile,
        password,
      })

      tokenStorage.set(access)
      window.location.href = "/profile"
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "شماره موبایل یا رمز عبور اشتباه است.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="mobile">شماره موبایل</Label>

        <Input
          id="mobile"
          name="mobile"
          type="tel"
          inputMode="tel"
          autoComplete="username"
          placeholder="شماره موبایل خود را وارد کنید"
          value={mobile}
          onChange={(event) => setMobile(event.target.value)}
          disabled={isLoading}
          autoFocus
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">رمز عبور</Label>

        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="رمز عبور خود را وارد کنید"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
            className="pe-10"
            required
          />

          <button
            type="button"
            aria-label={
              showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"
            }
            onClick={() => setShowPassword((value) => !value)}
            disabled={isLoading}
            className="absolute inset-y-0 end-0 flex items-center px-3 text-muted-foreground"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        ورود
      </Button>
    </form>
  )
}
