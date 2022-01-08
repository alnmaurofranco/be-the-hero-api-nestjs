/*
  Warnings:

  - You are about to drop the column `isClosed` on the `incidents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "incidents" DROP COLUMN "isClosed",
ADD COLUMN     "isFinished" BOOLEAN NOT NULL DEFAULT false;
