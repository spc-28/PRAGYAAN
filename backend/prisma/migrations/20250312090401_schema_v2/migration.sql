/*
  Warnings:

  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tags` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "postLinks" TEXT[],
ADD COLUMN     "tags" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profile" TEXT;
