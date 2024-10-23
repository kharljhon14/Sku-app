import { NextRequest, NextResponse } from 'next/server';

import { SKUSchema } from '@/schemas/sku';

import prisma from '../../../../../prisma/db';

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();

  const validation = SKUSchema.safeParse(body);

  if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

  const sku = await prisma.sKU.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });

  if (!sku) return NextResponse.json({ error: 'SKU not found!' }, { status: 404 });

  const updatedSKU = await prisma.sKU.update({
    where: {
      id: parseInt(params.id)
    },
    data: {
      ...body,
      supplierId: Number(body.supplierId),
      categoryId: Number(body.categoryId)
    }
  });

  return NextResponse.json(updatedSKU);
}
