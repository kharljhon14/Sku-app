import { Prisma } from '@prisma/client';

export interface DetailedSKU
  extends Prisma.SKUGetPayload<{
    include: {
      category: true;
      Supplier: true;
    };
  }> {}
