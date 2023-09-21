import { NextResponse } from 'next/server';

import { PrismaClient } from '@prisma/client';

// export async function POST(req: Request, res: NextResponse) {
//     const prisma = new PrismaClient();
//     const response = await prisma.tag.create({
//         data: {
//             name: 'UI',
//             color_hex: '#afd5f4',
//         },
//     });
//     return NextResponse.json(response);
// }

export async function GET() {
    try {
        const prisma = new PrismaClient();
        const response = await prisma.tag.findMany();
        console.log(response);
        return NextResponse.json(response);
    } catch (e) {
        return NextResponse.json(e);
    }
}
