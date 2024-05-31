import LeaderboardTable from '@/components/LeaderboardTable';
import { db } from '@/lib/db';
import generateLeaderBoard from '@/utils/generateLeaderBoard';
import consola from 'consola';
import { headers } from 'next/headers';

const getLeaderBoard = async () => {
    const dbResponse = await db.leaderboard.findUnique({
        where: {
            year: 2024,
            // updatedAt: { gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000) },
        },
        select: {
            updatedAt: true,
            leaderboard: true,
        },
    });

    if (dbResponse) {
        consola.success('Successfully fetched leaderboard from db');
        return dbResponse;
    }

    consola.warn('Leaderboard not found in the database, fetching from GitHub ...');
    const leaderboard = await generateLeaderBoard();
    consola.info('Leaderboard fetched from github');

    await db.leaderboard.upsert({
        where: { year: 2024 },
        update: { leaderboard },
        create: { year: 2024, leaderboard },
    });

    consola.success('Leaderboard saved in db');

    return { leaderboard };
};

const page = async () => {
    headers();
    const { leaderboard, updatedAt } = await getLeaderBoard();

    return (
        <>
            <h2 className="mb-2 text-center text-3xl font-semibold text-primary-500 md:text-4xl">GSSoC LeaderBoard</h2>

            <p className="mb-10 text-center text-xs italic text-gray-400 md:text-base">
                Last updated at{' '}
                <span>
                    {new Date(updatedAt || new Date()).toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        dateStyle: 'medium',
                        timeStyle: 'short',
                    })}
                </span>
            </p>

            <LeaderboardTable leaderboard={leaderboard} updatedAt={updatedAt} />
        </>
    );
};

export default page;
