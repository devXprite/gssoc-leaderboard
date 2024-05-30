import { db } from '@/lib/db';
import generateLeaderBoard from '@/utils/generateLeaderBoard';
import consola from 'consola';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    headers();

    consola.info('Trying to fetch leaderboard from github');
    const leaderboard = await generateLeaderBoard();

    consola.info('Trying to save leaderboard in db');
    await db.leaderboard.upsert({
        where: { year: 2024 },
        update: { leaderboard },
        create: { year: 2024, leaderboard },
    });

    consola.success('Leaderboard saved in db');

    return NextResponse.json({ leaderboard });
}
