import { Context } from '@netlify/edge-functions';

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const pdf = url.searchParams.get('pdf');
  const thumb = url.searchParams.get('thumb');

  const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="utf-8">
    <title>Rich Products Recipe</title>
    
    <!-- Standard Meta Tags -->
    <meta name="description" content="Rich Products Recipe Document" />
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="Rich Products Recipe" />
    <meta property="og:description" content="Rich Products Recipe Document" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${thumb ? decodeURIComponent(thumb) : ''}" />
    <meta property="og:image:width" content="1000" />
    <meta property="og:image:height" content="667" />
    <meta property="og:url" content="${request.url}" />
    <meta property="og:site_name" content="Rich Products" />
    
    <!-- WhatsApp Specific Meta Tags -->
    <meta property="og:image:alt" content="Rich Products Recipe Preview" />
    <meta property="og:locale" content="en_US" />
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${thumb ? decodeURIComponent(thumb) : ''}" />
    
    <script>
      // Function to redirect after a delay
      function redirectToPDF() {
        const pdf = "${pdf ? decodeURIComponent(pdf) : ''}";
        if (pdf) {
          window.location.href = pdf;
        }
      }
      
      // Add event listener for when everything is loaded
      window.addEventListener('load', function() {
        // Delay redirect to allow preview generation
        setTimeout(redirectToPDF, 1500);
      });
    </script>
  </head>
  <body style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
    <h1>Rich Products Recipe</h1>
    <p>Redirecting to document...</p>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex'
    },
  });
}
