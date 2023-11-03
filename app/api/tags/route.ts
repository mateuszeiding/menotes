import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { ITagDto } from '@/Models/TagDto';
import { TagCreateDto } from '@/Models/TagCreateDto';

export async function POST(req: Request) {
    try {
        const reqData: TagCreateDto = await req.json();
        const prisma = new PrismaClient();

        const response = await prisma.tag.create({
            data: {
                name: reqData.name,
                color_hex: reqData.color_hex,
            },
        });
        return NextResponse.json(response);
    } catch (e) {
        return NextResponse.json(e);
    }
}

export async function GET(): Promise<NextResponse<ITagDto[] | unknown>> {
    const prisma = new PrismaClient();
    const response = await prisma.tag.findMany();
    return NextResponse.json(response);
}
