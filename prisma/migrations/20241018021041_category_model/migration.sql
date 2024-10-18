/*
  Warnings:

  - You are about to drop the column `category` on the `Sku` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Sku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sku" DROP COLUMN "category",
ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sku" ADD CONSTRAINT "Sku_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
