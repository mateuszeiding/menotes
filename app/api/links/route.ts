import { NextResponse } from 'next/server';

import { LinkCreateDto } from '@/Models/LinkCreateDto';
import { ILinkDto } from '@/Models/LinkDto';
import DBClient from '@/prisma/DBClient';

export async function POST(req: Request) {
    const reqData: LinkCreateDto = await req.json();
    const response = await DBClient.instance.link.create({
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

export async function PATCH(req: Request) {
    const reqData: LinkCreateDto = await req.json();
    const response = await DBClient.instance.link.update({
        where: {
            id: reqData.id,
        },
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
    const response = await DBClient.instance.link.findMany({
        include: {
            tags: true,
        },
    });
    return NextResponse.json(response);
}
