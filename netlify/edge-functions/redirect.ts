import { Context } from '@netlify/edge-functions';

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const pdf = url.searchParams.get('pdf');
  const thumb = url.searchParams.get('thumb');

  const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="utf-8">
    <title>Rich Recipe</title>
    <meta property="og:title" content="Rich Products Recipe" />
    <meta property="og:description" content="Rich Products Recipe Document" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${thumb ? decodeURIComponent(thumb) : ''}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="${thumb ? decodeURIComponent(thumb) : ''}" />
    <script>
      window.location.href = "${pdf ? decodeURIComponent(pdf) : ''}";
    </script>
  </head>
  <body>
    Redirecting to document...
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
      'cache-control': 'no-cache',
      'x-robots-tag': 'noindex'
    },
  });
}
