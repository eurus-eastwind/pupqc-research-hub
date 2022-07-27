-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'STAFF';

-- CreateTable
CREATE TABLE "Documents" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "researchers" TEXT[],
    "course" TEXT,
    "degree" TEXT,
    "abstract" TEXT,
    "pdf" TEXT,
    "role" "Role",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Documents_title_key" ON "Documents"("title");
