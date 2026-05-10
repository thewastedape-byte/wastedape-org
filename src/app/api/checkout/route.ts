import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const PRICE_IDS: Record<string, string> = {
  basic:   'price_1TUnQTHfCuVeN1IriDWY13yV',
  pro:     'price_1TUnQUHfCuVeN1Ir1OtyiZdS',
  starter: 'price_1TUnQGHfCuVeN1Irky6RaQyM',
  growth:  'price_1TUnQHHfCuVeN1IryrB4eiZu',
}

const MODES: Record<string, 'payment' | 'subscription'> = {
  basic: 'payment',
  pro: 'payment',
  starter: 'subscription',
  growth: 'subscription',
}

export async function POST(req: NextRequest) {
  try {
    const { service, name, email, business, notes } = await req.json()
    const priceId = PRICE_IDS[service]
    if (!priceId) return NextResponse.json({ error: 'Invalid service' }, { status: 400 })

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_placeholder', { apiVersion: '2024-04-10' })
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://wastedape.org'
    const mode = MODES[service] || 'payment'

    const session = await stripe.checkout.sessions.create({
      mode,
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: email || undefined,
      metadata: { name: name || '', business: business || '', notes: notes || '', service },
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/book?service=${service}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
