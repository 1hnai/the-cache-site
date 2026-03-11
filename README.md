# The Cache

> The best stuff you didn't know you needed.

**Domain**: [thecache.com](https://thecache.com)

## Setup

### Prerequisites

- [Node.js](https://nodejs.org) v18+
- npm

### Install dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens at <http://localhost:4321>

### Build

```bash
npm run build
```

Static output goes to `dist/`.

### Preview production build

```bash
npm run preview
```

## Deployment

This site deploys automatically via Netlify on every push to `main`.

Build settings (configured in `netlify.toml`):
- **Build command**: `npm run build`
- **Publish directory**: `dist`

To connect to Netlify:
1. Go to [Netlify](https://app.netlify.com) → **Add new site** → **Import an existing project**
2. Connect the `1hnai/the-cache-site` GitHub repo
3. Netlify will auto-detect the build config from `netlify.toml`

## Tech Stack

- [Astro](https://astro.build) — static site generator
- [Netlify](https://netlify.com) — hosting and CI/CD
