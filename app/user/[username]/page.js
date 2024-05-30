// import pullRequests from '@/pullRequests';
import { db } from '@/lib/db';
import genrateUserPr from '@/utils/genrateUserPr';
import consola from 'consola';
import { headers } from 'next/headers';
import { RiGitRepositoryLine } from 'react-icons/ri';

const allowedLabels = ['level1', 'level2', 'level3'];

export const generateMetadata = ({ params: { username } }) => {
    return {
        title: `@${username} | Pull Requests`,
    };
};

const getUserPr = async username => {
    try {
        const user = await db.user.findUnique({
            where: {
                username,
                updatedAt: { gte: new Date(new Date().getTime() - 8 * 60 * 60 * 1000) },
            },
        });

        if (user) {
            consola.success('Get PullRequests from DB');
            return {
                pullRequests: user.pullRequests,
                updatedAt: user.updatedAt,
            };
        }

        consola.warn('User not found in the database, fetching from GitHub ...');
        const pullRequests = await genrateUserPr(username);

        consola.info('PullRequests fetched from github');

        await db.user.upsert({
            where: { username },
            update: { pullRequests: pullRequests },
            create: { username, pullRequests },
        });

        consola.success('PullRequests save in db');

        return { pullRequests };
    } catch (error) {
        console.log(error);
        return {};
    }
};

const page = async ({ params: { username } }) => {
    headers();
    const { pullRequests, updatedAt } = await getUserPr(username);

    return (
        <>
            <h3 className="mb-2 mt-6 text-center text-3xl font-semibold">
                Pull Requests by <span className="text-center text-primary-500">@{username}</span>{' '}
            </h3>

            <p className="mb-8 text-center">
                Last updated at{' '}
                {new Date(updatedAt || new Date()).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'medium',
                    timeStyle: 'short',
                })}
            </p>

            <div className="mx-auto mt-4 w-full max-w-screen-xl overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Repository</th>
                            <th>Title</th>
                            <th>Leval</th>
                            <th>Commits</th>
                            <th>Comments</th>
                            <th>Merged At</th>
                            <th>Related Issues</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pullRequests.map((pr, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="max-w-32 truncate text-left text-primary-400 md:max-w-40">
                                    {pr.repository.name}
                                </td>
                                <td className="max-w-72 truncate text-left md:max-w-96">
                                    <a href={pr.url} target="_blank">
                                        {pr.titleHTML}
                                    </a>
                                </td>
                                <td>
                                    {pr.labels.nodes
                                        .filter(label => allowedLabels.includes(label.name))
                                        .map((label, index) => (
                                            <span key={index} className="label">
                                                {label.name}
                                            </span>
                                        ))}
                                </td>
                                <td>{pr?.commits?.totalCount}</td>
                                <td>{pr.totalCommentsCount}</td>
                                {/* <td>{pr?.changedFiles}</td> */}
                                <td className="whitespace-nowrap">
                                    {new Date(pr.mergedAt).toLocaleDateString('en-IN', {
                                        // dateStyle: 'medium',
                                        day: '2-digit',
                                        month: 'short',
                                        year: '2-digit',
                                    })}
                                </td>
                                <td>
                                    {pr.closingIssuesReferences.nodes.map((issue, index) => (
                                        <a key={index} target="_blank" href={issue.url} className="text-green-500">
                                            #{issue.number}
                                        </a>
                                    ))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className="mt-2 w-full text-right text-xs italic text-gray-400 md:text-base">
                    * updates in every 8 hours
                </p>
            </div>
        </>
    );
};

export default page;
