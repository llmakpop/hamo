'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { MultiSelect } from '@/components/ui/MultiSelect'
import { Badge } from '@/components/ui/Badge'
import { REGIONS, PLATFORMS, NICHES, FOLLOWING_SIZES, FUNDING_STAGES, Profile } from '@/lib/types'

const regionOptions = REGIONS.map((r) => ({ value: r, label: r }))
const followingOptions = FOLLOWING_SIZES.map((f) => ({ value: f.value, label: f.label }))
const fundingOptions = FUNDING_STAGES.map((f) => ({ value: f.value, label: f.label }))
const nicheOptions = NICHES.map((n) => ({ value: n, label: n }))

export default function EditProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Partial<Profile> | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/join'); return }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setLoading(false)
    }
    load()
  }, [router])

  const update = (fields: Partial<Profile>) => setProfile((p) => ({ ...p, ...fields }))

  const handleSave = async () => {
    if (!profile) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('profiles')
      .update({ ...profile })
      .eq('id', profile.id!)
    setSaving(false)
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
  }

  if (loading) return <div className="text-slate-500 text-sm">Loading...</div>
  if (!profile) return null

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Edit Profile</h1>
        <Badge variant={profile.user_type === 'influencer' ? 'violet' : 'blue'}>
          {profile.user_type}
        </Badge>
      </div>

      <div className="flex flex-col gap-4">
        <Input label="Full name" value={profile.full_name ?? ''} onChange={(e) => update({ full_name: e.target.value })} />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-700">Bio</label>
          <textarea
            value={profile.bio ?? ''}
            onChange={(e) => update({ bio: e.target.value })}
            rows={3}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none"
          />
        </div>

        <Select
          label="Region"
          value={profile.region ?? ''}
          onChange={(e) => update({ region: e.target.value })}
          options={regionOptions}
          placeholder="Select region"
        />

        <Input
          label="Website URL"
          type="url"
          value={profile.website_url ?? ''}
          onChange={(e) => update({ website_url: e.target.value })}
        />

        {profile.user_type === 'influencer' && (
          <>
            <MultiSelect
              label="Platforms"
              options={PLATFORMS}
              value={profile.platforms ?? []}
              onChange={(v) => update({ platforms: v })}
            />
            <MultiSelect
              label="Niches"
              options={NICHES}
              value={profile.niches ?? []}
              onChange={(v) => update({ niches: v })}
            />
            <Select
              label="Following size"
              value={profile.following_size ?? ''}
              onChange={(e) => update({ following_size: e.target.value as any })}
              options={followingOptions}
              placeholder="Select size"
            />
            <MultiSelect
              label="Audience industries"
              options={NICHES}
              value={profile.audience_industries ?? []}
              onChange={(v) => update({ audience_industries: v })}
            />
          </>
        )}

        {profile.user_type === 'marketer' && (
          <>
            <Input label="Company name" value={profile.company_name ?? ''} onChange={(e) => update({ company_name: e.target.value })} />
            <Select
              label="Industry"
              value={profile.industry ?? ''}
              onChange={(e) => update({ industry: e.target.value })}
              options={nicheOptions}
              placeholder="Select industry"
            />
            <Select
              label="Funding stage"
              value={profile.funding_stage ?? ''}
              onChange={(e) => update({ funding_stage: e.target.value as any })}
              options={fundingOptions}
              placeholder="Select stage"
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-slate-700">What are you looking for?</label>
              <textarea
                value={profile.looking_for ?? ''}
                onChange={(e) => update({ looking_for: e.target.value })}
                rows={4}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 resize-none"
              />
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 mt-8">
        <Button onClick={handleSave} loading={saving}>
          {saved ? 'Saved!' : 'Save changes'}
        </Button>
        <Button variant="ghost" onClick={() => router.push('/dashboard')}>Cancel</Button>
      </div>
    </div>
  )
}
