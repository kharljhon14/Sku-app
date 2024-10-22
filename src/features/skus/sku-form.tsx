'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SKUSchema, SKUSchemaType } from '@/schemas/sku';

export default function SKUForm() {
  const form = useForm<SKUSchemaType>({resolver:zodResolver(SKUSchema)});
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="name"
          render={(field) => (
            <FormItem>
              <FormLabel className="font-semibold">Name</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-1">
                  <Input
                    {...field}
                    placeholder="Name..."
                  />
                  {/* <small className="text-destructive">{form.formState.errors.email?.message}</small> */}
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
