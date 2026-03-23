'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { REGIONS, NICHES, FOLLOWING_SIZES, FUNDING_STAGES, PLATFORMS } from '@/lib/types'

export function FilterSidebar() {
  const router = useRouter()
  const params = useSearchParams()

  const setFilter = (key: string, value: string) => {
    const current = new URLSearchParams(params.toString())
    const existing = current.getAll(key)
    if (existing.includes(value)) {
      current.delete(key)
      existing.filter((v) => v !== value).forEach((v) => current.append(key, v))
    } else {
      current.append(key, value)
    }
    router.push(`/search?${current.toString()}`)
  }

  const isActive = (key: string, value: string) => params.getAll(key).includes(value)

  return (
    <aside className="w-52 flex-shrink-0">
      <FilterSection title="Type">
        {(['influencer', 'marketer'] as const).map((t) => (
          <FilterChip key={t} label={t} active={isActive('type', t)} onClick={() => setFilter('type', t)} />
        ))}
      </FilterSection>

      <FilterSection title="Region">
        {REGIONS.map((r) => (
          <FilterChip key={r} label={r} active={isActive('region', r)} onClick={() => setFilter('region', r)} />
        ))}
      </FilterSection>

      <FilterSection title="Niche / Industry">
        {NICHES.map((n) => (
          <FilterChip key={n} label={n} active={isActive('niche', n)} onClick={() => setFilter('niche', n)} />
        ))}
      </FilterSection>

      <FilterSection title="Platform">
        {PLATFORMS.map((p) => (
          <FilterChip key={p} label={p} active={isActive('platform', p)} onClick={() => setFilter('platform', p)} />
        ))}
      </FilterSection>

      <FilterSection title="Following Size">
        {FOLLOWING_SIZES.map((f) => (
          <FilterChip key={f.value} label={f.label} active={isActive('following', f.value)} onClick={() => setFilter('following', f.value)} />
        ))}
      </FilterSection>

      <FilterSection title="Funding Stage">
        {FUNDING_STAGES.map((f) => (
          <FilterChip key={f.value} label={f.label} active={isActive('stage', f.value)} onClick={() => setFilter('stage', f.value)} />
        ))}
      </FilterSection>
    </aside>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</h4>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-md px-2 py-1 text-xs transition-colors ${
        active
          ? 'bg-violet-100 text-violet-700 font-medium'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {label}
    </button>
  )
}
