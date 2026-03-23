'use client'

import { FormState } from './OnboardingShell'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { MultiSelect } from '@/components/ui/MultiSelect'
import { REGIONS, PLATFORMS, NICHES, FOLLOWING_SIZES } from '@/lib/types'

interface StepInfluencerProps {
  step: 1 | 2
  form: FormState
  update: (fields: Partial<FormState>) => void
  onBack: () => void
  onNext: () => void
}

const regionOptions = REGIONS.map((r) => ({ value: r, label: r }))
const followingSizeOptions = FOLLOWING_SIZES.map((f) => ({ value: f.value, label: f.label }))

export function StepInfluencer({ step, form, update, onBack, onNext }: StepInfluencerProps) {
  if (step === 1) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Your Influencer Profile</h2>
        <p className="text-slate-500 mb-6 text-sm">Tell us about yourself and where you create.</p>
        <div className="flex flex-col gap-4">
          <Input
            label="Full name"
            id="full_name"
            value={form.full_name}
            onChange={(e) => update({ full_name: e.target.value })}
            placeholder="Jane Smith"
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">Bio</label>
            <textarea
              value={form.bio}
              onChange={(e) => update({ bio: e.target.value })}
              rows={3}
              placeholder="I create content about B2B SaaS for a technical audience..."
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none"
            />
          </div>
          <Select
            label="Region"
            id="region"
            value={form.region}
            onChange={(e) => update({ region: e.target.value })}
            options={regionOptions}
            placeholder="Select your region"
          />
          <MultiSelect
            label="Platforms"
            options={PLATFORMS}
            value={form.platforms}
            onChange={(val) => update({ platforms: val })}
          />
        </div>
        <div className="flex justify-between mt-8">
          <Button variant="ghost" onClick={onBack}>Back</Button>
          <Button
            onClick={onNext}
            disabled={!form.full_name || !form.bio || !form.region || form.platforms.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Audience & Reach</h2>
      <p className="text-slate-500 mb-6 text-sm">Help marketers understand your niche and audience.</p>
      <div className="flex flex-col gap-4">
        <MultiSelect
          label="Niches / Expertise"
          options={NICHES}
          value={form.niches}
          onChange={(val) => update({ niches: val })}
        />
        <Select
          label="Following size"
          id="following_size"
          value={form.following_size}
          onChange={(e) => update({ following_size: e.target.value })}
          options={followingSizeOptions}
          placeholder="Select range"
        />
        <Input
          label="Approximate follower count (optional)"
          id="following_count"
          type="number"
          value={form.following_count}
          onChange={(e) => update({ following_count: e.target.value })}
          placeholder="e.g. 25000"
        />
        <MultiSelect
          label="Your audience's industries"
          options={NICHES}
          value={form.audience_industries}
          onChange={(val) => update({ audience_industries: val })}
        />
        <Input
          label="Website or portfolio URL (optional)"
          id="website_url"
          type="url"
          value={form.website_url}
          onChange={(e) => update({ website_url: e.target.value })}
          placeholder="https://yoursite.com"
        />
      </div>
      <div className="flex justify-between mt-8">
        <Button variant="ghost" onClick={onBack}>Back</Button>
        <Button
          onClick={onNext}
          disabled={form.niches.length === 0 || !form.following_size}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
