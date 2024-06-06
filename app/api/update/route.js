import { db } from '@/lib/db';
import generateLeaderBoard from '@/utils/generateLeaderBoard';
import axios from 'axios';
import consola from 'consola';
import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req, ctx) {
    headers();

    const key = req.nextUrl.searchParams.get("key")
    if (key !== process.env.UPDATE_KEY) return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    


    consola.info('Trying to fetch leaderboard from github');
    const leaderboard = await generateLeaderBoard();

    consola.info('Trying to save leaderboard in db');
    await db.leaderboard.upsert({
        where: { year: 2024 },
        update: { leaderboard },
        create: { year: 2024, leaderboard },
    });

    consola.success('Leaderboard saved in db');

    revalidatePath('/', 'layout');
    revalidateTag('users');
    await axios.get('https://gssoc-leaderboard.vercel.app/api/revalidate')

    return NextResponse.json({ ok: true });
}
