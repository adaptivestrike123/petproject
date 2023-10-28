/*
  Warnings:

  - Added the required column `subscriberLogin` to the `Follow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionLogin` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follow" ADD COLUMN     "subscriberLogin" TEXT NOT NULL,
ADD COLUMN     "subscriptionLogin" TEXT NOT NULL;
