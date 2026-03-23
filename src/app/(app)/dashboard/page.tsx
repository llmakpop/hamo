import { SearchBar } from '@/components/search/SearchBar'
import { MemberCarousel } from '@/components/search/MemberCarousel'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const SUGGESTED = [
  'Fintech influencers on LinkedIn',
  'DevTools creators in North America',
  'Series A SaaS companies',
  'HR tech thought leaders with a podcast',
  'Micro influencers in cybersecurity',
  'Bootstrapped martech companies',
]

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, user_type, full_name, region, avatar_url, platforms, niches, following_size, company_name, industry, funding_stage')
    .eq('is_published', true)
    .neq('id', user?.id ?? '')
    .order('created_at', { ascending: false })
    .limit(16)

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">

      {/* Search hero — vertically centered in top ~45% of viewport */}
      <div className="flex flex-col items-center justify-center text-center flex-[0_0_42vh]">
        <p className="text-xs font-medium tracking-widest text-violet-500 uppercase mb-3">
          Help A Marketer Out
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 mb-8">
          Who are you looking for?
        </h1>
        <div className="w-full max-w-2xl">
          <SearchBar size="hero" />
        </div>
        {/* Suggested searches */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {SUGGESTED.map((s) => (
            <Link
              key={s}
              href={`/search?q=${encodeURIComponent(s)}`}
              className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-500 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-colors bg-white"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-100 mb-8" />

      {/* New members carousel */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
            Recently joined
          </p>
          <Link href="/search" className="text-xs text-neutral-400 hover:text-violet-600 transition-colors">
            Browse all →
          </Link>
        </div>
        <MemberCarousel profiles={profiles ?? []} />
      </div>

    </div>
  )
}
