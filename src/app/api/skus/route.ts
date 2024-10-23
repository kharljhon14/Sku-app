import { NextRequest, NextResponse } from 'next/server';

import { SKUSchema } from '@/schemas/sku';

import prisma from '../../../../prisma/db';

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = SKUSchema.safeParse(body);

  if (!validation.success)
    return NextResponse.json({ error: validation.error.format() }, { status: 400 });

  const newSKU = await prisma.sKU.create({
    data: {
      ...body,
      supplierId: Number(body.supplierId),
      categoryId: Number(body.categoryId)
    }
  });

  return NextResponse.json(newSKU, { status: 201 });
}
