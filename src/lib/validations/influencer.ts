import { z } from 'zod'

export const influencerSchema = z.object({
  user_type: z.literal('influencer'),
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  bio: z.string().min(20, 'Bio must be at least 20 characters'),
  region: z.string().min(1, 'Region is required'),
  platforms: z.array(z.string()).min(1, 'Select at least one platform'),
  niches: z.array(z.string()).min(1, 'Select at least one niche'),
  following_size: z.enum(['nano', 'micro', 'mid', 'macro', 'mega']),
  following_count: z.number().int().positive().optional(),
  audience_industries: z.array(z.string()).optional(),
  website_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
})

export type InfluencerFormData = z.infer<typeof influencerSchema>
