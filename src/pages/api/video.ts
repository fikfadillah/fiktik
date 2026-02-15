import type { APIRoute } from "astro";

/**
 * Video Proxy - Redirect Strategy
 * 
 * Instead of streaming the entire video through Netlify Functions
 * (which has a 20MB response limit and 10s timeout), we redirect
 * the client directly to the TikWM CDN URL.
 * 
 * This is much more efficient and avoids all Netlify limits.
 */
export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
        return new Response("Video URL parameter is required", { status: 400 });
    }

    try {
        // Validate that it's a tikwm URL for security
        const parsedUrl = new URL(targetUrl);
        const allowedHosts = ["www.tikwm.com", "tikwm.com", "v16-webapp-prime.tiktok.com", "v19-webapp-prime.tiktok.com"];

        const isAllowed = allowedHosts.some(host => parsedUrl.hostname.endsWith(host)) ||
            parsedUrl.hostname.includes("tiktok") ||
            parsedUrl.hostname.includes("tikwm") ||
            parsedUrl.hostname.includes("akamaized");

        if (!isAllowed) {
            return new Response("Invalid video URL", { status: 403 });
        }

        // 302 Redirect - client downloads directly from CDN
        // This completely bypasses Netlify's 20MB response limit and 10s timeout
        return new Response(null, {
            status: 302,
            headers: {
                "Location": targetUrl,
                "Cache-Control": "public, max-age=300",
            },
        });
    } catch (error) {
        console.error("Video Redirect Error:", error);
        return new Response("Invalid URL provided", { status: 400 });
    }
};
