
import { Downloader } from '@tobyg74/tiktok-api-dl';

/**
 * TikTok Downloader Utility
 * Extracts direct video URL without watermark
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
        // Ensure we keep the full path but remove query params if they look like tracking
        // But some APIs need the full URL. Let's just keep it clean.
        url = u.href;
    } catch (e) { /* ignore */ }

    // Strategy 1: @tobyg74/tiktok-api-dl (Wrapper)
    try {
        console.log(`[TikTok] Strategy 1 (Library v1) fetching: ${url}`);
        const result = await Downloader(url, { version: "v1" });
        if (result.status === "success" && result.result) {
            const v = result.result;
            return {
                id: v.id || v.video?.id || 'unknown',
                title: v.description || v.title || 'No Title',
                author: {
                    username: v.author?.username || v.author?.unique_id || 'unknown',
                    nickname: v.author?.nickname || 'unknown',
                    avatar: v.author?.avatar || v.author?.avatarThumb || '',
                },
                playUrl: v.video?.nowm || v.video?.playAddr || v.video?.[0] || '',
                cover: v.cover?.[0] || v.cover || '',
                music: {
                    title: v.music?.title || 'Original Sound',
                    author: v.music?.author || 'Unknown',
                    playUrl: v.music?.playUrl || '',
                },
                stats: {
                    plays: v.stats?.playCount || 0,
                    likes: v.stats?.diggCount || 0,
                    comments: v.stats?.commentCount || 0,
                    shares: v.stats?.shareCount || 0,
                },
            };
        } else {
            console.warn(`[TikTok] Strategy 1 (v1) failed:`, result);

            // Retry v2
            console.log(`[TikTok] Strategy 1 (Library v2) fetching...`);
            const res2 = await Downloader(url, { version: "v2" });
            if (res2.status === "success" && res2.result) {
                const v = res2.result;
                return {
                    id: 'unknown', // v2 might allow scraping
                    title: v.title || 'No Title',
                    author: { username: 'unknown', nickname: 'unknown', avatar: '' },
                    playUrl: v.video || v.nowm || '',
                    cover: v.cover || '',
                    music: { title: 'Unknown', author: 'Unknown', playUrl: '' },
                    stats: { plays: 0, likes: 0, comments: 0, shares: 0 }
                };
            }
        }
    } catch (error) {
        console.error('[TikTok] Strategy 1 Error:', error);
    }

    // Strategy 2: TikWM (Direct API)
    try {
        console.log(`[TikTok] Strategy 2 (TikWM) fetching...`);
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&count=12&cursor=0&web=1&hd=1`;
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': userAgent,
                'Referer': 'https://www.tikwm.com/'
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
    } catch (e) { console.error('[TikTok] Strategy 2 Error:', e); }

    console.error('[TikTok] All strategies failed.');
    return null;
}
