'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function SetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)

  // Exchange code for session if arriving via email link
  useEffect(() => {
    const code = searchParams.get('code')
    if (!code) { setReady(true); return }
    const supabase = createClient()
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) setError('Invalid or expired link. Please request a new one.')
      setReady(true)
    })
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error: updateError } = await supabase.auth.updateUser({ password })

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await supabase.from('profiles').update({ is_published: true }).eq('id', user.id)
    }

    router.push('/dashboard')
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Set your password</h1>
      <p className="text-slate-500 text-sm mb-6">Choose a password to secure your account.</p>
      {!ready ? (
        <p className="text-sm text-slate-500">Verifying link...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Password" id="password" type="password" value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" autoFocus />
          <Input label="Confirm password" id="confirm" type="password" value={confirm}
            onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter your password" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" loading={loading} className="mt-2">
            {error ? 'Go to login' : 'Activate my account'}
          </Button>
        </form>
      )}
      {error && (
        <button onClick={() => router.push('/login')} className="mt-3 text-sm text-violet-600 hover:underline">
          Back to login
        </button>
      )}
    </div>
  )
}
