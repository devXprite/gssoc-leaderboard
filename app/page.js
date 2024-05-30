import LeaderboardTable from '@/components/LeaderboardTable';
import leaderboardArray from '@/leaderboardArr';
import getLeaderBoard from '@/utils/getLeaderBoard';
import fs from 'fs';

const page = async ({ searchParams: { page = 1 } }) => {
    const leaderboardObj = await getLeaderBoard();
    const leaderboardArray = Object.values(leaderboardObj)
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 }));

    // fs.writeFileSync('leaderboardArr.js', `export default ${JSON.stringify(leaderboardArray)}`);

    return (
        <div className="min-h-screen px-3 py-14">
            <h2 className="mb-14 text-center text-3xl font-semibold text-primary-500 md:text-4xl">GSSoC LeaderBoard</h2>

            <LeaderboardTable leaderboardArray={leaderboardArray} />
        </div>
    );
};

export default page;
