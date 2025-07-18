import 'dotenv/config'
import { PrismaClient } from "./generated/prisma";

console.log("DATABASE_URL:", process.env.DATABASE_URL);

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma; 