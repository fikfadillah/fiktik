
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
        return new Response("Video URL parameter is required", { status: 400 });
    }

    try {
        // Fetch the video stream from TikTok/TikWM
        const response = await fetch(targetUrl, {
            headers: {
                // Mimic a real browser to avoid simplistic blocking
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
                "Referer": "https://www.tiktok.com/"
            }
        });

        if (!response.ok) {
            console.error(`Failed to fetch video: ${response.status} ${response.statusText}`);
            return new Response(`Failed to fetch video: ${response.statusText}`, { status: response.status });
        }

        // Create a new response with the video stream
        // We forward the content-type and content-length if available
        const headers = new Headers();
        headers.set("Content-Type", response.headers.get("Content-Type") || "video/mp4");

        // Important: Set Content-Disposition to inline for playback, or attachment for download if requested
        // For <video> src, we want inline.
        headers.set("Content-Disposition", "inline");
        headers.set("Cache-Control", "public, max-age=3600"); // Cache for an hour?

        // Stream the body directly
        return new Response(response.body, {
            status: 200,
            headers: headers
        });

    } catch (error) {
        console.error("Video Proxy Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
