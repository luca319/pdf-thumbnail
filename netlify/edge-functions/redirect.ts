import { Context } from '@netlify/edge-functions';

export default async function handler(request: Request, context: Context) {
  const url = new URL(request.url);
  const pdf = url.searchParams.get('pdf');
  const thumb = url.searchParams.get('thumb');

  const html = `<!DOCTYPE html>
<html prefix="og: https://ogp.me/ns#">
  <head>
    <meta charset="utf-8" />
    <title>Rich Recipe</title>
    <meta property="og:title" content="Rich Recipe" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="${decodeURIComponent(thumb || '')}" />
    <meta http-equiv="refresh" content="0;url=${decodeURIComponent(pdf || '')}" />
  </head>
  <body>
    Redirecting...
  </body>
</html>`;

  return new Response(html, {
    headers: {
      'content-type': 'text/html',
    },
  });
}
