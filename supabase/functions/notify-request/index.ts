import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
}

// Fetch environment variables and handle undefined values
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

if (!RESEND_API_KEY || !supabaseUrl || !supabaseKey) {
  console.error('Missing one or more environment variables.')
  Deno.exit(1) // Exit if essential variables are missing
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { requestId } = await req.json()

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch request details and profile
    const { data: request, error: requestError } = await supabase
      .from('vehicle_requests')
      .select(`*, profiles:profiles(full_name, phone_number)`)
      .eq('id', requestId)
      .single()

    if (requestError)
      throw new Error(`Failed to fetch request: ${requestError.message}`)

    // Send email notification
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'MRGruas <onboarding@resend.dev>',
        to: ['admin@mrgruas.com'],
        subject: `New Towing Request - ${request.vehicle_make} ${request.vehicle_model}`,
        html: `
          <h2>New Towing Request</h2>
          <p><strong>Customer:</strong> ${request.profiles.full_name}</p>
          <p><strong>Phone:</strong> ${request.profiles.phone_number}</p>
          <p><strong>Vehicle:</strong> ${request.vehicle_make} ${request.vehicle_model} (${request.vehicle_year})</p>
          <p><strong>Color:</strong> ${request.vehicle_color}</p>
          <p><strong>Truck Type:</strong> ${request.truck_type}</p>
          <p><strong>Requires Maneuver:</strong> ${request.requires_maneuver ? 'Yes' : 'No'}</p>
          <h3>Locations</h3>
          <p><strong>Pickup:</strong> ${JSON.stringify(request.pickup_location)}</p>
          <p><strong>Dropoff:</strong> ${JSON.stringify(request.dropoff_location)}</p>
        `,
      }),
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      throw new Error(`Failed to send email: ${errorText}`)
    }

    return new Response(JSON.stringify({ success: true, requestId }), {
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
