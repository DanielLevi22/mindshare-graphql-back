import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";
if (!process.env.DATABASE_URL) {
  throw new Error("variavel nao existe");
}
// Cria o adapter apontando para o arquivo SQLite
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

// Singleton do Prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prismaClient =
  globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prismaClient;
}
