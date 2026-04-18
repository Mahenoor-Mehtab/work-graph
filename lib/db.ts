import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// 🔍 Debug: check if env is loaded
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing")
} else {
  console.log("✅ DATABASE_URL loaded")
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db
}