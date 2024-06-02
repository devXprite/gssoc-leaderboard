import Badges from '@/data/badges';
import getUserPr from '@/utils/getUserPr';
import { FaTrophy } from 'react-icons/fa';
import { FaCodePullRequest } from 'react-icons/fa6';
import { RiGitRepositoryLine } from 'react-icons/ri';

export const generateMetadata = ({ params: { username } }) => {
    return {
        title: `@${username} | Pull Requests`,
    };
};

const page = async ({ params: { username } }) => {
    const { pullRequests, userStats, repositories, updatedAt } = await getUserPr(username);
    // console.log(pullRequests);

    return (
        <>
            <img
                src={`https://github.com/${username}.png`}
                className="mx-auto mb-2 block size-32 rounded-full border-2 border-primary-500 p-1"
            />
            <h3 className="text-center text-2xl font-semibold md:text-3xl">
                <span className="text-center text-primary-500">@{username}</span>'s Stats
            </h3>

            <p className="mt-1 text-center text-xs italic text-gray-400 md:text-base">
                Last updated at{' '}
                {new Date(updatedAt || new Date()).toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'medium',
                    timeStyle: 'short',
                })}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
                {Badges.filter(badge => badge.points <= userStats.totalScore).map((badge, index) => (
                    <img key={index} className="size-12 md:size-16" src={badge.src} />
                ))}
            </div>

            {/* <div className="mx-auto mb-12 mt-4 flex max-w-screen-sm flex-col  gap-6 rounded-md border border-gray-700 bg-gray-800 p-4 md:flex-row md:gap-10">
                <img
                    src={`https://github.com/${username}.png`}
                    className="mx-auto size-36 rounded-full border-2 border-primary-500 p-1 md:mx-0"
                />

                <div>
                    <p className=" font-semibold md:text-lg">Badges:</p>
                    <div className="flex gap-2">
                        {Badges.filter(badge => badge.points <= userStats.totalScore).map((badge, index) => (
                            <img key={index} className="size-12 md:size-16" src={badge.src} />
                        ))}
                    </div>
                    <div className="mt-5 flex gap-4">
                        <p className="flex items-center gap-3 rounded-full bg-white px-4 py-1.5 text-sm text-black md:px-6 md:text-base">
                            <FaTrophy /> <span>{userStats.totalScore}</span>
                        </p>

                        <p className="flex items-center gap-3 rounded-full bg-white px-4 py-1.5 text-sm text-black md:px-6 md:text-base">
                            <FaCodePullRequest /> <span>{userStats.totalPr}</span>
                        </p>
                        <p className="flex items-center gap-3 rounded-full bg-white px-4 py-1.5 text-sm text-black md:px-6 md:text-base">
                            <RiGitRepositoryLine /> <span>{repositories.length}</span>
                        </p>
                    </div>
                </div>
            </div> */}

            <div className="mx-auto mt-8 w-full max-w-screen-xl overflow-x-auto">
                <h4 className="mb-2 text-lg font-medium text-gray-300 md:text-xl">List of PullRequests</h4>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Repository</th>
                            <th>Title</th>
                            <th>Level</th>
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
                                <td>{pr?.level || pr.leval}</td>
                                <td>{pr?.commits?.totalCount}</td>
                                <td>{pr.totalCommentsCount}</td>
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

            <div className="mx-auto mt-6 w-full max-w-screen-xl overflow-x-auto">
                <h4 className="mb-2 text-lg font-medium text-gray-300 md:text-xl">Repositories Wise Stats</h4>
                <table>
                    <thead>
                        <tr>
                            <th rowSpan={2}>No</th>
                            <th rowSpan={2}>Repository</th>
                            <th rowSpan={2}>Total Score</th>
                            <th colSpan={5}>PullRequests</th>
                        </tr>

                        <tr className="">
                            <th className="text-[10px] md:text-sm">Level 1</th>
                            <th className="text-[10px] md:text-sm">Level 2</th>
                            <th className="text-[10px] md:text-sm">Level 3</th>
                            <th className="text-[10px] md:text-sm">Others</th>
                            <th className="text-[10px] md:text-sm">Total</th>
                        </tr>
                    </thead>

                    <tbody>
                        {repositories.map((repo, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>

                                <td className="max-w-72 truncate text-left  text-primary-400 md:max-w-96">
                                    <a href={repo.url} target="_blank">
                                        {repo.name}
                                    </a>
                                </td>
                                <td>{repo.totalScore}</td>
                                <td>{repo.prBreakdown?.level1}</td>
                                <td>{repo.prBreakdown?.level2}</td>
                                <td>{repo.prBreakdown?.level3}</td>
                                <td>{repo.prBreakdown?.others}</td>
                                <td>{repo.prCount}</td>
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
