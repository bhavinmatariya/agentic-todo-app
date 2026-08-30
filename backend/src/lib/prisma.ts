import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across the app (and across
// ts-node-dev/nodemon reloads in development) to avoid exhausting
// the database connection pool.
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

export const prisma = global.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.__prisma = prisma;
}

export default prisma;
