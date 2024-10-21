import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import paths from '@/routes';
import { DetailedSKU } from '@/types/sku';

interface Props {
  skus: DetailedSKU[];
}

export default function SKUsTable({ skus }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div>Name</div>
          </TableHead>
          <TableHead>
            <div>SKU Code</div>
          </TableHead>
          <TableHead>
            <div>Product Name</div>
          </TableHead>
          <TableHead>
            <div>Supplier</div>
          </TableHead>
          <TableHead>
            <div>Category</div>
          </TableHead>
          <TableHead>
            <div>Description</div>
          </TableHead>
          <TableHead>
            <div>Price</div>
          </TableHead>
          <TableHead>
            <div>Cost Price</div>
          </TableHead>
          <TableHead>
            <div>Stock Quantity</div>
          </TableHead>
          <TableHead>
            <div>Stock Threshold</div>
          </TableHead>
          <TableHead>
            <div>Created At</div>
          </TableHead>
          <TableHead>
            <div>Updated At</div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skus.map((sku) => (
          <TableRow key={sku.id}>
            <TableCell>
              <Link
                className="underline"
                href={paths.showSkuPath(sku.id.toString())}
              >
                {sku.name}
              </Link>
            </TableCell>
            <TableCell>
              <div>{sku.skuCode}</div>
            </TableCell>
            <TableCell>
              <div>{sku.productName}</div>
            </TableCell>
            <TableCell>
              <div>{sku.Supplier?.name}</div>
            </TableCell>
            <TableCell>
              <div>{sku.category.name}</div>
            </TableCell>
            <TableCell>
              <div>{sku.description}</div>
            </TableCell>
            <TableCell>
              <div>&#8369; {Number(sku.price).toFixed(2)}</div>
            </TableCell>
            <TableCell>
              <div>&#8369; {Number(sku.costPrice).toFixed(2)}</div>
            </TableCell>
            <TableCell>
              <div>{sku.stockQuantity}</div>
            </TableCell>
            <TableCell>
              <div>{sku.stockThreshold}</div>
            </TableCell>
            <TableCell>
              <div>
                {sku.createdAt.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </TableCell>
            <TableCell>
              <div>
                {sku.updatedAt.toLocaleDateString('en-US', {
                  year: '2-digit',
                  month: '2-digit',
                  day: '2-digit',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
