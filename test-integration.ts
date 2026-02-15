
import { Downloader } from '@tobyg74/tiktok-api-dl';

const url = 'https://www.tiktok.com/@khaby.lame/video/7296048700083326241';

async function run() {
    console.log('Testing Downloader (v2)...');
    try {
        const result = await Downloader(url, { version: "v2" });
        console.log('Result Status v2:', result.status);
        if (result.status === 'success') {
            console.log('Video URL:', result.result?.video || result.result?.nowm); // v2 might have different structure
            console.log('Full Result Keys:', Object.keys(result.result || {}));
        } else {
            console.log('Failed v2:', result);

            // Fallback to v1 retry
            console.log('Retrying v1...');
            const res1 = await Downloader(url, { version: "v1" });
            console.log('Result Status v1:', res1.status);
            if (res1.status === 'success') console.log('Video URL:', res1.result?.video?.nowm);
            else console.log('Full Result v1:', JSON.stringify(res1, null, 2));
        }

    } catch (e) {
        console.error('CRITICAL ERROR:', e);
    }
}

run();
