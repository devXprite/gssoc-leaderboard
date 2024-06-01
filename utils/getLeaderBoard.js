import { db } from '@/lib/db';
import consola from 'consola';
import { unstable_cache } from 'next/cache';

const getLeaderBoard = unstable_cache(
    async () => {
        try {
            consola.info('Trying to get leaderboard from DB');

            const dbResponse = await db.leaderboard.findUnique({
                where: { year: 2024 },
                select: {
                    updatedAt: true,
                    leaderboard: true,
                    year: true,
                },
            });


            if (dbResponse?.year > 0) {
                consola.success('Leaderboard fetched from DB');
                return dbResponse;
            }

            consola.error('Leaderboard not found in the database.');
            return {};
        } catch (error) {
            consola.error(error);
            return {};
        }
    },
    ['leaderboard'],
    {
        tags: ['leaderboard'],
        revalidate: 60 * 60 * 1,
    },
);

export default getLeaderBoard;
