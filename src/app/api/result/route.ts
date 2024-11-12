import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const { search = '', page = '1', pageSize = '5', spf, dkimGoogle, dkimMicrosoft, dmarc, sortOrder = 'desc' } = Object.fromEntries(new URL(request.url).searchParams);

    const pageNumber = parseInt(page as string, 10);
    const pageSizeNumber = parseInt(pageSize as string, 10);

    const filter: any = {};

    if (search) {
        filter.domain = { contains: search, mode: 'insensitive' };
    }
    if (spf) {
        filter.spf = spf === 'Valid';
    }
    if (dkimGoogle) {
        filter.dkimGoogle = dkimGoogle === 'Valid';
    }
    if (dkimMicrosoft) {
        filter.dkimMicrosoft = dkimMicrosoft === 'Valid';
    }
    if (dmarc) {
        filter.dmarc = dmarc === 'Valid';
    }

    const totalResults = await prisma.validation.count({ where: filter });

    const results = await prisma.validation.findMany({
        where: filter,
        skip: (pageNumber - 1) * pageSizeNumber,
        take: pageSizeNumber,
        orderBy: { checkedAt: sortOrder === 'asc' ? 'asc' : 'desc' },
    });

    return NextResponse.json({
        results,
        totalResults,
        totalPages: Math.ceil(totalResults / pageSizeNumber),
        currentPage: pageNumber,
    });
}
