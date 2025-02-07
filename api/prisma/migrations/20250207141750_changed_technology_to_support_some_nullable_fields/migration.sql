/*
  Warnings:

  - The values [LANGUAGESANDFRAMEWORKS] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('TECHNIQUES', 'PLATFORMS', 'TOOLS', 'LANGUAGES_AND_FRAMEWORKS');
ALTER TABLE "Technology" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "Category_old";
COMMIT;

-- AlterTable
ALTER TABLE "Technology" ALTER COLUMN "classification" DROP NOT NULL,
ALTER COLUMN "classificationDescription" DROP NOT NULL,
ALTER COLUMN "changedAt" DROP NOT NULL;
