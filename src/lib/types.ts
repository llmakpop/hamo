export type UserType = 'influencer' | 'marketer'

export type FollowingSize = 'nano' | 'micro' | 'mid' | 'macro' | 'mega'

export type FundingStage =
  | 'bootstrapped'
  | 'pre-seed'
  | 'seed'
  | 'series-a'
  | 'series-b'
  | 'series-c+'
  | 'public'

export interface Profile {
  id: string
  user_type: UserType
  full_name: string
  email: string
  bio: string | null
  region: string | null
  website_url: string | null
  avatar_url: string | null

  // Influencer-only
  platforms: string[] | null
  niches: string[] | null
  following_size: FollowingSize | null
  following_count: number | null
  audience_industries: string[] | null

  // Marketer-only
  company_name: string | null
  industry: string | null
  funding_stage: FundingStage | null
  looking_for: string | null

  is_published: boolean
  created_at: string
  updated_at: string
}

export interface SearchFilters {
  user_type?: UserType | null
  regions?: string[]
  platforms?: string[]
  niches?: string[]
  following_size?: FollowingSize[]
  industries?: string[]
  audience_industries?: string[]
  funding_stages?: FundingStage[]
  keywords?: string
}

// Vocabulary constants shared across the app
export const REGIONS = [
  'North America',
  'Europe',
  'APAC',
  'LATAM',
  'Middle East & Africa',
  'Global',
] as const

export const PLATFORMS = [
  'linkedin',
  'youtube',
  'twitter-x',
  'newsletter',
  'podcast',
  'tiktok',
  'instagram',
  'substack',
] as const

export const NICHES = [
  'devtools',
  'cybersecurity',
  'fintech',
  'martech',
  'hrtech',
  'salestech',
  'data-analytics',
  'ai-ml',
  'cloud-infra',
  'healthcare-tech',
  'edtech',
  'ecommerce',
] as const

export const FOLLOWING_SIZES: { value: FollowingSize; label: string }[] = [
  { value: 'nano', label: 'Nano (< 1K)' },
  { value: 'micro', label: 'Micro (1K–10K)' },
  { value: 'mid', label: 'Mid (10K–100K)' },
  { value: 'macro', label: 'Macro (100K–500K)' },
  { value: 'mega', label: 'Mega (500K+)' },
]

export const FUNDING_STAGES: { value: FundingStage; label: string }[] = [
  { value: 'bootstrapped', label: 'Bootstrapped' },
  { value: 'pre-seed', label: 'Pre-seed' },
  { value: 'seed', label: 'Seed' },
  { value: 'series-a', label: 'Series A' },
  { value: 'series-b', label: 'Series B' },
  { value: 'series-c+', label: 'Series C+' },
  { value: 'public', label: 'Public' },
]
