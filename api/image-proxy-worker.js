/**
 * Cloudflare Worker: Wavespeed Image Proxy
 * 
 * Deploy to Cloudflare Workers, then update comic.html to use this endpoint.
 * 
 * Setup:
 * 1. Go to https://dash.cloudflare.com → Workers & Pages → Create
 * 2. Name it "image-proxy" or similar
 * 3. Paste this code
 * 4. Add environment variable: WAVESPEED_API_KEY = your key
 * 5. Deploy
 * 6. Your endpoint will be: https://image-proxy.<your-subdomain>.workers.dev
 */

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      });
    }

    if (request.method !== 'POST') {
      return new Response('POST required', { status: 405 });
    }

    try {
      const { prompt } = await request.json();
      
      if (!prompt) {
        return new Response(JSON.stringify({ error: 'prompt required' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      // Call Wavespeed API
      const response = await fetch('https://api.wavespeed.ai/v1/images/generate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.WAVESPEED_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'recraft-ai/recraft-v4-pro/text-to-image',
          prompt: prompt,
          width: 800,
          height: 500,
          num_images: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return new Response(JSON.stringify({ error: data.error || 'Generation failed' }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      // Wavespeed returns images array with URLs
      const imageUrl = data.images?.[0]?.url || data.output?.[0];

      return new Response(JSON.stringify({ url: imageUrl }), {
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }
  },
};
