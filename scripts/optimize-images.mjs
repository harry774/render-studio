import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = join(__dirname, "..", "public", "assets");

// Only optimize actual photo content — skip icons, logos, manifest art.
const SKIP = new Set([
  "favicon-96x96.png",
  "apple-touch-icon.png",
  "web-app-manifest-192x192.png",
  "web-app-manifest-512x512.png",
  "file1.png",
]);

const FULL = { width: 1600, quality: 80 }; // gallery + lightbox
const THUMB = { width: 800, quality: 72 }; // grid thumbnails

const fmt = (n) => (n / 1024).toFixed(0) + "KB";

async function run() {
  const files = (await readdir(ASSETS)).filter(
    (f) => extname(f).toLowerCase() === ".png" && !SKIP.has(f)
  );

  let beforeTotal = 0;
  let afterTotal = 0;

  for (const file of files) {
    const src = join(ASSETS, file);
    const name = basename(file, ".png");
    const before = (await stat(src)).size;
    beforeTotal += before;

    const img = sharp(src);
    const meta = await img.metadata();

    // Full-size WebP (downscale only if larger than target)
    const fullPath = join(ASSETS, `${name}.webp`);
    await sharp(src)
      .resize({ width: Math.min(meta.width || FULL.width, FULL.width), withoutEnlargement: true })
      .webp({ quality: FULL.quality })
      .toFile(fullPath);

    // Thumbnail WebP for grid cards
    const thumbPath = join(ASSETS, `${name}-thumb.webp`);
    await sharp(src)
      .resize({ width: Math.min(meta.width || THUMB.width, THUMB.width), withoutEnlargement: true })
      .webp({ quality: THUMB.quality })
      .toFile(thumbPath);

    const fullSize = (await stat(fullPath)).size;
    const thumbSize = (await stat(thumbPath)).size;
    afterTotal += fullSize + thumbSize;

    console.log(
      `${file.padEnd(22)} ${fmt(before).padStart(7)}  ->  full ${fmt(fullSize).padStart(7)} | thumb ${fmt(thumbSize).padStart(7)}`
    );
  }

  console.log("\n--------------------------------------------------");
  console.log(`Files processed : ${files.length}`);
  console.log(`PNG total       : ${fmt(beforeTotal)}`);
  console.log(`WebP total      : ${fmt(afterTotal)} (full + thumb)`);
  console.log(`Reduction       : ${(100 - (afterTotal / beforeTotal) * 100).toFixed(1)}%`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
