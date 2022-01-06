-- CreateEnum
CREATE TYPE "OngProvider" AS ENUM ('FACEBOOK', 'GOOGLE');

-- AlterTable
ALTER TABLE "incidents" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ongs" ADD COLUMN     "hasProvider" "OngProvider",
ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;
