"use client";

const RepoWiseTable = ({ repositories }) => {



    return (
        <div className="mx-auto mt-3 w-full max-w-screen-xl overflow-x-auto">
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

                <tbody className="">
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

                    {repositories.length === 0 && (
                        <tr>
                            <td colSpan="8" className="py-8 text-center text-gray-500 md:text-lg">
                                Nothing to show
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <p className="mt-2 w-full text-right text-xs italic text-gray-400 md:text-base">* updates in every 8 hours</p>
        </div>
    );
};

export default RepoWiseTable;
