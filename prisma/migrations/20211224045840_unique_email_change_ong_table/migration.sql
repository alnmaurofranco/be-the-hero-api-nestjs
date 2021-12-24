/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `ongs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ongs_email_key" ON "ongs"("email");
