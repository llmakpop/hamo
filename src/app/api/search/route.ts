import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { parseNLQuery } from '@/lib/claude/search'
import { SearchFilters } from '@/lib/types'

export async function POST(request: NextRequest) {
  const { query, filters: explicitFilters } = await request.json()

  // Parse NL query with Claude (skip if only explicit filters provided)
  let filters: SearchFilters = explicitFilters ?? {}
  if (query) {
    filters = await parseNLQuery(query)
  }

  const supabase = await createClient()

  let dbQuery = supabase
    .from('profiles')
    .select('id, user_type, full_name, bio, region, avatar_url, platforms, niches, following_size, following_count, audience_industries, company_name, industry, funding_stage, looking_for')
    .eq('is_published', true)

  if (filters.user_type) dbQuery = dbQuery.eq('user_type', filters.user_type)
  if (filters.regions?.length) dbQuery = dbQuery.in('region', filters.regions)
  if (filters.platforms?.length) dbQuery = dbQuery.overlaps('platforms', filters.platforms)
  if (filters.niches?.length) dbQuery = dbQuery.overlaps('niches', filters.niches)
  if (filters.following_size?.length) dbQuery = dbQuery.in('following_size', filters.following_size)
  if (filters.industries?.length) dbQuery = dbQuery.in('industry', filters.industries)
  if (filters.audience_industries?.length) dbQuery = dbQuery.overlaps('audience_industries', filters.audience_industries)
  if (filters.funding_stages?.length) dbQuery = dbQuery.in('funding_stage', filters.funding_stages)

  if (filters.keywords) {
    dbQuery = dbQuery.textSearch('search_vector', filters.keywords, { type: 'websearch' })
  }

  const { data, error } = await dbQuery
    .order('following_count', { ascending: false, nullsFirst: false })
    .limit(40)

  if (error) {
    console.error('Search error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ profiles: data, filters })
}
