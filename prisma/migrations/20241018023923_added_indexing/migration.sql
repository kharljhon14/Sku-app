-- CreateIndex
CREATE INDEX "skus_categoryId_idx" ON "skus"("categoryId");

-- CreateIndex
CREATE INDEX "skus_supplierId_idx" ON "skus"("supplierId");

-- CreateIndex
CREATE INDEX "skus_updatedByUserId_idx" ON "skus"("updatedByUserId");

-- CreateIndex
CREATE INDEX "skus_createdByUserId_idx" ON "skus"("createdByUserId");
