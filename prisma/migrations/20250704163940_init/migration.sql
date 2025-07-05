-- CreateTable
CREATE TABLE "AllUsers" (
    "id" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT NOT NULL,
    "imgUrl" TEXT,
    "publicId" TEXT,

    CONSTRAINT "AllUsers_pkey" PRIMARY KEY ("id")
);
