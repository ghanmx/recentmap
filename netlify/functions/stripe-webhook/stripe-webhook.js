const express = require('express')
const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

router.post('/', async (req, res) => {
  let event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  } catch (err) {
    console.error('Webhook signature verification failed.', err)
    return res.sendStatus(400)
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        
        // Update payment status in database
        const { error: paymentError } = await supabase
          .from('payment_transactions')
          .update({ 
            status: 'completed',
            stripe_payment_intent_id: paymentIntent.id
          })
          .eq('stripe_payment_intent_id', paymentIntent.id)

        if (paymentError) {
          console.error('Error updating payment:', paymentError)
          throw paymentError
        }

        // Update vehicle request status
        const { error: requestError } = await supabase
          .from('vehicle_requests')
          .update({ 
            payment_status: 'completed',
            status: 'confirmed'
          })
          .eq('payment_intent_id', paymentIntent.id)

        if (requestError) {
          console.error('Error updating request:', requestError)
          throw requestError
        }

        // Send notification to admin
        await notifyAdmin(paymentIntent.id)
        break

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object
        
        // Update payment status
        await supabase
          .from('payment_transactions')
          .update({ 
            status: 'failed',
            stripe_payment_intent_id: failedPayment.id
          })
          .eq('stripe_payment_intent_id', failedPayment.id)

        // Update vehicle request status
        await supabase
          .from('vehicle_requests')
          .update({ 
            payment_status: 'failed'
          })
          .eq('payment_intent_id', failedPayment.id)
        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (err) {
    console.error('Webhook handler failed.', err)
    return res.sendStatus(500)
  }

  res.sendStatus(200)
})

async function notifyAdmin(paymentIntentId) {
  try {
    // Get payment and request details
    const { data: payment } = await supabase
      .from('payment_transactions')
      .select('*, vehicle_requests(*)')
      .eq('stripe_payment_intent_id', paymentIntentId)
      .single()

    if (!payment) return

    // Send email notification using Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'MRGruas <onboarding@resend.dev>',
        to: 'admin@mrgruas.com',
        subject: `Nueva Reserva Confirmada - ${payment.vehicle_requests.vehicle_make} ${payment.vehicle_requests.vehicle_model}`,
        html: `
          <h2>Nueva Reserva Confirmada</h2>
          <p><strong>ID de Reserva:</strong> ${payment.vehicle_requests.id}</p>
          <p><strong>Vehículo:</strong> ${payment.vehicle_requests.vehicle_make} ${payment.vehicle_requests.vehicle_model}</p>
          <p><strong>Monto:</strong> $${payment.amount}</p>
          <p><strong>Estado:</strong> Pago Completado</p>
        `,
      }),
    })
  } catch (error) {
    console.error('Error sending admin notification:', error)
  }
}

module.exports = router