
const url = 'https://www.tiktok.com/@aeningkingg/video/7605690496425037077';
const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&count=12&cursor=0&web=1&hd=1`;

async function testVideoCors() {
    console.log("1. Fetching Metadata (CORS Check)...");
    try {
        const res = await fetch(apiUrl, {
            headers: { 'Origin': 'http://localhost:4321' }
        });
        const json = await res.json();

        if (json.code === 0 && json.data && json.data.play) {
            const videoUrl = json.data.play;
            console.log("2. Video URL found: " + videoUrl);
            console.log("3. Testing Video CORS...");

            const vidRes = await fetch(videoUrl, {
                method: 'HEAD',
                headers: { 'Origin': 'http://localhost:4321' }
            });
            console.log("Video Status: " + vidRes.status);
            console.log("Video Access-Control-Allow-Origin: " + vidRes.headers.get('access-control-allow-origin'));
        } else {
            console.log("Failed to get video URL from metadata");
        }
    } catch (e) {
        console.error(e);
    }
}

testVideoCors();
