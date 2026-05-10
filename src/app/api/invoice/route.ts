import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

const getStripe = () => new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_placeholder', { apiVersion: '2024-04-10' })

export async function POST(req: NextRequest) {
  try {
    const { clientEmail, clientName, description, amount, notes } = await req.json()

    if (!clientEmail || !amount || !description) {
      return NextResponse.json({ error: 'Email, amount, and description are required.' }, { status: 400 })
    }

    const amountCents = Math.round(parseFloat(amount) * 100)
    if (amountCents < 50) {
      return NextResponse.json({ error: 'Minimum amount is $0.50.' }, { status: 400 })
    }

    const stripe = getStripe()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.wastedape.org'

    // Find or create customer
    let customer: Stripe.Customer
    const existing = await stripe.customers.list({ email: clientEmail, limit: 1 })
    if (existing.data.length > 0) {
      customer = existing.data[0]
    } else {
      customer = await stripe.customers.create({
        email: clientEmail,
        name: clientName || clientEmail,
      })
    }

    // Create invoice item
    await stripe.invoiceItems.create({
      customer: customer.id,
      amount: amountCents,
      currency: 'usd',
      description: description,
    })

    // Create invoice
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: 7,
      description: notes || '',
      footer: 'Thank you for choosing WastedApe Tech Solutions.',
      metadata: { service: description, technician: 'Dan Bloom' },
    })

    // Finalize and send
    const finalized = await stripe.invoices.finalizeInvoice(invoice.id)
    await stripe.invoices.sendInvoice(finalized.id)

    return NextResponse.json({
      success: true,
      invoiceId: finalized.id,
      invoiceUrl: finalized.hosted_invoice_url,
      amount: (amountCents / 100).toFixed(2),
      clientEmail,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
