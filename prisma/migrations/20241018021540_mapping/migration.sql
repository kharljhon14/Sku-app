/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sku` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sku" DROP CONSTRAINT "Sku_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Sku" DROP CONSTRAINT "Sku_createdByUserId_fkey";

-- DropForeignKey
ALTER TABLE "Sku" DROP CONSTRAINT "Sku_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "Sku" DROP CONSTRAINT "Sku_updatedByUserId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Sku";

-- CreateTable
CREATE TABLE "skus" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "skuCode" VARCHAR(50) NOT NULL,
    "productName" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "costPrice" DECIMAL(65,30) NOT NULL DEFAULT 0.00,
    "stockQuantity" INTEGER NOT NULL DEFAULT 0,
    "stockThreshold" INTEGER NOT NULL DEFAULT 0,
    "supplierId" INTEGER,
    "createdByUserId" INTEGER,
    "updatedByUserId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "skus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "skus_skuCode_key" ON "skus"("skuCode");

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_createdByUserId_fkey" FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_updatedByUserId_fkey" FOREIGN KEY ("updatedByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
