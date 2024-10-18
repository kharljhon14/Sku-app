-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_updatedByUserId_fkey";
