
// @ts-check
import { defineConfig } from 'astro/config';


// https://astro.build/config
export default defineConfig({
    output: 'static',
    // adapter: vercel(), // Removed for 100% static build
});
