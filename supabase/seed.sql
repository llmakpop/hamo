-- Sample profiles for development (bypasses auth.users FK for local testing)
-- In production, profiles are created via /api/profiles with service role after invite

-- These UUIDs are fake and only work if you disable the FK or use Supabase's
-- local dev environment with seeded auth.users rows.

-- To use: run this after disabling the FK constraint in local dev, or adapt for
-- your local Supabase instance's auth.users table.

insert into profiles (id, user_type, full_name, email, bio, region, platforms, niches, following_size, following_count, audience_industries, is_published) values
  ('00000000-0000-0000-0000-000000000001', 'influencer', 'Alex Chen', 'alex@example.com',
   'DevTools enthusiast and open-source advocate. Writing about developer productivity and tooling on LinkedIn and my newsletter.',
   'North America', ARRAY['linkedin', 'newsletter'], ARRAY['devtools', 'ai-ml'], 'mid', 45000, ARRAY['devtools', 'cloud-infra'], true),

  ('00000000-0000-0000-0000-000000000002', 'influencer', 'Sarah Kim', 'sarah@example.com',
   'B2B SaaS advisor and fintech thought leader. Former VP Sales at two unicorns.',
   'Europe', ARRAY['linkedin', 'podcast'], ARRAY['fintech', 'salestech'], 'macro', 120000, ARRAY['fintech', 'salestech'], true),

  ('00000000-0000-0000-0000-000000000003', 'influencer', 'Marcus Johnson', 'marcus@example.com',
   'Cybersecurity practitioner turned content creator. Breaking down zero-trust and cloud security for practitioners.',
   'North America', ARRAY['youtube', 'linkedin'], ARRAY['cybersecurity', 'cloud-infra'], 'mid', 32000, ARRAY['cybersecurity', 'cloud-infra'], true),

  ('00000000-0000-0000-0000-000000000004', 'influencer', 'Priya Patel', 'priya@example.com',
   'HR tech and future of work advocate. Podcast host with a loyal community of HR leaders and People ops professionals.',
   'APAC', ARRAY['podcast', 'linkedin', 'newsletter'], ARRAY['hrtech'], 'micro', 8500, ARRAY['hrtech'], true),

  ('00000000-0000-0000-0000-000000000005', 'marketer', 'Jordan Rivera', 'jordan@example.com',
   NULL, 'North America', NULL, NULL, NULL, NULL, NULL, true);

update profiles set
  company_name = 'Sprout Analytics',
  industry = 'data-analytics',
  funding_stage = 'series-a',
  looking_for = 'Data and analytics influencers with audiences of data engineers and analytics leaders. Mid-tier LinkedIn presence preferred.'
where id = '00000000-0000-0000-0000-000000000005';
