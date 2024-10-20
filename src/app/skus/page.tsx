import SKUsTable from '@/features/skus/skus-table';

import prisma from '../../../prisma/db';

export default async function SKUsPage() {
  const skus = await prisma.sKU.findMany({
    include: {
      category: true,
      Supplier: true
    }
  });

  return (
    <div>
      <SKUsTable skus={skus} />
    </div>
  );
}
