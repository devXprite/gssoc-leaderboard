import PullRequestsTable from '@/components/tables/PullRequestsTable';
import BarChart from '@/components/charts/BarChart';
import RepoWiseTable from '@/components/tables/RepoWiseTable';
import Badges from '@/data/badges';
import getUserPr from '@/utils/getUserPr';
import _, { groupBy } from 'lodash';

export const generateMetadata = ({ params: { username } }) => {
    return {
        title: `@${username} | Pull Requests`,
    };
};

const page = async ({ params: { username } }) => {
    const { pullRequests, userStats, repositories, updatedAt } = await getUserPr(username);

    const prByDay = _.countBy(
        pullRequests
            .sort((a, b) => new Date(a.mergedAt) - new Date(b.mergedAt))
            .map(pr =>
                new Date(pr.mergedAt).toLocaleDateString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    day: '2-digit',
                    month: 'short',
                }),
            ),
    );

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
            <div className="card mx-auto mt-8 max-w-screen-xl md:p-8">
                <h4 className="card-title">List of PullRequests</h4>

                <PullRequestsTable pullRequests={pullRequests} />
            </div>
            <div className="card mx-auto mt-8 max-w-screen-xl md:p-8">
                <h4 className="card-title">Repositories Wise Stats</h4>

                <RepoWiseTable repositories={repositories} />
            </div>
            <div className="card mx-auto mt-8 max-w-screen-xl md:px-8">
                <h2 className="card-title">Activity Graph</h2>
                <BarChart title={'Pull Requests by Day'} labels={Object.keys(prByDay)} values={Object.values(prByDay)} />
            </div>{' '}
        </>
    );
};

export default page;
