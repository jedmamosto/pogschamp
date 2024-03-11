import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id;

    const pog = await prisma.pogs.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json(pog, { status: 200 });
  } catch (error) {
    console.error('Error fetching pog:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
