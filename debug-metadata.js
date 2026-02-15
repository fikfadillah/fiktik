
const url = 'https://www.tiktok.com/@khaby.lame/video/7296048700083326241'; // Known working video

async function test() {
    console.log('\n--- Strategy 2: TikWM (Known Video) ---');
    try {
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&count=12&cursor=0&web=1&hd=1`;
        console.log("Fetching: " + apiUrl);
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            }
        });
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    }
}

test();
