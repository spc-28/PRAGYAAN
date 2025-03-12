/*
  Warnings:

  - You are about to drop the `Bookmark` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `upVotes` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_postId_fkey";

-- DropForeignKey
ALTER TABLE "Bookmark" DROP CONSTRAINT "Bookmark_userId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "upVotes" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Bookmark";

-- CreateTable
CREATE TABLE "_BookMark" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookMark_AB_unique" ON "_BookMark"("A", "B");

-- CreateIndex
CREATE INDEX "_BookMark_B_index" ON "_BookMark"("B");

-- AddForeignKey
ALTER TABLE "_BookMark" ADD CONSTRAINT "_BookMark_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookMark" ADD CONSTRAINT "_BookMark_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
