import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Badge } from '@/components/ui/Badge'
import { Profile } from '@/lib/types'

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn', youtube: 'YouTube', 'twitter-x': 'X',
  newsletter: 'Newsletter', podcast: 'Podcast', tiktok: 'TikTok',
  instagram: 'Instagram', substack: 'Substack',
}

const FOLLOWING_SIZE_LABELS: Record<string, string> = {
  nano: '< 1K', micro: '1K–10K', mid: '10K–100K', macro: '100K–500K', mega: '500K+',
}

interface ProfilePageProps {
  params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .eq('is_published', true)
    .single()

  if (!profile) notFound()

  const p = profile as Profile

  return (
    <div className="max-w-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">{p.full_name}</h1>
            <Badge variant={p.user_type === 'influencer' ? 'violet' : 'blue'}>
              {p.user_type === 'influencer' ? 'Influencer' : 'Marketer'}
            </Badge>
          </div>
          {p.user_type === 'marketer' && p.company_name && (
            <p className="text-slate-600">{p.company_name} · {p.industry}</p>
          )}
          {p.region && <p className="text-sm text-slate-500 mt-0.5">{p.region}</p>}
        </div>
      </div>

      {p.bio && (
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Bio</h2>
          <p className="text-slate-700 leading-relaxed">{p.bio}</p>
        </div>
      )}

      {p.user_type === 'influencer' && (
        <>
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Platforms</h2>
            <div className="flex flex-wrap gap-2">
              {p.platforms?.map((platform) => (
                <Badge key={platform} variant="green">{PLATFORM_LABELS[platform] ?? platform}</Badge>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Niches</h2>
            <div className="flex flex-wrap gap-2">
              {p.niches?.map((n) => <Badge key={n}>{n}</Badge>)}
            </div>
          </div>
          {p.following_size && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Audience Size</h2>
              <p className="text-slate-700">
                {FOLLOWING_SIZE_LABELS[p.following_size]}
                {p.following_count && ` (approx. ${p.following_count.toLocaleString()})`}
              </p>
            </div>
          )}
          {p.audience_industries && p.audience_industries.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Audience Industries</h2>
              <div className="flex flex-wrap gap-2">
                {p.audience_industries.map((i) => <Badge key={i} variant="amber">{i}</Badge>)}
              </div>
            </div>
          )}
        </>
      )}

      {p.user_type === 'marketer' && (
        <>
          {p.funding_stage && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Funding Stage</h2>
              <p className="text-slate-700">{p.funding_stage}</p>
            </div>
          )}
          {p.looking_for && (
            <div className="mb-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">Looking For</h2>
              <p className="text-slate-700 leading-relaxed">{p.looking_for}</p>
            </div>
          )}
        </>
      )}

      {p.website_url && (
        <a
          href={p.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-violet-600 hover:underline text-sm"
        >
          {p.website_url} ↗
        </a>
      )}
    </div>
  )
}
