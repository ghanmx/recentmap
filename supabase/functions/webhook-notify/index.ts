import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { requestId } = await req.json()

    // Fetch request details
    const { data: request, error: requestError } = await supabase
      .from('vehicle_requests')
      .select(
        `
        *,
        profiles:profiles(username, full_name, phone_number)
      `,
      )
      .eq('id', requestId)
      .single()

    if (requestError)
      throw new Error(`Failed to fetch request: ${requestError.message}`)

    // Fetch active webhooks
    const { data: webhooks, error: webhooksError } = await supabase
      .from('webhooks')
      .select('*')
      .eq('is_active', true)

    if (webhooksError)
      throw new Error(`Failed to fetch webhooks: ${webhooksError.message}`)

    // Send webhook notifications
    const notifications = webhooks.map(async (webhook) => {
      const payload = {
        event: 'vehicle_request.created',
        request: {
          id: request.id,
          created_at: request.created_at,
          vehicle_make: request.vehicle_make,
          vehicle_model: request.vehicle_model,
          status: request.status,
          customer: {
            name: request.profiles.full_name,
            phone: request.profiles.phone_number,
          },
          locations: {
            pickup: request.pickup_location,
            dropoff: request.dropoff_location,
          },
        },
      }

      const signature = await createSignature(
        JSON.stringify(payload),
        webhook.secret_key,
      )

      return fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signature,
        },
        body: JSON.stringify(payload),
      })
    })

    await Promise.all(notifications)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})

async function createSignature(
  payload: string,
  secret: string,
): Promise<string> {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload),
  )
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
