
// import { Downloader } from '@tobyg74/tiktok-api-dl'; // Removed for Edge compatibility

/**
 * TikTok Downloader Utility
 * Extracts direct video URL without watermark
 * Strategy: TikWM API (Edge Compatible)
 */

export interface TikTokVideo {
    id: string;
    title: string;
    author: {
        username: string;
        nickname: string;
        avatar: string;
    };
    playUrl: string; // The direct video URL
    cover: string;
    music: {
        title: string;
        author: string;
        playUrl: string;
    };
    stats: {
        plays: number;
        likes: number;
        comments: number;
        shares: number;
    };
}

export async function getTikTokVideo(url: string): Promise<TikTokVideo | null> {
    const userAgent = 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36';

    // Clean URL
    try {
        const u = new URL(url);
        url = u.href;
    } catch (e) { /* ignore */ }

    // Strategy 1: TikWM (Direct API) - Lightweight & Edge Compatible
    try {
        // console.log(`[TikTok] Strategy 1 (TikWM) fetching...`);
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&count=12&cursor=0&web=1&hd=1`;
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': userAgent,
                // 'Referer': 'https://www.tikwm.com/'
            }
        });
        if (response.ok) {
            const data = await response.json();
            if (data.code === 0 && data.data) {
                const v = data.data;
                return {
                    id: v.id,
                    title: v.title,
                    author: { username: v.author.unique_id, nickname: v.author.nickname, avatar: v.author.avatar },
                    playUrl: v.play,
                    cover: v.cover,
                    music: { title: v.music_info.title, author: v.music_info.author, playUrl: v.music_info.play },
                    stats: { plays: v.play_count, likes: v.digg_count, comments: v.comment_count, shares: v.share_count }
                };
            }
        }
    } catch (e) { console.error('[TikTok] Strategy 1 Error:', e); }

    return null;
}
