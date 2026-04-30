# Pragyaan ✍️

> A serverless blog platform built for speed and scale — powered by Cloudflare Workers at the edge.

---

## What is Pragyaan?

Pragyaan (Sanskrit: *प्रज्ञान* — knowledge, wisdom) is a full-stack blogging platform engineered for global, low-latency access without traditional server infrastructure. Authors get a rich writing experience with real-time editing, image uploads, and version history. Readers get blazing-fast page loads backed by edge compute.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, TypeScript, Vite |
| **Backend** | Cloudflare Workers, Hono |
| **Database** | PostgreSQL (Neon / Prisma ORM) |
| **Shared Types** | Common package (monorepo) |
| **Deployment** | Cloudflare Workers (serverless edge) |

---

## Features

- **Edge-native backend** — Cloudflare Workers with the Hono framework for sub-millisecond cold starts and global distribution across 300+ PoPs
- **Rich text editor** — Full-featured writing experience with formatting, inline images, and block-level content
- **Image uploads** — Direct media attachment support within posts
- **Version history** — Every edit is tracked, letting authors revisit and restore prior drafts
- **Fast frontend** — React app with code splitting and SSR-ready architecture; page loads under 2s
- **Normalized schema** — PostgreSQL schema with indexed analytics tables for efficient read/write and future author dashboards

---

## Getting Started

### Prerequisites

- Node.js 18+
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (`npm install -g wrangler`)
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### 1. Clone the repo

```bash
git clone https://github.com/spc-28/PRAGYAAN.git
cd PRAGYAAN
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.dev.vars` file (Cloudflare Workers local secrets):

```env
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret
```

Run locally:

```bash
npm run dev
```

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:8787
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

### 4. Shared common package

```bash
cd common
npm install
npm run build
```

> The `common` package exports shared TypeScript types and Zod validation schemas used by both frontend and backend.

---

## Architecture

```
Browser
   │
   ▼
React Frontend (Vite)
   │  REST API (JSON)
   ▼
Cloudflare Workers (Edge)
   │  Hono Router + Middleware
   ▼
PostgreSQL (via Prisma / connection pooling)
```

All backend logic runs at Cloudflare's edge — no origin server, no container to manage. Requests are routed to the nearest PoP globally, reducing latency significantly for international users.

---

## Performance

| Metric | Value |
|---|---|
| Page load time | < 2s |
| Backend cold start | ~0ms (V8 isolates, not containers) |
| Global distribution | 300+ Cloudflare PoPs |

---


<p align="center">Built with ❤️ by <a href="https://github.com/spc-28">Shardul Chorghade</a></p>
