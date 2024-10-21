import SKUDetails from '@/features/skus/sku-details';

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

  if (!sku) {
    return <div className="text-destructive">SKU not found!</div>;
  }
  return <SKUDetails sku={sku} />;
}
