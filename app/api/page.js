import { headers } from 'next/headers';

const page = () => {
    const headersList = headers();
    const host = headersList.get('host');

    return (
        <div>
            <h2 className="page-title">API</h2>

            <div className="mx-auto max-w-screen-lg">
                <h3 className="text-xl font-semibold text-white md:text-2xl">LeaderBoard:</h3>
                <p className="mt-2 flex items-center gap-2 pl-4 text-sm md:text-xl">
                    <span className="rounded-md bg-green-400 px-2 py-0.5 text-sm text-black">GET</span>
                    <a href="/api/leaderboard" className="text-cyan-400 underline">
                        /api/leaderboard
                    </a>
                </p>

                <h3 className="mt-5 text-xl font-semibold text-white md:text-2xl">User:</h3>
                <p className="mt-2 flex items-center gap-2 pl-4 text-sm md:text-xl">
                    <span className="rounded-md bg-green-400 px-2 py-0.5 text-sm text-black">GET</span>
                    <a href="/api/user/hemu21" className="text-cyan-400 underline">
                        /api/user/[username]
                    </a>
                </p>
            </div>
        </div>
    );
};

export default page;
