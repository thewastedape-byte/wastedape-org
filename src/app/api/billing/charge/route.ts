import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY || ''
const SUPABASE_URL = 'https://yruuzkxpnbgruwuivchy.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY || 'eyJhbG…_qkE'
const RESEND_KEY = process.env.RESEND_API_KEY || ''

export async function POST(req: NextRequest) {
  try {
    const { paymentMethodId, amount, clientName, clientEmail, description, lineItems, invoiceNumber } = await req.json()

    if (!paymentMethodId || !amount || !clientEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const amountCents = Math.round(parseFloat(amount) * 100)
    if (amountCents < 50) return NextResponse.json({ error: 'Minimum charge is $0.50' }, { status: 400 })

    // Create and confirm PaymentIntent via Stripe
    const params = new URLSearchParams({
      amount: amountCents.toString(),
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: 'true',
      description: description || `Invoice ${invoiceNumber} — ${clientName}`,
      'receipt_email': clientEmail,
      'metadata[client_name]': clientName,
      'metadata[invoice_number]': invoiceNumber,
    })

    const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString()
    })

    const pi = await stripeRes.json()
    if (!stripeRes.ok || pi.status !== 'succeeded') {
      return NextResponse.json({ error: pi.error?.message || `Payment failed: ${pi.status}` }, { status: 400 })
    }

    // Save invoice to Supabase
    await fetch(`${SUPABASE_URL}/rest/v1/invoices`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        invoice_number: invoiceNumber,
        client_name: clientName,
        client_email: clientEmail,
        description,
        line_items: lineItems,
        amount: parseFloat(amount),
        status: 'paid',
        stripe_payment_id: pi.id,
        paid_at: new Date().toISOString(),
      })
    }).catch(e => console.error('Supabase save error:', e))

    // Send receipt email via Resend
    const lineItemsHtml = lineItems?.map((item: any) =>
      `<tr><td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;color:#F5F0E8;font-family:Georgia,serif">${item.desc}</td><td style="padding:8px 12px;border-bottom:1px solid #2a2a2a;text-align:right;color:#C8922A;font-family:Georgia,serif;font-weight:bold">$${parseFloat(item.amount).toFixed(2)}</td></tr>`
    ).join('') || `<tr><td style="padding:8px 12px;color:#F5F0E8;font-family:Georgia,serif">${description}</td><td style="padding:8px 12px;text-align:right;color:#C8922A;font-family:Georgia,serif;font-weight:bold">$${parseFloat(amount).toFixed(2)}</td></tr>`

    const emailHtml = `
<!DOCTYPE html>
<html>
<body style="background:#060608;margin:0;padding:40px 20px;font-family:Georgia,serif">
<div style="max-width:580px;margin:0 auto">
  <div style="text-align:center;margin-bottom:32px;padding-bottom:24px;border-bottom:2px solid #C8922A">
    <img src="https://wastedape.org/logo.svg" style="width:64px;height:64px;border-radius:50%;border:2px solid #C8922A;margin-bottom:12px" />
    <div style="color:#C8922A;font-size:18px;font-weight:bold;letter-spacing:1px">THE WASTED APE</div>
    <div style="color:rgba(245,240,232,0.4);font-size:11px;letter-spacing:2px">TECH SOLUTIONS</div>
  </div>

  <div style="background:rgba(12,10,8,0.95);border:1px solid rgba(200,146,42,0.3);border-radius:16px;padding:32px;margin-bottom:20px">
    <div style="display:flex;justify-content:space-between;margin-bottom:24px">
      <div>
        <div style="color:rgba(200,146,42,0.5);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">Receipt / Invoice</div>
        <div style="color:#F5F0E8;font-size:22px;font-weight:bold">${invoiceNumber}</div>
      </div>
      <div style="text-align:right">
        <div style="color:rgba(200,146,42,0.5);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">Date</div>
        <div style="color:#F5F0E8;font-size:14px">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      </div>
    </div>

    <div style="margin-bottom:20px">
      <div style="color:rgba(200,146,42,0.5);font-size:10px;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">Billed To</div>
      <div style="color:#F5F0E8;font-size:16px;font-weight:bold">${clientName}</div>
      <div style="color:rgba(245,240,232,0.5);font-size:13px">${clientEmail}</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
      <thead>
        <tr style="border-bottom:1px solid rgba(200,146,42,0.3)">
          <th style="padding:8px 12px;text-align:left;color:rgba(200,146,42,0.6);font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:normal">Description</th>
          <th style="padding:8px 12px;text-align:right;color:rgba(200,146,42,0.6);font-size:10px;letter-spacing:2px;text-transform:uppercase;font-weight:normal">Amount</th>
        </tr>
      </thead>
      <tbody>${lineItemsHtml}</tbody>
      <tfoot>
        <tr style="border-top:2px solid #C8922A">
          <td style="padding:12px;color:#F5F0E8;font-size:16px;font-weight:bold;font-family:Georgia,serif">Total Paid</td>
          <td style="padding:12px;text-align:right;color:#C8922A;font-size:20px;font-weight:bold;font-family:Georgia,serif">$${parseFloat(amount).toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    <div style="background:rgba(76,175,80,0.1);border:1px solid rgba(76,175,80,0.3);border-radius:8px;padding:12px;text-align:center">
      <span style="color:#81C784;font-size:14px;font-family:Georgia,serif">✓ Payment Received — Thank you!</span>
    </div>
  </div>

  <div style="text-align:center;color:rgba(245,240,232,0.3);font-size:12px">
    <div>WastedApe Tech · wastedape.org</div>
    <div>(272) APE-DUDE · thewastedape@gmail.com</div>
    <div style="margin-top:8px">Veteran-Owned</div>
  </div>
</div>
</body>
</html>`

    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'WastedApe Tech <onboarding@resend.dev>',
          to: clientEmail,
          subject: `Receipt — Invoice ${invoiceNumber} — $${parseFloat(amount).toFixed(2)}`,
          html: emailHtml,
        })
      }).catch(e => console.error('Resend error:', e))
    }

    return NextResponse.json({ success: true, paymentId: pi.id, invoiceNumber })
  } catch (err) {
    console.error('Billing error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
