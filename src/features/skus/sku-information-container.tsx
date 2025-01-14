import { Category, Supplier } from '@prisma/client';

import { DetailedSKU } from '@/types/sku';

import DeleteSKUButton from './delete-sku-button';
import SKUDetails from './sku-details';
import SKUForm from './sku-form';

interface Props {
  sku: DetailedSKU;
  categories: Category[];
  suppliers: Supplier[];
}

export default function SKUInformationContainer({ sku, categories, suppliers }: Props) {
  return (
    <div className="flex gap-x-4">
      <div className="flex-1">
        <SKUDetails sku={sku} />
      </div>
      <div className="flex-1 flex gap-2">
        <SKUForm
          categories={categories}
          suppliers={suppliers}
          sku={sku}
        />
        <DeleteSKUButton sku={sku} />
      </div>
    </div>
  );
}
