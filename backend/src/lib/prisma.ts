import { PrismaClient } from "@prisma/client";

// Single shared Prisma client instance used across the backend.
const prisma = new PrismaClient();

export default prisma;
