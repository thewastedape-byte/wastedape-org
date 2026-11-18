import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/auth/error', request.url))
  }

  // Supabase handles the exchange automatically via the client-side hook
  // This route is just a landing page — redirect to dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url))
}
