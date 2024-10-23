'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { deleteSKU } from '@/actions/sku';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import paths from '@/routes';
import { DetailedSKU } from '@/types/sku';

interface Props {
  sku: DetailedSKU;
}

export default function DeleteSKUButton({ sku }: Props) {
  const router = useRouter();

  const { mutate: delete_sku, isPending } = useMutation({
    mutationFn: (id: string) => deleteSKU(id),
    onSuccess: () => {
      router.push(paths.skusPath());
      router.refresh();
    }
  });

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: 'destructive' })}>
        Delete SKU
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you sure you want to delete {sku.name}?</DialogHeader>
        <div className="flex justify-between">
          <Button
            onClick={() => delete_sku(sku.id.toString())}
            variant="destructive"
            disabled={isPending}
          >
            Delete
          </Button>
          <DialogClose className={buttonVariants({ variant: 'secondary' })}>Cancel</DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
