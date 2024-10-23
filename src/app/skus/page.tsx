import SKUForm from '@/features/skus/sku-form';
import SKUsTable from '@/features/skus/skus-table';

import prisma from '../../../prisma/db';

export default async function SKUsPage() {
  const skus = await prisma.sKU.findMany({
    include: {
      category: true,
      Supplier: true
    },
    orderBy: {
      ['createdAt']: 'desc'
    }
  });
  const categories = await prisma.category.findMany();
  const suppliers = await prisma.supplier.findMany();

  return (
    <div>
      <SKUForm
        categories={categories}
        suppliers={suppliers}
      />
      <SKUsTable skus={skus} />
    </div>
  );
}
