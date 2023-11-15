import { NextResponse } from 'next/server';

import { ITagDto } from '@/Models/TagDto';
import { TagCreateDto } from '@/Models/TagCreateDto';
import prisma from '@/prisma/DBClient';

export async function POST(req: Request) {
    try {
        const reqData: TagCreateDto = await req.json();

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
    const response = await prisma.tag.findMany();
    return NextResponse.json(response);
}
