import { SKUSchemaType } from '@/schemas/sku';

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
