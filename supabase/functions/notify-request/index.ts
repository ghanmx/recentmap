import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { requestId } = await req.json();
    
    const supabase = createClient(supabaseUrl!, supabaseKey!);
    
    // Fetch request details with user profile
    const { data: request, error: requestError } = await supabase
      .from('vehicle_requests')
      .select(`
        *,
        profiles:profiles(full_name, phone_number)
      `)
      .eq('id', requestId)
      .single();

    if (requestError) throw requestError;

    // Send email notification
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
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
    });

    if (!emailResponse.ok) {
      throw new Error('Failed to send email notification');
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});