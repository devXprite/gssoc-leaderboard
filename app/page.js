import LeaderboardTable from '@/components/LeaderboardTable';
import getLeaderBoard from '@/utils/getLeaderBoard';

const page = async () => {
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
