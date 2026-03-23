'use client'

import { FormState } from './OnboardingShell'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface StepEmailProps {
  form: FormState
  update: (fields: Partial<FormState>) => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  error: string | null
}

export function StepEmail({ form, update, onBack, onSubmit, isSubmitting, error }: StepEmailProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Almost done!</h2>
      <p className="text-slate-500 mb-6 text-sm">
        We'll create your profile and email you a link to set your password.
      </p>
      <Input
        label="Work email"
        id="email"
        type="email"
        value={form.email}
        onChange={(e) => update({ email: e.target.value })}
        placeholder="you@company.com"
      />
      {error && (
        <p className="mt-3 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {error}
          {error.toLowerCase().includes('already') && (
            <> <a href="/login" className="underline font-medium">Sign in instead →</a></>
          )}
        </p>
      )}
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack} disabled={isSubmitting}>Back</Button>
        <Button
          onClick={onSubmit}
          loading={isSubmitting}
          disabled={!form.email.includes('@')}
        >
          Create my profile
        </Button>
      </div>
      <p className="mt-4 text-xs text-slate-400 text-center">
        By continuing, you agree to our terms of service and privacy policy.
      </p>
    </div>
  )
}
