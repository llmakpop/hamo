import { SearchBar } from '@/components/search/SearchBar'
import { MemberCarousel } from '@/components/search/MemberCarousel'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const SUGGESTED = [
  'Fintech influencers on LinkedIn',
  'DevTools content creators in North America',
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
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">

      {/* Search hero — fills top ~40% of viewport */}
      <div className="flex flex-col justify-end pb-8 pt-16 flex-[0_0_40vh]">
        <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase mb-4">
          Help A Marketer Out
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 mb-6">
          Who are you looking for?
        </h1>
        <SearchBar size="hero" />

        {/* Suggested searches */}
        <div className="flex flex-wrap gap-2 mt-4">
          {SUGGESTED.map((s) => (
            <Link
              key={s}
              href={`/search?q=${encodeURIComponent(s)}`}
              className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-500 hover:border-neutral-400 hover:text-neutral-800 transition-colors bg-white"
            >
              {s}
            </Link>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-100 mb-8" />

      {/* New members carousel */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-medium tracking-widest text-neutral-400 uppercase">
            Recently joined
          </p>
          <Link href="/search" className="text-xs text-neutral-400 hover:text-neutral-700 transition-colors">
            Browse all →
          </Link>
        </div>
        <MemberCarousel profiles={profiles ?? []} />
      </div>

    </div>
  )
}
