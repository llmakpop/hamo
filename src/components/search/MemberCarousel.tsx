'use client'

import Link from 'next/link'
import { Profile } from '@/lib/types'

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: 'LinkedIn', youtube: 'YouTube', 'twitter-x': 'X',
  newsletter: 'Newsletter', podcast: 'Podcast', tiktok: 'TikTok',
  instagram: 'Instagram', substack: 'Substack',
}

const FOLLOWING_SIZE_LABELS: Record<string, string> = {
  nano: '< 1K', micro: '1K–10K', mid: '10K–100K', macro: '100K–500K', mega: '500K+',
}

interface MemberCarouselProps {
  profiles: Partial<Profile>[]
}

export function MemberCarousel({ profiles }: MemberCarouselProps) {
  if (!profiles.length) return null

  return (
    <div className="relative">
      <div
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {profiles.map((profile) => (
          <Link
            key={profile.id}
            href={`/profile/${profile.id}`}
            className="group flex-shrink-0 w-64"
          >
            <div className="rounded-xl border border-neutral-200 bg-white p-5 h-full transition-all duration-200 hover:border-neutral-400 hover:shadow-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-semibold text-neutral-600 flex-shrink-0">
                  {profile.full_name?.[0]?.toUpperCase()}
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                  profile.user_type === 'influencer'
                    ? 'bg-violet-50 text-violet-600'
                    : 'bg-sky-50 text-sky-600'
                }`}>
                  {profile.user_type}
                </span>
              </div>

              {/* Name + meta */}
              <p className="font-semibold text-neutral-900 text-sm leading-tight group-hover:text-violet-700 transition-colors">
                {profile.full_name}
              </p>
              <p className="text-xs text-neutral-400 mt-0.5 mb-3">
                {profile.user_type === 'influencer'
                  ? [profile.region, profile.following_size ? FOLLOWING_SIZE_LABELS[profile.following_size] : null].filter(Boolean).join(' · ')
                  : [profile.company_name, profile.funding_stage].filter(Boolean).join(' · ')
                }
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {profile.user_type === 'influencer'
                  ? profile.niches?.slice(0, 2).map((n) => (
                      <span key={n} className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">{n}</span>
                    ))
                  : profile.industry && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600">{profile.industry}</span>
                    )
                }
                {profile.user_type === 'influencer' && profile.platforms?.slice(0, 1).map((p) => (
                  <span key={p} className="text-[10px] px-2 py-0.5 rounded-full bg-violet-50 text-violet-600">{PLATFORM_LABELS[p] ?? p}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Fade edges */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
