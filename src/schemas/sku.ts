import { z } from 'zod';

export const SKUSchema = z.object({
  name: z.string().min(1, 'Name is required!').max(255),
  skuCode: z.string().min(6, 'Must be at least 6 characters long!').max(50),
  productName: z.string().min(1, 'Product name is required!').max(255),
  description: z.string().max(65535).optional(),
  price: z.number().default(0.0),
  costPrice: z.number().default(0.0),
  stockQuantity: z.number().int().optional().default(0),
  stockThreshold: z.number().int().optional().default(0),
  supplierId: z.number().nullable().optional(),
  categoryId: z.number()
});

export type SKUSchemaType = z.infer<typeof SKUSchema>;
