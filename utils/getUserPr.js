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
                    updatedAt: { gte: new Date(new Date().getTime() - 1 * 60 * 60 * 1000) },
                },
            });

            if (user?.id) {
                consola.success('Get User PullRequests from DB');
                return user;
            }

            consola.warn('User not found in the database, fetching from GitHub ...');
            const pullRequestsInfo = await genrateUserPr(username);

            consola.info('User PullRequests fetched from github');

            await db.user.upsert({
                where: { username },
                update: { ...pullRequestsInfo },
                create: { username, ...pullRequestsInfo },
            });

            consola.success('User PullRequests save in db');

            return {
                ...pullRequestsInfo,
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
        revalidate: 60 * 60 * 1,
    },
);

export default getUserPr;
