'use client'

import { FormState } from './OnboardingShell'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { REGIONS, NICHES, FUNDING_STAGES } from '@/lib/types'

interface StepMarketerProps {
  step: 1 | 2
  form: FormState
  update: (fields: Partial<FormState>) => void
  onBack: () => void
  onNext: () => void
}

const regionOptions = REGIONS.map((r) => ({ value: r, label: r }))
const nicheOptions = NICHES.map((n) => ({ value: n, label: n }))
const fundingOptions = FUNDING_STAGES.map((f) => ({ value: f.value, label: f.label }))

export function StepMarketer({ step, form, update, onBack, onNext }: StepMarketerProps) {
  if (step === 1) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">About Your Company</h2>
        <p className="text-slate-500 mb-6 text-sm">Tell us about your company so influencers can find you.</p>
        <div className="flex flex-col gap-4">
          <Input
            label="Your full name"
            id="full_name"
            value={form.full_name}
            onChange={(e) => update({ full_name: e.target.value })}
            placeholder="Alex Johnson"
          />
          <Input
            label="Company name"
            id="company_name"
            value={form.company_name}
            onChange={(e) => update({ company_name: e.target.value })}
            placeholder="Acme SaaS Co."
          />
          <Select
            label="Industry"
            id="industry"
            value={form.industry}
            onChange={(e) => update({ industry: e.target.value })}
            options={nicheOptions}
            placeholder="Select your industry"
          />
          <Select
            label="Region"
            id="region"
            value={form.region}
            onChange={(e) => update({ region: e.target.value })}
            options={regionOptions}
            placeholder="Select your region"
          />
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={onBack}>Back</Button>
          <Button
            onClick={onNext}
            disabled={!form.full_name || !form.company_name || !form.industry || !form.region}
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">What Are You Looking For?</h2>
      <p className="text-slate-500 mb-6 text-sm">Help influencers understand your goals and budget stage.</p>
      <div className="flex flex-col gap-4">
        <Select
          label="Funding stage"
          id="funding_stage"
          value={form.funding_stage}
          onChange={(e) => update({ funding_stage: e.target.value })}
          options={fundingOptions}
          placeholder="Select stage"
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">
            What are you looking for in an influencer partner?
          </label>
          <textarea
            value={form.looking_for}
            onChange={(e) => update({ looking_for: e.target.value })}
            rows={4}
            placeholder="We're looking for B2B fintech thought leaders with an audience of CFOs and finance leaders. Prefer LinkedIn + newsletter creators with 10K+ followers..."
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none"
          />
          <p className={`text-xs ${form.looking_for.length >= 20 ? 'text-slate-400' : 'text-amber-600'}`}>
            {form.looking_for.length}/20 characters minimum
          </p>
        </div>
        <Input
          label="Company website (optional)"
          id="website_url"
          type="url"
          value={form.website_url}
          onChange={(e) => update({ website_url: e.target.value })}
          placeholder="https://yourcompany.com"
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button
          onClick={onNext}
          disabled={!form.funding_stage || form.looking_for.length < 20}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
