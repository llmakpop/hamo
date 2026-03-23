'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'

export default function SettingsPage() {
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  const handleSignOut = async () => {
    setSigningOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Settings</h1>

      <div className="rounded-xl border border-slate-200 bg-white divide-y divide-slate-200">
        <div className="p-5">
          <h2 className="font-semibold text-slate-900 mb-1">Account</h2>
          <p className="text-sm text-slate-500 mb-4">Manage your account settings.</p>
          <Button variant="outline" size="sm" loading={signingOut} onClick={handleSignOut}>
            Sign out
          </Button>
        </div>

        <div className="p-5">
          <h2 className="font-semibold text-slate-900 mb-1">Profile visibility</h2>
          <p className="text-sm text-slate-500">
            Your profile is visible to all HAMO members. To hide it, contact hello@hamo.app.
          </p>
        </div>
      </div>
    </div>
  )
}
