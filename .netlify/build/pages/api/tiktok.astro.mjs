export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: "URL parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const fetchWithUA = async (ua) => {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(targetUrl)}&count=12&cursor=0&web=1&hd=1`;
    const res = await fetch(apiUrl, {
      headers: {
        "User-Agent": ua
      }
    });
    return res;
  };
  try {
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1",
      "Mozilla/5.0 (Linux; Android 10; SM-G981B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.162 Mobile Safari/537.36"
    ];
    let response;
    let data;
    for (const ua of userAgents) {
      try {
        response = await fetchWithUA(ua);
        if (response.ok) {
          data = await response.json();
          if (data && data.code === 0) {
            break;
          }
        }
      } catch (e) {
        console.warn(`Attempt failed with UA: ${ua}`, e);
      }
    }
    if (!data || data.code !== 0) {
      return new Response(JSON.stringify({ error: "Failed to fetch data from upstream" }), {
        status: 502,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30"
      }
    });
  } catch (error) {
    console.error("API Proxy Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
