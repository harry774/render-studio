/**
 * Post-build pre-rendering.
 *
 * Google Ads' review bot fetches each sitelink URL and reads the raw HTML —
 * it doesn't run JavaScript. A plain SPA returns the same empty shell for
 * every route, which triggers "Destination mismatch" disapprovals. This
 * script renders each route to real HTML at build time and writes it to
 * dist/<route>/index.html, so any static host serves distinct pages with
 * no rewrite rules required.
 *
 * Run via `npm run build`:
 *   1. vite build                    -> dist/ (client assets + index.html shell)
 *   2. vite build --ssr ...          -> dist-ssr/entry-server.js
 *   3. node scripts/prerender.mjs    -> this file
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const { render, ROUTE_META } = await import(
  new URL(`file://${path.join(root, "dist-ssr", "entry-server.js").replace(/\\/g, "/")}`).href
);

const template = readFileSync(path.join(dist, "index.html"), "utf-8");

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

const applyMeta = (html, meta) => {
  const title = escapeAttr(meta.title);
  const desc = escapeAttr(meta.description);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${desc}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${desc}$2`);
};

const routes = Object.keys(ROUTE_META);

for (const route of routes) {
  const appHtml = render(route);
  let html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );
  html = applyMeta(html, ROUTE_META[route]);
  html = html.replace(
    "</head>",
    `    <link rel="canonical" href="https://3drendersstudio.com${route === "/" ? "" : route}" />\n  </head>`
  );

  const outDir = route === "/" ? dist : path.join(dist, route.slice(1));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, "index.html"), html);
  console.log(`prerendered ${route} -> ${path.relative(root, path.join(outDir, "index.html"))}`);
}

// Sitemap for crawlers
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url><loc>https://3drendersstudio.com${r === "/" ? "/" : r}</loc><lastmod>${today}</lastmod></url>`
  )
  .join("\n")}
</urlset>
`;
writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
console.log("wrote dist/sitemap.xml");

// SSR bundle is build-time only — keep it out of the deployed output
rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
