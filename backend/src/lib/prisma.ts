import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

/**
 * Returns a Prisma client instance extended with Prisma Accelerate.
 *
 * Cloudflare Workers are stateless V8 isolates — there is no persistent
 * module-level connection to reuse across requests. A new client is therefore
 * created per request using the connection string from the Worker environment.
 *
 * Prisma Accelerate handles the actual connection pooling externally, so the
 * overhead of calling `new PrismaClient()` here is minimal.
 */
export function getPrisma(datasourceUrl: string) {
  return new PrismaClient({ datasourceUrl }).$extends(withAccelerate());
}
