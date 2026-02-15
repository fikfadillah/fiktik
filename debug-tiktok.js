
import { TiktokDL } from '@tobyg74/tiktok-api-dl';

const url = 'https://www.tiktok.com/@khaby.lame/video/7296048700083326241';

async function testLibrary() {
    console.log(`Testing Library with URL: ${url}`);
    try {
        const result = await TiktokDL(url, { version: "v1" });
        console.log('Result Status:', result.status);
        if (result.status === 'success') {
            console.log('Video Title:', result.result?.description || result.result?.title);
            console.log('Video URL:', result.result?.video?.nowm || result.result?.video?.[0]);
        } else {
            console.log('Result:', JSON.stringify(result, null, 2));
        }
    } catch (e) {
        console.error('Library Error:', e);
    }
}

testLibrary();
