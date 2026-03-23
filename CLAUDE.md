@AGENTS.md

# HAMO — Claude Code Context

## Project

**Help A Marketer Out (HAMO)** — a lightweight two-sided marketplace connecting B2B SaaS marketers with influencer opportunities.

## Stack

- **Next.js 14+** (App Router, TypeScript, Tailwind CSS, `src/` dir)
- **Supabase** — Postgres database, Auth (invite flow), Row Level Security
- **Claude API** (`@anthropic-ai/sdk`) — NL search query parsing
- **Zod** — form and API validation

## Next.js 16 Notes

- Route protection file is `src/proxy.ts` (not `middleware.ts` — renamed in Next.js 16), export function as `proxy`

## User Types

- **Marketer** — posts opportunities, searches/browses influencer profiles
- **Influencer** — builds a profile, browses/applies to opportunities

## Key Domain Terms

- **Opportunity** — a campaign or collaboration a marketer wants to run
- **Profile** — a user's public page (niche, platforms, audience for influencers; company, industry for marketers)
- **Match / Application** — an influencer expressing interest in an opportunity

## App Structure

```
src/app/
  (marketing)/   # Public landing page — no auth required
  (auth)/        # /join onboarding form, /set-password
  (app)/         # Authenticated interior — dashboard, search, profiles
  api/           # Route handlers: /api/search, /api/profiles, /api/auth/callback
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only — never expose to client)
- `ANTHROPIC_API_KEY` (server-only)
- `NEXT_PUBLIC_SITE_URL`

## Auth Flow

1. User fills `/join` form → POST to `/api/profiles` (service role inserts profile, triggers Supabase invite email)
2. User clicks invite link → `/api/auth/callback` exchanges code → redirects to `/set-password`
3. User sets password → profile marked `is_published: true` → redirected to `/dashboard`

## NL Search

Claude acts as a query parser only — takes plain English, returns structured JSON filters.
Supabase runs the actual database query. No generative responses in search.

## Repo

GitHub: https://github.com/llmakpop/hamo

## Docs

- [Architecture](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
