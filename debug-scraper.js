
const videoId = '7605690496425037077';

async function testOfficial() {
    console.log('--- Official API ---');
    const url = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${videoId}`;
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'TikTok 26.2.0 rv:262018 (iPhone; iOS 14.4.2; en_US) Cronet',
            }
        });
        console.log(`Official Status: ${res.status}`);
        const text = await res.text();
        try {
            const json = JSON.parse(text);
            console.log('Official JSON Code:', json.status_code);
            if (json.aweme_list && json.aweme_list.length > 0) {
                const video = json.aweme_list[0].video;
                console.log('Play URL:', video.play_addr.url_list[0]);
                console.log('Download URL:', video.download_addr.url_list[0]);
                // Check if watermarked
            }
        } catch (e) {
            console.log('Official Body:', text.substring(0, 500));
        }

    } catch (e) {
        console.error('Official Error:', e);
    }
}

(async () => {
    await testOfficial();
})();
