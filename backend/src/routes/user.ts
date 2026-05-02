import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@spc-28/pragyaan-common';
import { getPrisma } from '../lib/prisma';
import { hashPassword, comparePassword } from '../utils/crypto';
import { authMiddleware } from '../middleware/auth';
import { AppEnv } from '../types';

export const userRouter = new Hono<AppEnv>();

// ─── Public routes (no auth required) ────────────────────────────────────────

/**
 * POST /api/v1/user/signup
 * Creates a new user account and returns a signed JWT.
 */
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const parsed = signupInput.safeParse(body);

  if (!parsed.success) {
    c.status(400);
    return c.json({ message: 'Invalid input', errors: parsed.error.flatten().fieldErrors });
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  // Check for duplicate email before attempting to create
  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) {
    c.status(409);
    return c.json({ message: 'An account with this email already exists' });
  }

  try {
    const hashedPassword = await hashPassword(parsed.data.password);
    const user = await prisma.user.create({
      data: {
        email:     parsed.data.email,
        password:  hashedPassword,
        firstName: parsed.data.firstName,
        lastName:  parsed.data.lastName,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    c.status(201);
    return c.json({ jwt });
  } catch (err) {
    console.error('[signup] Unexpected error:', err);
    c.status(500);
    return c.json({ message: 'Failed to create account' });
  }
});

/**
 * POST /api/v1/user/signin
 * Validates credentials and returns a signed JWT.
 */
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const parsed = signinInput.safeParse(body);

  if (!parsed.success) {
    c.status(400);
    return c.json({ message: 'Invalid input', errors: parsed.error.flatten().fieldErrors });
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const user = await prisma.user.findUnique({ where: { email: parsed.data.email } });

    // Use the same generic message for both "user not found" and "wrong password"
    // to avoid leaking whether an email is registered.
    if (!user) {
      c.status(401);
      return c.json({ message: 'Invalid email or password' });
    }

    const passwordMatch = await comparePassword(parsed.data.password, user.password);
    if (!passwordMatch) {
      c.status(401);
      return c.json({ message: 'Invalid email or password' });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (err) {
    console.error('[signin] Unexpected error:', err);
    c.status(500);
    return c.json({ message: 'Sign in failed' });
  }
});

// ─── Protected routes (JWT required) ─────────────────────────────────────────

/**
 * GET /api/v1/user
 * Returns the authenticated user's profile, published posts, and bookmarks.
 * Password is never included in the response.
 */
userRouter.get('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const prisma  = getPrisma(c.env.DATABASE_URL);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id:        true,
        firstName: true,
        lastName:  true,
        email:     true,
        profile:   true,
        posts: {
          select: {
            id:          true,
            title:       true,
            description: true,
            tags:        true,
            minuteRead:  true,
            upVotes:     true,
            createdAt:   true,
            published:   true,
            thumbnail:   true,
          },
        },
        bookMarks: {
          select: {
            id:          true,
            title:       true,
            description: true,
            tags:        true,
            minuteRead:  true,
            upVotes:     true,
            createdAt:   true,
            thumbnail:   true,
            author: {
              select: {
                id:        true,
                firstName: true,
                lastName:  true,
                profile:   true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ message: 'User not found' });
    }

    return c.json({ user });
  } catch (err) {
    console.error('[GET /user] Unexpected error:', err);
    c.status(500);
    return c.json({ message: 'Failed to fetch user' });
  }
});

/**
 * PUT /api/v1/user
 * Updates the authenticated user's profile picture URL.
 */
userRouter.put('/', authMiddleware, async (c) => {
  const userId = c.get('userId');
  const body   = await c.req.json();
  const prisma  = getPrisma(c.env.DATABASE_URL);

  if (!body.profile || typeof body.profile !== 'string') {
    c.status(400);
    return c.json({ message: 'A valid profile URL is required' });
  }

  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data:  { profile: body.profile },
      select: {
        id:        true,
        firstName: true,
        lastName:  true,
        email:     true,
        profile:   true,
      },
    });

    return c.json({ user: updated });
  } catch (err) {
    console.error('[PUT /user] Unexpected error:', err);
    c.status(500);
    return c.json({ message: 'Failed to update profile' });
  }
});
