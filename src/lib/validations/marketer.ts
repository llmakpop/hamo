import { z } from 'zod'

export const marketerSchema = z.object({
  user_type: z.literal('marketer'),
  full_name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  company_name: z.string().min(1, 'Company name is required'),
  industry: z.string().min(1, 'Industry is required'),
  region: z.string().min(1, 'Region is required'),
  funding_stage: z.enum([
    'bootstrapped', 'pre-seed', 'seed', 'series-a', 'series-b', 'series-c+', 'public'
  ]),
  looking_for: z.string().min(20, 'Please describe what you\'re looking for (at least 20 characters)'),
  website_url: z.string().url('Enter a valid URL').optional().or(z.literal('')),
})

export type MarketerFormData = z.infer<typeof marketerSchema>
