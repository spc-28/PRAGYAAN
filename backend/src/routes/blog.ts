import { Hono } from 'hono';
import { createBlogInput, updateBlogInput } from '@spc-28/pragyaan-common';
import { getPrisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { calculateMinuteRead } from '../utils/readTime';
import { generateAIContent } from '../utils/gemini';
import { TAG_INSTRUCTION, DESCRIPTION_INSTRUCTION } from '../config/prompts';
import { AppEnv } from '../types';

export const blogRouter = new Hono<AppEnv>();

// Apply JWT auth to every route in this router
blogRouter.use('/*', authMiddleware);

// Prisma author select — reused across multiple queries to keep
// the response shape consistent and avoid exposing password.
const AUTHOR_SELECT = {
  id:        true,
  firstName: true,
  lastName:  true,
  profile:   true,
} as const;

// ─── Create ───────────────────────────────────────────────────────────────────

/**
 * POST /api/v1/blog
 * Creates a new blog post.
 *
 * Calls Gemini twice (tags + description) before writing to the DB.
 * Falls back to empty strings if Gemini is unavailable so the post
 * is still created rather than failing the entire request.
 */
blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  const parsed = createBlogInput.safeParse(body);

  if (!parsed.success) {
    c.status(400);
    return c.json({ message: 'Invalid input', errors: parsed.error.flatten().fieldErrors });
  }

  const authorId = c.get('userId');
  const prisma   = getPrisma(c.env.DATABASE_URL);

  // Run AI generation and read-time calculation in parallel
  const [tags, description, minuteRead] = await Promise.all([
    generateAIContent(parsed.data.content, TAG_INSTRUCTION, c.env.GEMINI_API_KEY),
    generateAIContent(parsed.data.content, DESCRIPTION_INSTRUCTION, c.env.GEMINI_API_KEY),
    Promise.resolve(calculateMinuteRead(parsed.data.content)),
  ]);

  try {
    const blog = await prisma.post.create({
      data: {
        title:       parsed.data.title,
        content:     parsed.data.content,
        authorId,
        minuteRead,
        description: description ?? '',
        tags:        tags ?? '',
        thumbnail:   body.thumbnail ?? null,
        published:   true,
        upVotes:     0,
      },
    });

    c.status(201);
    return c.json({ id: blog.id });
  } catch (err) {
    console.error('[POST /blog] DB error:', err);
    c.status(500);
    return c.json({ message: 'Failed to create blog post' });
  }
});

// ─── Read ─────────────────────────────────────────────────────────────────────

/**
 * GET /api/v1/blog/bulk
 * Returns all published blog posts with their author's public profile.
 * Ordered newest-first.
 */
blogRouter.get('/bulk', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const blogs = await prisma.post.findMany({
      where:   { published: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id:          true,
        title:       true,
        description: true,
        tags:        true,
        minuteRead:  true,
        upVotes:     true,
        createdAt:   true,
        thumbnail:   true,
        published:   true,
        author: { select: AUTHOR_SELECT },
      },
    });

    return c.json({ blogs });
  } catch (err) {
    console.error('[GET /blog/bulk] DB error:', err);
    c.status(500);
    return c.json({ message: 'Failed to fetch blog posts' });
  }
});

/**
 * GET /api/v1/blog/:id
 * Returns a single blog post (including full content) by its UUID.
 */
blogRouter.get('/:id', async (c) => {
  const id     = c.req.param('id');
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const blog = await prisma.post.findUnique({
      where:  { id },
      select: {
        id:          true,
        title:       true,
        description: true,
        content:     true,
        tags:        true,
        minuteRead:  true,
        upVotes:     true,
        createdAt:   true,
        thumbnail:   true,
        published:   true,
        postLinks:   true,
        author: { select: AUTHOR_SELECT },
      },
    });

    if (!blog) {
      c.status(404);
      return c.json({ message: 'Blog post not found' });
    }

    return c.json({ blog });
  } catch (err) {
    console.error('[GET /blog/:id] DB error:', err);
    c.status(500);
    return c.json({ message: 'Failed to fetch blog post' });
  }
});

// ─── Update ───────────────────────────────────────────────────────────────────

/**
 * PUT /api/v1/blog/:id
 * Updates a blog post's title and content.
 * Only the original author can edit their post.
 */
blogRouter.put('/:id', async (c) => {
  const id     = c.req.param('id');
  const userId = c.get('userId');
  const body   = await c.req.json();

  const parsed = updateBlogInput.safeParse(body);
  if (!parsed.success) {
    c.status(400);
    return c.json({ message: 'Invalid input', errors: parsed.error.flatten().fieldErrors });
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  // Verify the requesting user owns this post before updating
  const existing = await prisma.post.findUnique({ where: { id }, select: { authorId: true } });
  if (!existing) {
    c.status(404);
    return c.json({ message: 'Blog post not found' });
  }
  if (existing.authorId !== userId) {
    c.status(403);
    return c.json({ message: 'You are not allowed to edit this post' });
  }

  try {
    const blog = await prisma.post.update({
      where: { id },
      data:  { title: parsed.data.title, content: parsed.data.content },
    });

    return c.json({ id: blog.id });
  } catch (err) {
    console.error('[PUT /blog/:id] DB error:', err);
    c.status(500);
    return c.json({ message: 'Failed to update blog post' });
  }
});

// ─── Interactions ─────────────────────────────────────────────────────────────

/**
 * PUT /api/v1/blog/addLike
 * Increments the upvote counter on a post by 1.
 */
blogRouter.put('/addLike', async (c) => {
  const body = await c.req.json();

  if (!body.id || typeof body.id !== 'string') {
    c.status(400);
    return c.json({ message: 'Post ID is required' });
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    const updatedPost = await prisma.post.update({
      where: { id: body.id },
      data:  { upVotes: { increment: 1 } },
    });

    return c.json({ updatedPost });
  } catch (err) {
    console.error('[PUT /blog/addLike] DB error:', err);
    c.status(500);
    return c.json({ message: 'Failed to update upvote' });
  }
});

/**
 * PUT /api/v1/blog/addBookmark
 * Toggles a bookmark on a post for the authenticated user.
 * If the post is already bookmarked it is removed; otherwise it is added.
 */
blogRouter.put('/addBookmark', async (c) => {
  const body   = await c.req.json();
  const userId = c.get('userId');

  if (!body.id || typeof body.id !== 'string') {
    c.status(400);
    return c.json({ message: 'Post ID is required' });
  }

  const prisma = getPrisma(c.env.DATABASE_URL);

  try {
    // Check if the user has already bookmarked this post
    const post = await prisma.post.findUnique({
      where:   { id: body.id },
      select:  { bookMarks: { where: { id: userId }, select: { id: true } } },
    });

    if (!post) {
      c.status(404);
      return c.json({ message: 'Blog post not found' });
    }

    const alreadyBookmarked = post.bookMarks.length > 0;

    const updatedPost = await prisma.post.update({
      where: { id: body.id },
      data: {
        bookMarks: alreadyBookmarked
          ? { disconnect: { id: userId } }   // remove bookmark
          : { connect:    { id: userId } },  // add bookmark
      },
      select: {
        id:        true,
        bookMarks: { select: { id: true } },
      },
    });

    return c.json({ updatedPost });
  } catch (err) {
    console.error('[PUT /blog/addBookmark] DB error:', err);
    c.status(500);
    return c.json({ message: 'Failed to update bookmark' });
  }
});
