#!/usr/bin/env node
// ES module — generate composite look images for The Cache
// Each product image is contained (full image, no cropping) on a white tile
// Tiles are arranged on a 1600x900 white canvas

import sharp from 'sharp';
import { readdir, readFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const LOOKS_DIR = path.join(ROOT, 'src/content/looks');
const OUTPUT_DIR = path.join(ROOT, 'public/looks');

const CANVAS_W = 1600;
const CANVAS_H = 900;
const OUTER_PAD = 48;   // padding around the whole grid
const TILE_GAP  = 16;   // gap between tiles
const INNER_PAD = 28;   // white breathing room inside each tile around the product image

// White placeholder tile
async function makePlaceholder(w, h) {
  return sharp({
    create: { width: w, height: h, channels: 3, background: { r: 255, g: 255, b: 255 } },
  }).png().toBuffer();
}

// Parse YAML frontmatter from .md file
function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const yaml = match[1];
  const result = {};

  const itemsMatch = yaml.match(/items:\n([\s\S]*?)(?=\n\w|\n$|$)/);
  if (itemsMatch) {
    const items = [];
    const itemBlocks = itemsMatch[1].split(/\n  - /).filter(Boolean);
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

  const scalarMatch = (key) => {
    const m = yaml.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
  };
  result.title = scalarMatch('title');
  return result;
}

// Fetch image URL → Buffer (8s timeout)
async function fetchImage(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Fit image INSIDE tile dimensions with white padding — full image always visible, no cropping
async function fitToTile(buf, tileW, tileH) {
  if (!buf) return makePlaceholder(tileW, tileH);

  const productW = tileW - INNER_PAD * 2;
  const productH = tileH - INNER_PAD * 2;

  try {
    // Step 1: resize to fit entirely inside the product area (no cropping)
    const resized = await sharp(buf)
      .resize(productW, productH, { fit: 'inside', withoutEnlargement: false })
      .toBuffer();

    // Step 2: get actual dimensions after resize
    const meta = await sharp(resized).metadata();
    const imgW = meta.width;
    const imgH = meta.height;

    // Step 3: calculate padding to centre within tile
    const padLeft  = Math.floor((tileW - imgW) / 2);
    const padRight = tileW - imgW - padLeft;
    const padTop   = Math.floor((tileH - imgH) / 2);
    const padBottom = tileH - imgH - padTop;

    // Step 4: extend with white to reach exact tile size
    const tile = await sharp(resized)
      .extend({ top: padTop, bottom: padBottom, left: padLeft, right: padRight,
                background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .jpeg({ quality: 92 })
      .toBuffer();

    return tile;
  } catch {
    return makePlaceholder(tileW, tileH);
  }
}

// Determine grid layout for n items
function getLayout(n) {
  if (n === 1) return { cols: 1, rows: 1 };
  if (n === 2) return { cols: 2, rows: 1 };
  if (n === 3) return { cols: 3, rows: 1 };
  if (n === 4) return { cols: 2, rows: 2 };
  if (n === 5) return { cols: 3, rows: 2 }; // 3 top, 2 bottom centred
  return { cols: 3, rows: 2 }; // 6 = 3x2
}

async function buildComposite(filePath, slug) {
  const raw = await readFile(filePath, 'utf8');
  const { items, title } = parseFrontmatter(raw);

  if (!items || items.length === 0) {
    console.log(`  [skip] ${slug} — no items`);
    return;
  }

  const n = Math.min(items.length, 6);
  const { cols, rows } = getLayout(n);

  const gridW = CANVAS_W - OUTER_PAD * 2;
  const gridH = CANVAS_H - OUTER_PAD * 2;
  const tileW = Math.floor((gridW - TILE_GAP * (cols - 1)) / cols);
  const tileH = Math.floor((gridH - TILE_GAP * (rows - 1)) / rows);

  console.log(`  Building "${title}" — ${n} items, ${cols}x${rows} grid (${tileW}x${tileH} tiles)`);

  const rawBuffers = await Promise.all(items.slice(0, n).map(it => fetchImage(it.image)));
  const tiles = await Promise.all(rawBuffers.map(buf => fitToTile(buf, tileW, tileH)));

  // For 5 items: top row of 3, bottom row of 2 centred
  const composites = [];
  for (let i = 0; i < n; i++) {
    let col, row;
    if (n === 5 && i >= 3) {
      // Bottom row: 2 items centred across 3-column grid
      const bottomIndex = i - 3;
      // Centre 2 tiles in a 3-col grid: offset by half a tile + half a gap
      col = bottomIndex + 0.5;
      row = 1;
      const left = Math.round(OUTER_PAD + col * (tileW + TILE_GAP));
      const top  = OUTER_PAD + row * (tileH + TILE_GAP);
      composites.push({ input: tiles[i], left, top });
    } else {
      col = i % cols;
      row = Math.floor(i / cols);
      const left = OUTER_PAD + col * (tileW + TILE_GAP);
      const top  = OUTER_PAD + row * (tileH + TILE_GAP);
      composites.push({ input: tiles[i], left, top });
    }
  }

  const outPath = path.join(OUTPUT_DIR, `${slug}.jpg`);
  await sharp({
    create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .composite(composites)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(outPath);

  console.log(`  Saved → public/looks/${slug}.jpg`);
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  let files;
  try {
    files = await readdir(LOOKS_DIR);
  } catch {
    console.log('No looks directory found — skipping.');
    return;
  }

  const mdFiles = files.filter(f => f.endsWith('.md'));
  if (mdFiles.length === 0) { console.log('No look files — skipping.'); return; }

  console.log(`Generating composites for ${mdFiles.length} look(s)...`);
  for (const file of mdFiles) {
    await buildComposite(path.join(LOOKS_DIR, file), file.replace('.md', ''));
  }
  console.log('Done.');
}

main().catch(err => { console.error(err); process.exit(1); });
