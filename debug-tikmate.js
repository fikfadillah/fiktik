
const url = 'https://www.tiktok.com/@aeningkingg/video/7605690496425037077';

async function testTikMate() {
    console.log('--- TikMate Test ---');
    try {
        const formData = new URLSearchParams();
        formData.append('url', url);
        const res = await fetch('https://api.tikmate.app/api/lookup', {
            method: 'POST',
            body: formData,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Referer': 'https://tikmate.app/'
            }
        });
        console.log(`TikMate Status: ${res.status}`);
        const text = await res.text();
        try {
            const json = JSON.parse(text);
            console.log('TikMate JSON:', JSON.stringify(json, null, 2));
        } catch (e) {
            console.log('TikMate Body:', text.substring(0, 500));
        }
    } catch (e) {
        console.error('TikMate Error:', e);
    }
}

(async () => {
    await testTikMate();
})();
