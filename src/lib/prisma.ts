import { PrismaClient } from "@prisma/client";

// Keep a singleton in production, but always refresh in development
// to avoid stale delegates after schema updates during hot reload.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma =
  process.env.NODE_ENV === "development"
    ? createPrismaClient()
    : (globalForPrisma.prisma ?? createPrismaClient());

if (process.env.NODE_ENV !== "development") {
  globalForPrisma.prisma = prisma;
}
