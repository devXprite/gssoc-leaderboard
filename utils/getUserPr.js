import { db } from '@/lib/db';
import { unstable_cache } from 'next/cache';
import genrateUserPr from './genrateUserPr';
import consola from 'consola';

const getUserPr = unstable_cache(
    async username => {
        try {
            const user = await db.user.findUnique({
                where: {
                    username,
                    updatedAt: { gte: new Date(new Date().getTime() - 6 * 60 * 60 * 1000) },
                },
            });

            if (user?.id){
                consola.success('Get User PullRequests from DB');
                return {
                    pullRequests: user.pullRequests,
                    updatedAt: user.updatedAt,
                };
            }

            consola.warn('User not found in the database, fetching from GitHub ...');
            const pullRequests = await genrateUserPr(username);

            consola.info('User PullRequests fetched from github');

            await db.user.upsert({
                where: { username },
                update: { pullRequests: pullRequests },
                create: { username, pullRequests },
            });

            consola.success('User PullRequests save in db');

            return {
                pullRequests,
                updatedAt: new Date(),
            };
        } catch (error) {
            console.log(error);
            return {};
        }
    },
    ['users'],
    {
        tags: ['users'],
        revalidate: 60 * 60 * 2,
    },
);

export default getUserPr;
