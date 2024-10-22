'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Category, SKU, Supplier } from '@prisma/client';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
  const form = useForm<SKUSchemaType>({ resolver: zodResolver(SKUSchema) });
  return (
    <Form {...form}>
      <form className="flex flex-col space-y-6">
        <FormField
          control={form.control}
          name="name"
          defaultValue={sku?.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-1">
                  <Input
                    {...field}
                    placeholder="Name"
                  />
                  {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
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
              <FormLabel className="font-semibold">SKU Code</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-1">
                  <Input
                    {...field}
                    placeholder="SKU-000"
                  />
                  {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={sku?.description as string | undefined}
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
                  {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-between gap-2">
          <FormField
            control={form.control}
            defaultValue={sku?.categoryId}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-semibold">Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field?.value?.toString()}
                  >
                    <div className="flex flex-col space-y-1">
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>

                      {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
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
            defaultValue={sku?.supplierId}
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

                      {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
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
                      type="number"
                      step="0.1"
                      placeholder="0.00"
                    />
                    {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
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
                      type="number"
                      step="0.1"
                      placeholder="0.00"
                    />
                    {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
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
                      type="number"
                      placeholder="0"
                    />
                    {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
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
                      placeholder="0"
                    />
                    {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
