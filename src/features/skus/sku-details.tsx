import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { DetailedSKU } from '@/types/sku';

import SKUForm from './sku-form';

interface Props {
  sku: DetailedSKU;
}

export default function SKUDetails({ sku }: Props) {
  return (
    <div>
      <div className=" max-w-xl border rounded-sm mx-auto p-6 flex flex-col gap-y-8">
        <div>
          <h1 className="font-semibold text-xl">{sku.name}</h1>

          <p>
            <span className="font-semibold">Code: </span>
            {sku.skuCode}
          </p>
          <p>
            {' '}
            <span className="font-semibold">Category:</span> {sku.category.name}
          </p>
          <p>
            {' '}
            <span className="font-semibold"> Supplier:</span> {sku.Supplier?.name}
          </p>
          <p>
            {' '}
            <span className="font-semibold">Supplier Contact:</span> {sku.Supplier?.email}
          </p>
        </div>

        <div>
          <p className="font-semibold">Description</p>
          <p>{sku.description}</p>
        </div>

        <div>
          <p className="font-semibold">Pricing Information</p>
          <ul>
            <li>
              <p>
                <span className="font-semibold">Price:</span> ${Number(sku.price).toFixed(2)}
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Cost Price:</span> $
                {Number(sku.costPrice).toFixed(2)}
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Stock Quantity:</span> {sku.stockQuantity}
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Stock Threshold:</span> {sku.stockThreshold}
              </p>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-semibold">Created & Updated Information</p>
          <ul>
            <li>
              <p>
                <span className="font-semibold">Created At:</span>{' '}
                {sku.createdAt.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </li>
            <li>
              <p>
                <span className="font-semibold">Updated At:</span>{' '}
                {sku.updatedAt.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </li>
          </ul>
        </div>
      </div>

      <Dialog>
        <DialogTrigger>
          <Button>Edit SKU</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
          </DialogHeader>
          <SKUForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
