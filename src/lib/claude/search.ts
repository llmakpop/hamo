import Anthropic from '@anthropic-ai/sdk'
import { SearchFilters, REGIONS, PLATFORMS, NICHES, FOLLOWING_SIZES, FUNDING_STAGES } from '@/lib/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are a search query parser for HAMO, a B2B SaaS influencer marketplace.

Given a plain English search query, extract structured filter parameters as JSON.
Only include keys that are clearly indicated by the query. Do not guess or infer beyond what was said.

Known values for each field:
- user_type: "influencer" or "marketer"
- regions: ${JSON.stringify(REGIONS)}
- platforms: ${JSON.stringify(PLATFORMS)}
- niches: ${JSON.stringify(NICHES)}
- following_size: ${JSON.stringify(FOLLOWING_SIZES.map(f => f.value))}
- industries: same list as niches — the user's or company's industry
- audience_industries: same list as niches — the industry of an influencer's audience
- funding_stages: ${JSON.stringify(FUNDING_STAGES.map(f => f.value))}
- keywords: any remaining free-text terms that don't fit the above filters

Output ONLY valid JSON matching this schema (no markdown, no explanation):
{
  "user_type": "influencer" | "marketer" | null,
  "regions": string[],
  "platforms": string[],
  "niches": string[],
  "following_size": string[],
  "industries": string[],
  "audience_industries": string[],
  "funding_stages": string[],
  "keywords": string
}

Examples:
Query: "find fintech influencers in europe with linkedin presence"
Output: {"user_type":"influencer","regions":["Europe"],"platforms":["linkedin"],"niches":["fintech"],"following_size":[],"industries":[],"audience_industries":[],"funding_stages":[],"keywords":""}

Query: "series b saas companies looking for devtools content creators"
Output: {"user_type":"marketer","regions":[],"platforms":[],"niches":["devtools"],"following_size":[],"industries":[],"audience_industries":[],"funding_stages":["series-b"],"keywords":""}

Query: "micro influencers in cybersecurity or cloud infrastructure"
Output: {"user_type":"influencer","regions":[],"platforms":[],"niches":["cybersecurity","cloud-infra"],"following_size":["micro"],"industries":[],"audience_industries":[],"funding_stages":[],"keywords":""}`

export async function parseNLQuery(query: string): Promise<SearchFilters> {
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 512,
    temperature: 0,
    system: SYSTEM_PROMPT,
    messages: [{ role: 'user', content: query }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : '{}'

  try {
    return JSON.parse(text) as SearchFilters
  } catch {
    // If Claude returns malformed JSON, fall back to keyword-only search
    return { keywords: query }
  }
}
