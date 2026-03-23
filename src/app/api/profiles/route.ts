import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { influencerSchema } from '@/lib/validations/influencer'
import { marketerSchema } from '@/lib/validations/marketer'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  const body = await request.json()

  // Validate based on user_type
  let data: z.infer<typeof influencerSchema> | z.infer<typeof marketerSchema>
  if (body.user_type === 'influencer') {
    const result = influencerSchema.safeParse(body)
    if (!result.success) {
      console.error('Validation errors:', JSON.stringify(result.error.flatten(), null, 2))
      return NextResponse.json({ error: 'Invalid form data. Please check your entries.' }, { status: 400 })
    }
    data = result.data
  } else if (body.user_type === 'marketer') {
    const result = marketerSchema.safeParse(body)
    if (!result.success) {
      console.error('Validation errors:', JSON.stringify(result.error.flatten(), null, 2))
      return NextResponse.json({ error: 'Invalid form data. Please check your entries.' }, { status: 400 })
    }
    data = result.data
  } else {
    return NextResponse.json({ error: 'Invalid user_type' }, { status: 400 })
  }

  const supabase = createServiceClient()

  // Invite user via Supabase Auth — this creates auth.users row and sends email
  const { data: inviteData, error: inviteError } = await supabase.auth.admin.inviteUserByEmail(
    data.email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      data: { user_type: data.user_type },
    }
  )

  if (inviteError) {
    // User might already exist
    if (inviteError.message.includes('already')) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      )
    }
    console.error('Invite error:', inviteError)
    return NextResponse.json({ error: `Invite failed: ${inviteError.message}` }, { status: 500 })
  }

  // Insert profile using the new auth user's ID
  const { error: insertError } = await supabase.from('profiles').insert({
    id: inviteData.user.id,
    ...data,
    is_published: false,
  })

  if (insertError) {
    console.error('Profile insert error:', insertError)
    // Clean up: delete the auth user we just created
    await supabase.auth.admin.deleteUser(inviteData.user.id)
    return NextResponse.json({ error: 'Failed to create profile.' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const supabase = createServiceClient()

  let query = supabase
    .from('profiles')
    .select('id, user_type, full_name, bio, region, avatar_url, platforms, niches, following_size, following_count, company_name, industry, funding_stage')
    .eq('is_published', true)

  const userType = searchParams.get('user_type')
  if (userType) query = query.eq('user_type', userType)

  const region = searchParams.get('region')
  if (region) query = query.eq('region', region)

  const { data, error } = await query.order('created_at', { ascending: false }).limit(50)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ profiles: data })
}
