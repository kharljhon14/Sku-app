import SKUInformationContainer from '@/features/skus/sku-information-container';

import prisma from '../../../../prisma/db';

interface Props {
  params: {
    id: string;
  };
}

export default async function SKUPage({ params }: Props) {
  const sku = await prisma.sKU.findUnique({
    where: {
      id: parseInt(params.id)
    },
    include: {
      category: true,
      Supplier: true
    }
  });

  const categories = await prisma.category.findMany();
  const suppliers = await prisma.supplier.findMany();

  if (!sku) {
    return <div className="text-destructive">SKU not found!</div>;
  }
  return (
    <SKUInformationContainer
      sku={sku}
      categories={categories}
      suppliers={suppliers}
    />
  );
}
