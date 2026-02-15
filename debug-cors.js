
const url = 'https://www.tiktok.com/@aeningkingg/video/7605690496425037077';
const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&count=12&cursor=0&web=1&hd=1`;

async function testCors() {
    console.log("Testing CORS for: " + apiUrl);
    try {
        const res = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Origin': 'http://localhost:4321', // Simulate Astro local dev
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            }
        });

        console.log("Status: " + res.status);
        console.log("Access-Control-Allow-Origin: " + res.headers.get('access-control-allow-origin'));

        const json = await res.json();
        console.log("Data success: " + (json.code === 0));
        if (json.code === 0) {
            console.log("Title found: " + json.data.title);
        }
    } catch (e) {
        console.error(e);
    }
}

testCors();
