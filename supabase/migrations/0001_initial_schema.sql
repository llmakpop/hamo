-- HAMO initial schema

create table profiles (
  id                  uuid primary key references auth.users(id) on delete cascade,
  user_type           text not null check (user_type in ('influencer', 'marketer')),
  full_name           text not null,
  email               text not null,
  bio                 text,
  region              text,
  website_url         text,
  avatar_url          text,

  -- Influencer-only
  platforms           text[],
  niches              text[],
  following_size      text check (following_size in ('nano', 'micro', 'mid', 'macro', 'mega')),
  following_count     integer,
  audience_industries text[],

  -- Marketer-only
  company_name        text,
  industry            text,
  funding_stage       text check (funding_stage in (
    'bootstrapped', 'pre-seed', 'seed', 'series-a', 'series-b', 'series-c+', 'public'
  )),
  looking_for         text,

  -- Meta
  is_published        boolean default false,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

-- Full-text search vector (bio + name + company + looking_for)
alter table profiles
  add column search_vector tsvector
  generated always as (
    to_tsvector('english',
      coalesce(full_name, '') || ' ' ||
      coalesce(bio, '') || ' ' ||
      coalesce(company_name, '') || ' ' ||
      coalesce(looking_for, '')
    )
  ) stored;

create index profiles_search_idx on profiles using gin(search_vector);
create index profiles_user_type_idx on profiles(user_type);
create index profiles_region_idx on profiles(region);
create index profiles_following_size_idx on profiles(following_size);
create index profiles_funding_stage_idx on profiles(funding_stage);

-- RLS
alter table profiles enable row level security;

create policy "Published profiles are readable by authenticated users"
  on profiles for select
  to authenticated
  using (is_published = true);

create policy "Users can read their own profile"
  on profiles for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  to authenticated
  using (auth.uid() = id);

-- updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();
