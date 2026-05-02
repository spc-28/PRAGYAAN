/**
 * Shared Cloudflare Workers environment bindings and context variable types.
 *
 * Centralised here so every router and middleware imports a single
 * definition instead of duplicating it across files.
 */

/** Secrets / vars injected by the Cloudflare Workers runtime */
export type Bindings = {
  /** Neon PostgreSQL connection string (via Prisma Accelerate) */
  DATABASE_URL: string;
  /** HS256 secret used to sign and verify JWTs */
  JWT_SECRET: string;
  /** Google Gemini API key */
  GEMINI_API_KEY: string;
};

/** Per-request context variables set by middleware */
export type Variables = {
  /** Authenticated user's UUID — populated by authMiddleware */
  userId: string;
};

/** Combined Hono app type used by all routers */
export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};
