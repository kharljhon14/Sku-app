'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, SKU, Supplier } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { createSKU, updateSKU } from '@/actions/sku';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { SKUSchema, SKUSchemaType } from '@/schemas/sku';

interface Props {
  categories: Category[];
  suppliers: Supplier[];
  sku?: SKU;
}

export default function SKUForm({ categories, suppliers, sku }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const form = useForm<SKUSchemaType>({ resolver: zodResolver(SKUSchema) });

  const { mutate: update_sku } = useMutation({
    mutationFn: (updatedSKU: { sku: SKUSchemaType; id: string }) =>
      updateSKU(updatedSKU.sku, updatedSKU.id),
    onSuccess: () => {
      setModalOpen(false);
      router.refresh();
    }
  });

  const { mutate: create_sku } = useMutation({
    mutationFn: (createdSKU: { sku: SKUSchemaType }) => createSKU(createdSKU.sku),
    onSuccess: () => {
      setModalOpen(false);
      router.refresh();
    }
  });

  const onSubmit: SubmitHandler<SKUSchemaType> = (data) => {
    if (sku) update_sku({ sku: data, id: sku.id.toString() });
    else create_sku({ sku: data });
  };

  return (
    <Dialog
      open={modalOpen}
      onOpenChange={setModalOpen}
    >
      <DialogTrigger className={buttonVariants({ variant: 'default' })}>
        {sku ? 'Edit SKU' : 'Create SKU'}
      </DialogTrigger>
      <DialogContent>
        <div>
          <h3 className="font-semibold text-center text-lg">{sku ? 'Update SKU' : 'Add SKU'}</h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              autoComplete="off"
              className="flex flex-col space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                defaultValue={sku?.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Name*</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <Input
                          {...field}
                          placeholder="Name"
                        />
                        <small className="text-destructive">
                          {form.formState.errors.name?.message}
                        </small>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productName"
                defaultValue={sku?.productName}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Product Name*</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <Input
                          {...field}
                          placeholder="Product Name"
                        />
                        <small className="text-destructive">
                          {form.formState.errors.productName?.message}
                        </small>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skuCode"
                defaultValue={sku?.skuCode}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">SKU Code*</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <Input
                          {...field}
                          placeholder="SKU-000"
                        />
                        <small className="text-destructive">
                          {form.formState.errors.skuCode?.message}
                        </small>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                defaultValue={sku?.description ? sku.description : ''}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">Description</FormLabel>
                    <FormControl>
                      <div className="flex flex-col space-y-1">
                        <Textarea
                          {...field}
                          placeholder="Type the decription here."
                        />
                        <small className="text-destructive">
                          {form.formState.errors.description?.message}
                        </small>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  defaultValue={sku?.categoryId.toString()}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Category*</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field?.value?.toString()}
                        >
                          <div className="flex flex-col space-y-1">
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>

                            <small className="text-destructive">
                              {form.formState.errors.categoryId?.message}
                            </small>
                          </div>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  defaultValue={sku?.supplierId?.toString()}
                  name="supplierId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Supplier</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field?.value?.toString()}
                        >
                          <div className="flex flex-col space-y-1">
                            <SelectTrigger>
                              <SelectValue placeholder="Supplier" />
                            </SelectTrigger>

                            <small className="text-destructive">
                              {form.formState.errors.supplierId?.message}
                            </small>
                          </div>
                          <SelectContent>
                            {suppliers?.map((supplier) => (
                              <SelectItem
                                key={supplier.id}
                                value={supplier.id.toString()}
                              >
                                {supplier.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  defaultValue={Number(sku?.price)}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Price</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <Input
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value === '' ? 0 : Number(e.target.value))
                            }
                            step="0.1"
                            placeholder="0.00"
                          />
                          <small className="text-destructive">
                            {form.formState.errors.price?.message}
                          </small>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  defaultValue={Number(sku?.costPrice)}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Cost Price</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <Input
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value === '' ? 0 : Number(e.target.value))
                            }
                            type="number"
                            step="0.1"
                            placeholder="0.00"
                          />
                          <small className="text-destructive">
                            {form.formState.errors.costPrice?.message}
                          </small>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  defaultValue={sku?.stockQuantity}
                  name="stockQuantity"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Stock Quantity</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <Input
                            {...field}
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value === '' ? 0 : Number(e.target.value))
                            }
                            type="number"
                            placeholder="0"
                          />
                          <small className="text-destructive">
                            {form.formState.errors.stockQuantity?.message}
                          </small>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  defaultValue={sku?.stockThreshold}
                  name="stockThreshold"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="font-semibold">Stock Threshold</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1">
                          <Input
                            {...field}
                            type="number"
                            value={field.value || ''}
                            onChange={(e) =>
                              field.onChange(e.target.value === '' ? 0 : Number(e.target.value))
                            }
                            placeholder="0"
                          />
                          <small className="text-destructive">
                            {form.formState.errors.stockThreshold?.message}
                          </small>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="w-full"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
