import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const role = requestUrl.searchParams.get('role') || 'client'
  const origin = requestUrl.origin

  if (code) {
    const supabase = createClient()
    await supabase.auth.exchangeCodeForSession(code)
    
    if (role === 'freelancer') {
      return NextResponse.redirect(`${origin}/dashboard/freelancer`)
    } else {
      return NextResponse.redirect(`${origin}/dashboard/client`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}