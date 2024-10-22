import { Category, Supplier } from '@prisma/client';

import { buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DetailedSKU } from '@/types/sku';

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
      <div className="flex-1">
        <Dialog>
          <DialogTrigger className={buttonVariants({ variant: 'default' })}>Edit SKU</DialogTrigger>
          <DialogContent>
            <SKUForm
              categories={categories}
              suppliers={suppliers}
              sku={sku}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
