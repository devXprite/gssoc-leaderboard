import ChartInit from '@/components/ChartInit';
import PullRequestsTable from '@/components/tables/PullRequestsTable';
import RepoWiseTable from '@/components/tables/RepoWiseTable';
import getUserPr from '@/utils/getUserPr';
import { FaGithub } from 'react-icons/fa';
import HalfDoughnut from './Doughnut';

const page = async () => {
    const { pullRequests, userStats, repositories, updatedAt } = await getUserPr('thevijayshankersharma');


    // give name and total pull requests of top 6 repo & remaing unsed others
    // const repositoriesChartData = repositories.map

    return (
        <>
            <ChartInit />

            <div className="mx-auto max-w-screen-xl gap-10 md:grid md:grid-cols-[20rem_1fr]">
                <div>
                    <div className="card text-left ">
                        <img
                            src={`https://github.com/devxprite.png`}
                            className="mx-auto size-44 rounded-full border-2 border-primary-500 p-1"
                            alt=""
                        />

                        <h3 className="mt-6 text-2xl font-semibold">@devxprite</h3>
                        {/* <h3 className="-mt-2 text-xl font-semibold text-primary-500">@devxprite</h3> */}

                        <table className="mt-4">
                            <tbody>
                                <tr>
                                    <td className="text-left">Total Points</td>
                                    <td>{userStats.totalScore}</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Total PullRequests</td>
                                    <td>{userStats.totalPr}</td>
                                </tr>

                                {/* <tr>
                                <td className="text-left">Total Issues</td>
                                <td>{userStats.}</td>
                            </tr> */}

                                <tr>
                                    <td className="text-left">Total Repositories </td>
                                    <td>{repositories.length}</td>
                                </tr>
                            </tbody>
                        </table>

                        <button className="btn mt-3 w-full ">
                            <FaGithub />
                            <span>Visit Github</span>
                        </button>
                    </div>
                    <div className="card mt-6 text-center">
                        <h3 className="card-title text-left">Achivements:</h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                            <img src="https://gssoc.girlscript.tech/badges/1.png" className="size-16" />
                            <img src="https://gssoc.girlscript.tech/badges/2.png" className="size-16" />
                            <img src="https://gssoc.girlscript.tech/badges/3.png" className="size-16" />
                            <img src="https://gssoc.girlscript.tech/badges/4.png" className="size-16" />
                        </div>
                    </div>
                </div>

                <div className="mt-8 md:mt-0">
                    <div className="card w-full px-6">
                        <h3 className="card-title">OverView</h3>
                        <div className='grid md:grid-cols-3 gap-6 md:gap-12 mt-6'>
                            <HalfDoughnut
                                data={{
                                    labels: Object.keys(userStats.prBreakdown),
                                    datasets: [
                                        {
                                            label: 'Pull Requests',
                                            data: Object.values(userStats.prBreakdown),
                                        },
                                    ],
                                }}
                                title={'Pull Requests by Level'}
                            />
                            <HalfDoughnut
                                data={{
                                    labels: Object.keys(userStats.scoreBreakdown),
                                    datasets: [
                                        {
                                            label: 'Points',
                                            data: Object.values(userStats.scoreBreakdown),
                                        },
                                    ],
                                }}
                                title={'Points by level'}

                            />{' '}
                            <HalfDoughnut
                                data={{
                                    labels: repositories.map(repo => repo.name),
                                    datasets: [
                                        {
                                            label: 'Pull Requests',
                                            data: repositories.map(repo => repo.prCount),
                                        },
                                    ],
                                }}
                                title={'Pull Requests by Repo'}

                            />
                        </div>
                    </div>

                    <div className="card mt-10 px-6">
                        <h3 className="card-title">My Pull Requests</h3>
                        <PullRequestsTable pullRequests={pullRequests} />
                    </div>

                    <div className="card mt-10 px-6">
                        <h3 className="card-title">Repositories Wise Stae</h3>
                        <RepoWiseTable repositories={repositories} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
