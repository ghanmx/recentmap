const express = require('express')
const Stripe = require('stripe')

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
})

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
        // Manejar payment_intent.succeeded
        console.log('Payment Intent Succeeded:', event.data.object)
        break
      case 'payment_method.attached':
        // Manejar payment_method.attached
        console.log('Payment Method Attached:', event.data.object)
        break
      // Agregar otros tipos de eventos según sea necesario
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
  } catch (err) {
    console.error('Webhook handler failed.', err)
  }

  res.sendStatus(200)
})

module.exports = router
