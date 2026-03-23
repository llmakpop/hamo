import { Suspense } from 'react'
import { SearchBar } from '@/components/search/SearchBar'
import { ResultGrid } from '@/components/search/ResultGrid'
import { FilterSidebar } from '@/components/search/FilterSidebar'
import { SearchFilters } from '@/lib/types'

interface SearchPageProps {
  searchParams: Promise<Record<string, string | string[]>>
}

async function fetchResults(q: string, params: Record<string, string | string[]>) {
  const filters: SearchFilters = {
    user_type: (params.type as 'influencer' | 'marketer') || undefined,
    regions: params.region ? (Array.isArray(params.region) ? params.region : [params.region]) : undefined,
    platforms: params.platform ? (Array.isArray(params.platform) ? params.platform : [params.platform]) : undefined,
    niches: params.niche ? (Array.isArray(params.niche) ? params.niche : [params.niche]) : undefined,
    following_size: params.following ? (Array.isArray(params.following) ? params.following as any : [params.following as any]) : undefined,
    funding_stages: params.stage ? (Array.isArray(params.stage) ? params.stage as any : [params.stage as any]) : undefined,
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: q || undefined, filters }),
    cache: 'no-store',
  })

  if (!res.ok) return []
  const data = await res.json()
  return data.profiles ?? []
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q : ''
  const profiles = await fetchResults(q, params)

  return (
    <div>
      <div className="mb-6">
        <SearchBar defaultValue={q} />
      </div>

      {q && (
        <p className="text-sm text-slate-500 mb-5">
          Results for <span className="font-medium text-slate-700">"{q}"</span> — {profiles.length} found
        </p>
      )}

      <div className="flex gap-8">
        <Suspense>
          <FilterSidebar />
        </Suspense>
        <div className="flex-1 min-w-0">
          <ResultGrid profiles={profiles} />
        </div>
      </div>
    </div>
  )
}
