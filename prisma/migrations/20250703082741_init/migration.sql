-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN', 'MODERATOR');

-- CreateTable
CREATE TABLE "AllUsers" (
    "id" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "age" INTEGER,
    "imgUrl" TEXT,
    "publicId" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "AllUsers_pkey" PRIMARY KEY ("id")
);
