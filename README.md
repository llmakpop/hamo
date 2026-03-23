# Help A Marketer Out (HAMO)

A lightweight platform connecting B2B SaaS marketers with influencer opportunities — and influencers with brands worth promoting.

## What It Does

- **Marketers** discover and connect with B2B SaaS influencers, thought leaders, and content creators
- **Influencers** find relevant brand partnership opportunities in the B2B SaaS space

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Supabase](https://supabase.com) (Postgres, Auth)
- [Tailwind CSS](https://tailwindcss.com)
- [Claude API](https://anthropic.com) (NL search)

## Getting Started

```bash
# Install dependencies
npm install

# Copy env vars and fill in your keys
cp .env.local.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── (marketing)/    # Landing page (public)
│   ├── (auth)/         # /join onboarding, /set-password
│   ├── (app)/          # Authenticated app (dashboard, search, profiles)
│   └── api/            # Route handlers
├── components/         # UI components
└── lib/                # Supabase client, Claude search logic, Zod schemas
supabase/
└── migrations/         # SQL schema migrations
```

## Docs

- [Architecture](docs/architecture.md)
- [Roadmap](docs/roadmap.md)
