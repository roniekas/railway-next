import { NextRequest, NextResponse } from 'next/server';
import dns from 'dns/promises';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkSPF(domain: string) {
    try {
        const txtRecords = await dns.resolveTxt(domain);
        return txtRecords.some(record => record.join('').includes('v=spf1'));
    } catch {
        return false;
    }
}

async function checkDKIM(domain: string, provider: 'google' | 'microsoft') {
    const selector = provider === 'google' ? 'google._domainkey' : 'selector1._domainkey';
    try {
        const dkimRecords = await dns.resolveTxt(`${selector}.${domain}`);
        return dkimRecords.length > 0;
    } catch {
        return false;
    }
}

async function checkDMARC(domain: string) {
    try {
        const dmarcRecords = await dns.resolveTxt(`_dmarc.${domain}`);
        return dmarcRecords.length > 0;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    const { domains } = await request.json();

    const results = await Promise.all(
        domains.map(async (domain: string) => {
            const spf = await checkSPF(domain);
            const dkimGoogle = await checkDKIM(domain, 'google');
            const dkimMicrosoft = await checkDKIM(domain, 'microsoft');
            const dmarc = await checkDMARC(domain);

            const record = await prisma.validation.create({
                data: {
                    domain,
                    spf,
                    dkimGoogle,
                    dkimMicrosoft,
                    dmarc,
                    checkedAt: new Date(),
                },
            });

            return record;
        })
    );

    return NextResponse.json(results);
}
