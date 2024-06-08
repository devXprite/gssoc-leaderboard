import githubClient from '@/lib/githubClient';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    headers();

    const { rateLimit } = await githubClient({
        query: `
        query {
            rateLimit{
                remaining
                limit
                used
                resetAt
            }
        }
        `,
    });

    rateLimit.resetAt = new Date(rateLimit.resetAt).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        dateStyle: 'full',
        timeStyle: 'long',
    });

    return NextResponse.json(rateLimit);
}
