import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
    try {
        const pogs = await prisma.pogs.findMany()
        return NextResponse.json(pogs)
    } catch (error) {
        console.error('Error fetching pogs:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { name, ticker_symbol, price, color } = await request.json()

        const newPog = await prisma.pogs.create({
            data: {
                name,
                ticker_symbol,
                price: Number(price),
                color,
            },
        })

        return NextResponse.json(newPog)
    } catch (error) {
        console.error('Error creating pog:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

export async function PUT(request: Request) {
    try {
        const { id, name, ticker_symbol, price, color } = await request.json()

        const updatedPog = await prisma.pogs.update({
            where: { id },
            data: {
                name,
                ticker_symbol,
                price: Number(price),
                color,
            },
        })

        return NextResponse.json(updatedPog)
    } catch (error) {
        console.error('Error updating pog:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const { id } = await request.json()

        const deletedPog = await prisma.pogs.delete({
            where: { id },
        })

        return NextResponse.json(deletedPog)
    } catch (error) {
        console.error('Error deleting pog:', error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
    }
}