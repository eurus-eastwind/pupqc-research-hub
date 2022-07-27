import { PrismaClient } from "@prisma/client";
import { withExclude } from "prisma-exclude";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = withExclude(global.prisma || new PrismaClient());

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
