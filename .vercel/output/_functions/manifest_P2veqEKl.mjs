import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_Bay3U2AQ.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_c5XQ63vY.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Bot/fiktik/","cacheDir":"file:///D:/Bot/fiktik/node_modules/.astro/","outDir":"file:///D:/Bot/fiktik/dist/","srcDir":"file:///D:/Bot/fiktik/src/","publicDir":"file:///D:/Bot/fiktik/public/","buildClientDir":"file:///D:/Bot/fiktik/dist/client/","buildServerDir":"file:///D:/Bot/fiktik/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/download","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/download\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"download","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/download.ts","pathname":"/api/download","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.CgVbmVsW.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Bot/fiktik/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/download@_@ts":"pages/api/download.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_P2veqEKl.mjs","D:/Bot/fiktik/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CLw_3N9N.mjs","D:/Bot/fiktik/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Bm4YM_5O.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/Bot/fiktik/src/pages/index.astro?astro&type=script&index=0&lang.ts","const r=document.getElementById(\"download-form\"),L=document.getElementById(\"url-input\"),u=document.getElementById(\"loading-state\"),s=document.getElementById(\"result-section\"),v=document.getElementById(\"success-content\"),w=document.getElementById(\"error-content\"),h=document.getElementById(\"error-message\"),c=document.getElementById(\"video-player\");document.getElementById(\"video-author\");document.getElementById(\"video-desc\");const y=document.getElementById(\"download-mp4\");document.getElementById(\"download-mp3\");const g=document.getElementById(\"mode-switch\");g&&g.addEventListener(\"change\",t=>{t.target.checked});r.addEventListener(\"submit\",async t=>{t.preventDefault();const e=L.value.trim();if(e){d(!0),B();try{const o=`/api/download?url=${encodeURIComponent(e)}`,n=await fetch(o);if(!n.ok){const I=await n.json().catch(()=>({}));throw new Error(I.error||\"Failed to fetch video\")}const E=await n.blob(),l=URL.createObjectURL(E);c.src=l,y.href=l;const i=n.headers.get(\"Content-Disposition\");let m=\"tiktok_video.mp4\";i&&i.includes(\"filename=\")&&(m=i.split(\"filename=\")[1].replace(/\"/g,\"\")),y.download=m,d(!1),b(),S(e)}catch(o){d(!1),k(o.message||\"Error occurred\")}}});function d(t){t?(u?.classList.remove(\"hidden\"),r.classList.add(\"opacity-50\")):(u?.classList.add(\"hidden\"),r.classList.remove(\"opacity-50\"))}function B(){s?.classList.add(\"hidden\"),v?.classList.add(\"hidden\"),w?.classList.add(\"hidden\"),c.pause(),c.src=\"\"}function b(){s?.classList.remove(\"hidden\"),v?.classList.remove(\"hidden\"),s?.scrollIntoView({behavior:\"smooth\"})}function k(t){s?.classList.remove(\"hidden\"),w?.classList.remove(\"hidden\"),h&&(h.textContent=t.toUpperCase())}const p=document.getElementById(\"history-list\"),f=document.getElementById(\"clear-history\");function S(t){let e=JSON.parse(localStorage.getItem(\"tiktok-history\")||\"[]\");e.includes(t)||(e.unshift(t),e.length>10&&e.pop(),localStorage.setItem(\"tiktok-history\",JSON.stringify(e)),a())}function a(){if(!p)return;const t=JSON.parse(localStorage.getItem(\"tiktok-history\")||\"[]\");p.innerHTML=t.map(o=>`\n\t\t\t<li style=\"margin-bottom: 0.5rem; border-bottom: 1px solid #000; padding: 0.5rem; display: flex; justify-content: space-between;\">\n\t\t\t\t<span style=\"overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 80%;\">${o}</span>\n\t\t\t\t<button onclick=\"navigator.clipboard.writeText('${o}')\" style=\"font-size: 0.8rem; padding: 0.2rem;\">COPY</button>\n\t\t\t</li>\n\t\t`).join(\"\");const e=document.getElementById(\"history-section\");t.length>0&&e?e.classList.remove(\"hidden\"):e&&e.classList.add(\"hidden\")}f&&f.addEventListener(\"click\",()=>{localStorage.removeItem(\"tiktok-history\"),a()});a();"]],"assets":["/_astro/index.CgVbmVsW.css","/favicon.ico","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"JnRRRL7e5bQ2/Ug+DRtgnD25kgb/CV1umPp1nbkfRDI="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
