import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { AppEnv } from '../types';

/**
 * JWT authentication middleware.
 *
 * Reads the raw token from the `authorization` header (no "Bearer " prefix —
 * the frontend sends the token directly), verifies it against JWT_SECRET,
 * and stores the authenticated user's ID in Hono's typed context variables
 * so downstream route handlers can access it via `c.get('userId')`.
 *
 * Returns 401 immediately if the token is missing, malformed, or expired.
 */
export async function authMiddleware(
  c: Context<AppEnv>,
  next: Next
): Promise<Response | void> {
  const token = c.req.header('authorization') ?? '';

  if (!token) {
    c.status(401);
    return c.json({ message: 'Authorization token required' });
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');

    if (!payload?.id) {
      c.status(401);
      return c.json({ message: 'Invalid token payload' });
    }

    c.set('userId', payload.id as string);
    await next();
  } catch {
    // Catches expired tokens, bad signatures, and malformed JWTs
    c.status(401);
    return c.json({ message: 'Unauthorized — invalid or expired token' });
  }
}
