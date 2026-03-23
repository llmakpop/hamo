import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Both invite and password recovery land on set-password
      const type = searchParams.get('type') ?? data.user?.app_metadata?.invite_type
      const next = type === 'recovery' ? '/set-password' : '/set-password'
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/join?error=auth_callback_failed`)
}
