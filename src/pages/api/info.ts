
import type { APIRoute, APIContext } from 'astro';
import { getTikTokVideo } from '../../utils/tiktok';

export const runtime = 'edge';

export const GET: APIRoute = async ({ request }: APIContext) => {
    const url = new URL(request.url);
    const tiktokUrl = url.searchParams.get('url');

    if (!tiktokUrl) {
        return new Response(JSON.stringify({ error: 'URL is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const video = await getTikTokVideo(tiktokUrl);

        if (!video) {
            return new Response(JSON.stringify({ error: 'Video not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(video), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('API Info Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
