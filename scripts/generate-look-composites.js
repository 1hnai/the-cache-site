#!/usr/bin/env node
// ES module — generate composite look images for The Cache
// Reads src/content/looks/*.md, composites product images onto 1600x900 white canvas
// Outputs to public/looks/[slug].jpg

import sharp from 'sharp';
import { readdir, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOOKS_DIR = path.join(ROOT, 'src/content/looks');
const OUTPUT_DIR = path.join(ROOT, 'public/looks');

const CANVAS_W = 1600;
const CANVAS_H = 900;
const PADDING = 40;
const TILE_GAP = 20;

// Pastel white placeholder tile (PNG buffer)
async function makePlaceholder(w, h) {
  return sharp({
    create: { width: w, height: h, channels: 4, background: { r: 242, g: 240, b: 237, alpha: 1 } },
  }).png().toBuffer();
}

// Parse simple YAML frontmatter (--- block at top of .md)
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result = {};

  // Extract items array
  const itemsMatch = yaml.match(/items:\n([\s\S]*?)(?=\n\w|\n$|$)/);
  if (itemsMatch) {
    const itemsBlock = itemsMatch[1];
    const items = [];
    const itemBlocks = itemsBlock.split(/\n  - /).filter(Boolean);
    for (const block of itemBlocks) {
      const item = {};
      const lines = block.replace(/^- /, '').split('\n');
      for (const line of lines) {
        const m = line.trim().match(/^(\w+):\s*(.+)$/);
        if (m) item[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
      }
      if (item.image) items.push(item);
    }
    result.items = items;
  }

  // Extract scalar fields
  const scalarMatch = (key) => {
    const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
  };
  result.title = scalarMatch('title');
  result.slug = undefined; // derived from filename
  return result;
}

// Download image URL → Buffer (with timeout)
async function fetchImage(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = await res.arrayBuffer();
    return Buffer.from(buf);
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Fit-crop an image buffer into a tile of exact dimensions
async function fitTile(buf, tileW, tileH) {
  if (!buf) return makePlaceholder(tileW, tileH);
  try {
    return await sharp(buf)
      .resize(tileW, tileH, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 92 })
      .toBuffer();
  } catch {
    return makePlaceholder(tileW, tileH);
  }
}

// Build composite for a single look file
async function buildComposite(filePath, slug) {
  const raw = await readFile(filePath, 'utf8');
  const { items, title } = parseFrontmatter(raw);

  if (!items || items.length === 0) {
    console.log(`  [skip] ${slug} — no items`);
    return;
  }

  const n = Math.min(items.length, 6);
  const cols = n <= 3 ? n : 3;
  const rows = Math.ceil(n / cols);

  // Compute tile dimensions
  const totalW = CANVAS_W - PADDING * 2 - TILE_GAP * (cols - 1);
  const totalH = CANVAS_H - PADDING * 2 - TILE_GAP * (rows - 1);
  const tileW = Math.floor(totalW / cols);
  const tileH = Math.floor(totalH / rows);

  console.log(`  Building "${title}" — ${n} items, ${cols}x${rows} grid (${tileW}x${tileH} tiles)`);

  // Download all images in parallel
  const rawBuffers = await Promise.all(items.slice(0, n).map((it) => fetchImage(it.image)));

  // Resize to tile dimensions
  const tiles = await Promise.all(rawBuffers.map((buf) => fitTile(buf, tileW, tileH)));

  // Build composite array for sharp
  const composites = [];
  for (let i = 0; i < n; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const left = PADDING + col * (tileW + TILE_GAP);
    const top = PADDING + row * (tileH + TILE_GAP);
    composites.push({ input: tiles[i], left, top });
  }

  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
  await sharp({
    create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .composite(composites)
    .jpeg({ quality: 90 })
    .toFile(outPath);

  console.log(`  Saved → public/looks/${slug}.jpg`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  let files;
  try {
    files = await readdir(LOOKS_DIR);
  } catch {
    console.log('No looks directory found — skipping composite generation.');
    return;
  }

  const mdFiles = files.filter((f) => f.endsWith('.md'));
  if (mdFiles.length === 0) {
    console.log('No look files found — skipping.');
    return;
  }

  console.log(`Generating composites for ${mdFiles.length} look(s)...`);
  for (const file of mdFiles) {
    const slug = file.replace('.md', '');
    await buildComposite(path.join(LOOKS_DIR, file), slug);
  }
  console.log('Done.');
}

main().catch((err) => {
  console.error('Composite generation error:', err);
  process.exit(1);
});
