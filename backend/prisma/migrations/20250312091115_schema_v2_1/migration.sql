/*
  Warnings:

  - Made the column `profile` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile" SET NOT NULL,
ALTER COLUMN "profile" SET DEFAULT 'https://res.cloudinary.com/dd8vmqvqp/image/upload/v1741770568/profile-default_nhnefp.svg';
