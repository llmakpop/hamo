import { SearchBar } from '@/components/search/SearchBar'
import { ResultGrid } from '@/components/search/ResultGrid'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Load recent profiles for default state
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, user_type, full_name, bio, region, avatar_url, platforms, niches, following_size, following_count, company_name, industry, funding_stage, looking_for')
    .eq('is_published', true)
    .neq('id', user?.id ?? '')
    .order('created_at', { ascending: false })
    .limit(12)

  return (
    <div>
      {/* Search hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Find your match</h1>
        <p className="text-slate-500 mb-5">
          Describe what you're looking for in plain English — or browse below.
        </p>
        <SearchBar size="hero" />
        <p className="text-xs text-slate-400 mt-2">
          Try: "fintech influencers on LinkedIn in Europe" · "Series A devtools companies" · "podcast hosts focused on HR tech"
        </p>
      </div>

      {/* Default profiles */}
      <div>
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
          Recently joined
        </h2>
        <ResultGrid profiles={profiles ?? []} />
      </div>
    </div>
  )
}
