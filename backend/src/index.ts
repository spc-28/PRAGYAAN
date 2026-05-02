import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

const app = new Hono();

// ─── CORS ─────────────────────────────────────────────────────────────────────
// In production, replace the origin wildcard with your actual frontend URL, e.g.:
//   origin: 'https://pragyaan.vercel.app'
// The wildcard is acceptable for a public read-heavy API, but restricting it
// prevents other sites from making credentialed requests on a user's behalf.
app.use( '/api/*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Routes ───────────────────────────────────────────────────────────────────
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

// ─── 404 fallback ─────────────────────────────────────────────────────────────
app.notFound((c) => {
  c.status(404);
  return c.json({ message: `Route ${c.req.method} ${c.req.path} not found` });
});

// ─── Global error handler ─────────────────────────────────────────────────────
app.onError((err, c) => {
  console.error('[Unhandled error]', err);
  c.status(500);
  return c.json({ message: 'Internal server error' });
});

export default app;
