'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [showReset, setShowReset] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback`,
    })

    setLoading(false)
    if (error) { setError(error.message); return }
    setResetSent(true)
  }

  if (showReset) {
    return (
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Reset your password</h1>
        <p className="text-slate-500 text-sm mb-6">We'll email you a link to set a new password.</p>
        {resetSent ? (
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3">
            Check your inbox — a reset link is on its way.
          </p>
        ) : (
          <form onSubmit={handleReset} className="flex flex-col gap-4">
            <Input label="Email" id="reset-email" type="email" value={email}
              onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoFocus />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" loading={loading}>Send reset link</Button>
          </form>
        )}
        <button onClick={() => setShowReset(false)} className="mt-4 text-sm text-slate-500 hover:underline">
          Back to sign in
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
      <p className="text-slate-500 text-sm mb-6">Sign in to your HAMO account.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input label="Email" id="email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" autoFocus />
        <div className="flex flex-col gap-1">
          <Input label="Password" id="password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
          <button type="button" onClick={() => setShowReset(true)}
            className="self-end text-xs text-violet-600 hover:underline">
            Forgot password?
          </button>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" loading={loading} className="mt-1">Sign in</Button>
      </form>

      <p className="mt-4 text-sm text-slate-500 text-center">
        Don't have an account?{' '}
        <Link href="/join" className="text-violet-600 hover:underline">Join free</Link>
      </p>
    </div>
  )
}
