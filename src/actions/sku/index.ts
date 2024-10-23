import { revalidatePath } from 'next/cache';

import { SKUSchemaType } from '@/schemas/sku';

export async function createSKU(sku: SKUSchemaType) {
  try {
    const res = await fetch(`/api/skus`, {
      method: 'POST',
      body: JSON.stringify(sku),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }

    const createdSKU = await res.json();
    revalidatePath('/skus');
    return createdSKU;
  } catch (err) {
    console.error('Error creating SKU:', err);
    throw err;
  }
}

export async function updateSKU(sku: SKUSchemaType, id: string) {
  try {
    const res = await fetch(`/api/skus/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(sku),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error);
    }

    const updatedSKU = await res.json();

    return updatedSKU;
  } catch (err) {
    console.error('Error udpdating SKU:', err);
    throw err;
  }
}
