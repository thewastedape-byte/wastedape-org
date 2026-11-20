import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const auth = req.nextUrl.searchParams.get('key')
  if (auth !== '***') return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
  const SUPABASE_KEY = '***'

  // Use Supabase REST API to check if table exists first
  const check = await fetch(`${SUPABASE_URL}/rest/v1/invoices?limit=1`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
  })

  if (check.ok) return NextResponse.json({ status: 'table already exists' })

  // Table doesnt exist - try creating via pg direct connection
  try {
    const pg = await import('pg')
    const Client = pg.default.Client
    
    const regions = ['us-east-1', 'us-west-1', 'eu-central-1', 'ap-southeast-1', 'ap-northeast-1']
    let connected = false
    
    for (const region of regions) {
      try {
        const client = new Client({
          host: `aws-0-${region}.pooler.supabase.com`,
          port: 6543,
          database: 'postgres',
          user: 'postgres.yruuzkxpnbgruwuivchy',
          password: SUPABASE_KEY,
          ssl: { rejectUnauthorized: false },
          connectionTimeoutMillis: 5000
        })
        await client.connect()
        await client.query(`
          CREATE TABLE IF NOT EXISTS invoices (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            invoice_number TEXT NOT NULL,
            client_name TEXT NOT NULL,
            client_email TEXT NOT NULL,
            description TEXT,
            line_items JSONB,
            amount DECIMAL(10,2) NOT NULL,
            status TEXT DEFAULT 'paid',
            stripe_payment_id TEXT,
            paid_at TIMESTAMPTZ,
            created_at TIMESTAMPTZ DEFAULT NOW()
          );
          CREATE INDEX IF NOT EXISTS invoices_created_at_idx ON invoices(created_at DESC);
          CREATE INDEX IF NOT EXISTS invoices_client_email_idx ON invoices(client_email);
        `)
        await client.end()
        connected = true
        return NextResponse.json({ status: 'success', region })
      } catch (e: any) {
        continue
      }
    }
    return NextResponse.json({ status: 'failed', error: 'could not connect to any region' }, { status: 500 })
  } catch (err: any) {
    return NextResponse.json({ status: 'error', error: err.message }, { status: 500 })
  }
}
