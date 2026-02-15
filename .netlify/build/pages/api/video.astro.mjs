export { renderers } from '../../renderers.mjs';

const runtime = "edge";
const GET = async ({ request }) => {
  const url = new URL(request.url);
  const targetUrl = url.searchParams.get("url");
  if (!targetUrl) {
    return new Response("Video URL parameter is required", { status: 400 });
  }
  try {
    const headers = {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "Referer": "https://www.tikwm.com/"
    };
    const range = request.headers.get("Range");
    if (range) {
      headers["Range"] = range;
    }
    const response = await fetch(targetUrl, {
      headers
    });
    if (!response.ok && response.status !== 206) {
      console.error(`Failed to fetch video: ${response.status} ${response.statusText}`);
      return new Response(`Failed to fetch video: ${response.statusText}`, { status: response.status });
    }
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");
    responseHeaders.set("Content-Disposition", 'attachment; filename="tiktok_video.mp4"');
    return new Response(response.body, {
      status: response.status,
      headers: responseHeaders
    });
  } catch (error) {
    console.error("Video Proxy Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    runtime
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
