import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';
import { LinkCreateDto } from '@/Models/LinkCreateDto';
import { ILinkDto } from '@/Models/LinkDto';

export async function POST(req: Request) {
    const reqData: LinkCreateDto = await req.json();
    const prisma = new PrismaClient();
    const response = await prisma.link.create({
        data: {
            name: reqData.name,
            href: reqData.href,
            tags: {
                connect: reqData.tagIds.map((tagId) => ({
                    id: tagId,
                })),
            },
        },
    });

    return NextResponse.json(response);
}

export async function GET(): Promise<NextResponse<ILinkDto[] | unknown>> {
    const prisma = new PrismaClient();
    const response = await prisma.link.findMany({
        include: {
            tags: true,
        },
    });
    return NextResponse.json(response);
}
