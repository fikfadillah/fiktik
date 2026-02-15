import type { APIRoute } from "astro";

/**
 * Video Proxy - Streaming Strategy
 * 
 * Fetches video from TikWM CDN and streams it to the client.
 * Sets Content-Disposition: attachment to force download.
 * Most TikTok videos are < 20MB (short-form content) so within Netlify limits.
 */
export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
        return new Response("Video URL parameter is required", { status: 400 });
    }

    try {
        // Validate URL for security
        const parsedUrl = new URL(targetUrl);
        const isAllowed = parsedUrl.hostname.includes("tikwm") ||
            parsedUrl.hostname.includes("tiktok") ||
            parsedUrl.hostname.includes("akamaized");

        if (!isAllowed) {
            return new Response("Invalid video URL", { status: 403 });
        }

        const headers: HeadersInit = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Referer": "https://www.tikwm.com/"
        };

        const response = await fetch(targetUrl, { headers });

        if (!response.ok) {
            return new Response(`Failed to fetch video: ${response.statusText}`, {
                status: response.status
            });
        }

        const responseHeaders = new Headers();
        responseHeaders.set("Content-Type", "video/mp4");
        responseHeaders.set("Access-Control-Allow-Origin", "*");

        // Force browser to download instead of playing
        const filename = url.searchParams.get("filename") || "tiktok_video.mp4";
        responseHeaders.set("Content-Disposition", `attachment; filename="${filename}"`);

        // Forward content length if available
        const contentLength = response.headers.get("Content-Length");
        if (contentLength) {
            responseHeaders.set("Content-Length", contentLength);
        }

        return new Response(response.body, {
            status: 200,
            headers: responseHeaders
        });

    } catch (error) {
        console.error("Video Proxy Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
