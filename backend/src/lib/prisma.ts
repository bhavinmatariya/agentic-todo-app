import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient instance across module reloads (e.g. nodemon)
// to avoid exhausting the database connection pool in development.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
