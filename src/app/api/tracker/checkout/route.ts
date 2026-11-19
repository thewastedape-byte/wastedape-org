import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY || process.env.STRIPE_LIVE_KEY || ''

const PRICES = {
  starter: 'price_1UdcDDHfCuVeN1Irh9ujMagr',
  pro:     'price_1UdcDEHfCuVeN1Irf06mDhrb',
  agency:  'price_1UdcDEHfCuVeN1IrStB2nhhO',
}

export async function POST(req: NextRequest) {
  try {
    const { plan, email, name } = await req.json()
    const priceId = PRICES[plan as keyof typeof PRICES]
    if (!priceId) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })

    const params = new URLSearchParams({
      'mode': 'subscription',
      'payment_method_types[]': 'card',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'customer_email': email || '',
      'success_url': `https://wastedape.org/tracker/signup?plan=${plan}&session_id={CHECKOUT_SESSION_ID}`,
      'cancel_url': `https://wastedape.org/tracker`,
      'metadata[plan]': plan,
      'metadata[name]': name || '',
    })

    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    })

    const session = await r.json()
    if (!r.ok) return NextResponse.json({ error: session.error?.message }, { status: 400 })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
