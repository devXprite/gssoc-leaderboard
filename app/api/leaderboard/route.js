import getLeaderBoard from '@/utils/getLeaderBoard';
import { NextResponse } from 'next/server';

export async function GET() {
    const leaderboard = await getLeaderBoard();

    return NextResponse.json(leaderboard);
}
