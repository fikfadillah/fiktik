export { renderers } from '../../renderers.mjs';

async function getTikTokVideo(url) {
  try {
    if (!url.includes("tiktok.com")) {
      throw new Error("Invalid TikTok URL");
    }
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&count=12&cursor=0&web=1&hd=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.code === 0 && data.data) {
      const video = data.data;
      return {
        id: video.id,
        title: video.title,
        author: {
          username: video.author.unique_id,
          nickname: video.author.nickname,
          avatar: video.author.avatar
        },
        playUrl: video.play,
        // Direct URL without watermark
        cover: video.cover,
        music: {
          title: video.music_info.title,
          author: video.music_info.author,
          playUrl: video.music_info.play
        },
        stats: {
          plays: video.play_count,
          likes: video.digg_count,
          comments: video.comment_count,
          shares: video.share_count
        }
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching TikTok video:", error);
    return null;
  }
}

const GET = async ({ request }) => {
  const url = new URL(request.url);
  const tiktokUrl = url.searchParams.get("url");
  if (!tiktokUrl) {
    return new Response(JSON.stringify({ error: "URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const video = await getTikTokVideo(tiktokUrl);
    if (!video) {
      return new Response(JSON.stringify({ error: "Video not found or private" }), {
        status: 404,
        headers: { "Content-Type": "application/json" }
      });
    }
    const videoResponse = await fetch(video.playUrl);
    if (!videoResponse.ok) {
      throw new Error("Failed to fetch video content");
    }
    const filename = `tiktok_${video.author.username}_${video.id}.mp4`;
    return new Response(videoResponse.body, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${filename}"`,
        // copy relevant headers if needed, e.g. Content-Length
        "Content-Length": videoResponse.headers.get("Content-Length") || ""
      }
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
