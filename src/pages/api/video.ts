
import type { APIRoute } from "astro";

export const runtime = "edge";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
        return new Response("Video URL parameter is required", { status: 400 });
    }

    try {
        const headers: HeadersInit = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Referer": "https://www.tikwm.com/"
        };

        // Forward Range header if present
        const range = request.headers.get("Range");
        if (range) {
            headers["Range"] = range;
        }

        const response = await fetch(targetUrl, {
            headers: headers
        });

        if (!response.ok && response.status !== 206) {
            console.error(`Failed to fetch video: ${response.status} ${response.statusText}`);
            return new Response(`Failed to fetch video: ${response.statusText}`, { status: response.status });
        }

        const responseHeaders = new Headers(response.headers);

        // Ensure proper CORS and Content-Disposition
        responseHeaders.set("Access-Control-Allow-Origin", "*");
        responseHeaders.set("Content-Disposition", "attachment; filename=\"tiktok_video.mp4\"");

        // If upstream returns 206, we must forward 206
        return new Response(response.body, {
            status: response.status,
            headers: responseHeaders
        });

    } catch (error) {
        console.error("Video Proxy Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
