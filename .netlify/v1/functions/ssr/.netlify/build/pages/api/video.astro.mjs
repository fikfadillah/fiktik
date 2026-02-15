export { renderers } from '../../renderers.mjs';

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");
  if (!targetUrl) {
    return new Response("Video URL parameter is required", { status: 400 });
  }
  try {
    const parsedUrl = new URL(targetUrl);
    const allowedHosts = ["www.tikwm.com", "tikwm.com", "v16-webapp-prime.tiktok.com", "v19-webapp-prime.tiktok.com"];
    const isAllowed = allowedHosts.some((host) => parsedUrl.hostname.endsWith(host)) || parsedUrl.hostname.includes("tiktok") || parsedUrl.hostname.includes("tikwm") || parsedUrl.hostname.includes("akamaized");
    if (!isAllowed) {
      return new Response("Invalid video URL", { status: 403 });
    }
    return new Response(null, {
      status: 302,
      headers: {
        "Location": targetUrl,
        "Cache-Control": "public, max-age=300"
      }
    });
  } catch (error) {
    console.error("Video Redirect Error:", error);
    return new Response("Invalid URL provided", { status: 400 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
