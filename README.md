# The Cache

> The best stuff you didn't know you needed.

**Live**: [the-cache-site-production.up.railway.app](https://the-cache-site-production.up.railway.app)
**Target domain**: thecache.com

## Content

Articles live in `src/content/articles/`. Each article is a `.md` file with frontmatter:

```markdown
---
title: "Brand Model Name"
description: "One sentence. Most interesting angle."
category: "gear|tech|watches|bikes|cars|clothing|outdoor|art|architecture|books|culture|design"
publishedDate: "YYYY-MM-DD"
status: "draft|approved|live"
price: "£X"
image: "https://..."
buyUrl: "https://..."
featured: false
---
```

Add a new article: create a `.md` file in `src/content/articles/`, push to `master`, Railway redeploys automatically.

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

## Deployment

Deployed on [Railway](https://railway.app) via Docker. Every push to `master` triggers an automatic redeploy.

**Railway project**: `the-cache-site`
**Service URL**: `https://the-cache-site-production.up.railway.app`

Railway builds using the `Dockerfile` at the repo root (Nginx serving the Astro static build).

## Tech Stack

- [Astro](https://astro.build) — static site generator
- [Railway](https://railway.app) — hosting and CI/CD
- [Nginx](https://nginx.org) — static file serving via Docker
