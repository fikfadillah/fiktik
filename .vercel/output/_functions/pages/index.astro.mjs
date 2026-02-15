import { e as createComponent, g as addAttribute, k as renderHead, l as renderSlot, r as renderTemplate, h as createAstro, m as maybeRenderHead, n as renderComponent, o as renderScript } from '../chunks/astro/server_Bay3U2AQ.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Download TikTok videos without watermark. Fast, free, and no redirects."><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">${renderHead()}</head> <body> <div class="container"> ${renderSlot($$result, $$slots["default"])} </div> <footer> <p>&copy; 2026 M TAUFIK FADILLAH ✍️ <br> ALL RIGHTS RESERVED.</p> </footer> </body></html>`;
}, "D:/Bot/fiktik/src/layouts/Layout.astro", void 0);

const $$InputBox = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="input-section" data-astro-cid-23pyknb3> <form id="download-form" data-astro-cid-23pyknb3> <div class="mode-toggle" data-astro-cid-23pyknb3> <label class="switch-c" data-astro-cid-23pyknb3> <input type="checkbox" id="mode-switch" data-astro-cid-23pyknb3> <div class="toggle-label" data-astro-cid-23pyknb3> <span class="option" data-mode="single" data-astro-cid-23pyknb3>SINGLE</span> <span class="option" data-mode="batch" data-astro-cid-23pyknb3>BATCH</span> </div> </label> </div> <div class="input-wrapper" data-astro-cid-23pyknb3> <input type="url" id="url-input" placeholder="PASTE TIKTOK URL HERE" required autocomplete="off" data-astro-cid-23pyknb3> </div> <button type="submit" class="btn-large" data-astro-cid-23pyknb3>
DOWNLOAD VIDEO
</button> </form> </div> `;
}, "D:/Bot/fiktik/src/components/InputBox.astro", void 0);

const $$Result = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="result-section" class="hidden" data-astro-cid-3jdmjfuk> <!-- Success State --> <div id="success-content" data-astro-cid-3jdmjfuk> <div class="video-preview" data-astro-cid-3jdmjfuk> <video id="video-player" controls loop playsinline data-astro-cid-3jdmjfuk></video> </div> <div class="meta-info" data-astro-cid-3jdmjfuk> <h3 id="video-author" data-astro-cid-3jdmjfuk>@USERNAME</h3> <p id="video-desc" data-astro-cid-3jdmjfuk>Video Description</p> </div> <div class="action-buttons" data-astro-cid-3jdmjfuk> <a id="download-mp4" class="btn-action primary" download data-astro-cid-3jdmjfuk>
DOWNLOAD MP4
</a> <a id="download-mp3" class="btn-action secondary" download data-astro-cid-3jdmjfuk>
DOWNLOAD MP3
</a> </div> <div id="auto-download-msg" class="auto-msg" data-astro-cid-3jdmjfuk>
DOWNLOAD STARTED AUTOMATICALLY...
</div> </div> <!-- Error State --> <div id="error-content" class="hidden" data-astro-cid-3jdmjfuk> <div class="error-box" data-astro-cid-3jdmjfuk> <h3 data-astro-cid-3jdmjfuk>ERROR.</h3> <p id="error-message" data-astro-cid-3jdmjfuk>INVALID OR PRIVATE VIDEO.</p> </div> </div> </div> `;
}, "D:/Bot/fiktik/src/components/Result.astro", void 0);

const $$Loading = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="loading-state" class="hidden" data-astro-cid-52om46wh> <div class="processing-text" data-astro-cid-52om46wh>PROCESSING...</div> <div class="progress-bar" data-astro-cid-52om46wh> <div class="progress-fill" data-astro-cid-52om46wh></div> </div> </div> `;
}, "D:/Bot/fiktik/src/components/Loading.astro", void 0);

const $$History = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="history-section" class="hidden" data-astro-cid-r3v7tzzp> <h3 data-astro-cid-r3v7tzzp>HISTORY</h3> <ul id="history-list" data-astro-cid-r3v7tzzp> <!-- History items injected here --> </ul> <button id="clear-history" data-astro-cid-r3v7tzzp>CLEAR HISTORY</button> </div> `;
}, "D:/Bot/fiktik/src/components/History.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "NEO-BRUTALIST TIKTOK DOWNLOADER", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header data-astro-cid-j7pv25f6> <h1 data-astro-cid-j7pv25f6>DOWNLOAD TIKTOK<br data-astro-cid-j7pv25f6>WITHOUT WATERMARK</h1> <p data-astro-cid-j7pv25f6>FAST. DIRECT. NO REDIRECT.</p> </header> <main data-astro-cid-j7pv25f6> ${renderComponent($$result2, "InputBox", $$InputBox, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Loading", $$Loading, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "Result", $$Result, { "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "History", $$History, { "data-astro-cid-j7pv25f6": true })} </main> ` })}  ${renderScript($$result, "D:/Bot/fiktik/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Bot/fiktik/src/pages/index.astro", void 0);

const $$file = "D:/Bot/fiktik/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
