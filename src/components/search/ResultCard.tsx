import Link from 'next/link'
import { Profile } from '@/lib/types'
import { Badge } from '@/components/ui/Badge'

interface ResultCardProps {
  profile: Partial<Profile> & { id: string; user_type: 'influencer' | 'marketer'; full_name: string }
}

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  'twitter-x': 'X',
  newsletter: 'Newsletter',
  podcast: 'Podcast',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  substack: 'Substack',
}

const FOLLOWING_SIZE_LABELS: Record<string, string> = {
  nano: '< 1K',
  micro: '1K–10K',
  mid: '10K–100K',
  macro: '100K–500K',
  mega: '500K+',
}

export function ResultCard({ profile }: ResultCardProps) {
  const isInfluencer = profile.user_type === 'influencer'

  return (
    <Link href={`/profile/${profile.id}`} className="group block">
      <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-violet-300 hover:shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
              {profile.full_name}
            </h3>
            {isInfluencer ? (
              <p className="text-xs text-slate-500 mt-0.5">
                {profile.region}
                {profile.following_size && ` · ${FOLLOWING_SIZE_LABELS[profile.following_size]} followers`}
              </p>
            ) : (
              <p className="text-xs text-slate-500 mt-0.5">
                {profile.company_name}
                {profile.funding_stage && ` · ${profile.funding_stage}`}
              </p>
            )}
          </div>
          <Badge variant={isInfluencer ? 'violet' : 'blue'}>
            {isInfluencer ? 'Influencer' : 'Marketer'}
          </Badge>
        </div>

        {profile.bio && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">{profile.bio}</p>
        )}

        {!isInfluencer && profile.looking_for && (
          <p className="text-sm text-slate-600 line-clamp-2 mb-3">{profile.looking_for}</p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {isInfluencer
            ? profile.niches?.slice(0, 4).map((n) => (
                <Badge key={n}>{n}</Badge>
              ))
            : profile.industry && <Badge>{profile.industry}</Badge>}
          {isInfluencer &&
            profile.platforms?.slice(0, 3).map((p) => (
              <Badge key={p} variant="green">{PLATFORM_LABELS[p] ?? p}</Badge>
            ))}
        </div>
      </div>
    </Link>
  )
}
