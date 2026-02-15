
import type { APIRoute, APIContext } from 'astro';
import { getTikTokVideo } from '../../utils/tiktok';


export const runtime = 'edge';

export const GET: APIRoute = async ({ request }: APIContext) => {
    const url = new URL(request.url);
    const tiktokUrl = url.searchParams.get('url');
    const type = url.searchParams.get('type') || 'video'; // 'video' or 'audio'

    if (!tiktokUrl) {
        return new Response(JSON.stringify({ error: 'URL is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const video = await getTikTokVideo(tiktokUrl);

        if (!video) {
            console.error('[API] Video processing failed (all strategies returned null).');
            return new Response(JSON.stringify({ error: 'Video not found or processing failed' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Determine download URL and content type
        let downloadUrl = video.playUrl;
        let contentType = 'video/mp4';
        let filename = `tiktok_${video.author.username}_${video.id}.mp4`;

        if (type === 'audio' && video.music && video.music.playUrl) {
            downloadUrl = video.music.playUrl;
            contentType = 'audio/mpeg';
            filename = `tiktok_audio_${video.author.username}_${video.id}.mp3`;
            console.log(`[API] Stream AUDIO from: ${downloadUrl}`);
        } else {
            console.log(`[API] Stream VIDEO from: ${downloadUrl}`);
        }

        // Fetch the content
        const response = await fetch(downloadUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                // 'Referer': 'https://www.tiktok.com/' // Sometimes needed, sometimes not for music?
            }
        });

        if (!response.ok) {
            console.error(`[API] Failed to fetch content: ${response.status} ${response.statusText}`);
            throw new Error('Failed to fetch content');
        }

        console.log(`[API] Fetch successful, streaming...`);

        // Stream the content back
        return new Response(response.body, {
            status: 200,
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': response.headers.get('Content-Length') || '',
            },
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

