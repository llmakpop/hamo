'use client'

import { useState } from 'react'
import { UserType, REGIONS, PLATFORMS, NICHES, FOLLOWING_SIZES } from '@/lib/types'
import { StepUserType } from './StepUserType'
import { StepInfluencer } from './StepInfluencer'
import { StepMarketer } from './StepMarketer'
import { StepEmail } from './StepEmail'
import { StepComplete } from './StepComplete'

export interface FormState {
  user_type?: UserType
  // Shared
  full_name: string
  bio: string
  region: string
  website_url: string
  // Influencer
  platforms: string[]
  niches: string[]
  following_size: string
  following_count: string
  audience_industries: string[]
  // Marketer
  company_name: string
  industry: string
  funding_stage: string
  looking_for: string
  // Final
  email: string
}

const INITIAL_STATE: FormState = {
  full_name: '',
  bio: '',
  region: '',
  website_url: '',
  platforms: [],
  niches: [],
  following_size: '',
  following_count: '',
  audience_industries: [],
  company_name: '',
  industry: '',
  funding_stage: '',
  looking_for: '',
  email: '',
}

type Step = 'user-type' | 'details-1' | 'details-2' | 'email' | 'complete'

interface OnboardingShellProps {
  initialType?: UserType
}

export function OnboardingShell({ initialType }: OnboardingShellProps) {
  const [step, setStep] = useState<Step>(initialType ? 'details-1' : 'user-type')
  const [form, setForm] = useState<FormState>({ ...INITIAL_STATE, user_type: initialType })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const update = (fields: Partial<FormState>) => setForm((f) => ({ ...f, ...fields }))

  const stepIndex = (['user-type', 'details-1', 'details-2', 'email'] as Step[]).indexOf(step)
  const totalSteps = 4

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const payload = {
        ...form,
        following_count: form.following_count ? parseInt(form.following_count) : undefined,
        website_url: form.website_url || undefined,
      }
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        setSubmitError(typeof data.error === 'string' ? data.error : 'Something went wrong. Please try again.')
        return
      }
      setStep('complete')
    } catch {
      setSubmitError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 'complete') return <StepComplete email={form.email} />

  return (
    <div className="w-full max-w-lg">
      {/* Progress bar */}
      {step !== 'user-type' && (
        <div className="mb-8">
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Step {stepIndex} of {totalSteps - 1}</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full">
            <div
              className="h-1.5 bg-violet-600 rounded-full transition-all duration-300"
              style={{ width: `${(stepIndex / (totalSteps - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {step === 'user-type' && (
        <StepUserType
          onSelect={(type) => {
            update({ user_type: type })
            setStep('details-1')
          }}
        />
      )}

      {step === 'details-1' && form.user_type === 'influencer' && (
        <StepInfluencer
          step={1}
          form={form}
          update={update}
          onBack={() => setStep('user-type')}
          onNext={() => setStep('details-2')}
        />
      )}

      {step === 'details-2' && form.user_type === 'influencer' && (
        <StepInfluencer
          step={2}
          form={form}
          update={update}
          onBack={() => setStep('details-1')}
          onNext={() => setStep('email')}
        />
      )}

      {step === 'details-1' && form.user_type === 'marketer' && (
        <StepMarketer
          step={1}
          form={form}
          update={update}
          onBack={() => setStep('user-type')}
          onNext={() => setStep('details-2')}
        />
      )}

      {step === 'details-2' && form.user_type === 'marketer' && (
        <StepMarketer
          step={2}
          form={form}
          update={update}
          onBack={() => setStep('details-1')}
          onNext={() => setStep('email')}
        />
      )}

      {step === 'email' && (
        <StepEmail
          form={form}
          update={update}
          onBack={() => setStep('details-2')}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={submitError}
        />
      )}
    </div>
  )
}
