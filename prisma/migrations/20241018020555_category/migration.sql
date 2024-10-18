-- AlterTable
ALTER TABLE "Sku" ADD COLUMN     "category" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
