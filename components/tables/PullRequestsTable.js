import ChartInit from '../ChartInit';

const PullRequestsTable = ({ pullRequests }) => {
    return (
        <>
            <ChartInit />
            <div className="relative mx-auto mt-3  w-full max-w-screen-xl overflow-x-auto">
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
                                <td className="max-w-32 truncate text-left text-primary-400 md:max-w-40">{pr.repository.name}</td>
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

                        {pullRequests.length === 0 && (
                            <tr>
                                <td colSpan="8" className="py-8 text-center text-gray-500 md:text-lg">
                                    Nothing to show
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <p className="mt-2 w-full text-right text-xs italic text-gray-400 md:text-base">* updates in every 2 hours</p>

                {/* <div className="absolute bottom-0 left-0 flex h-24 w-full items-center justify-center bg-gradient-to-b from-gray-800/30 to-gray-800 ">
                <button className="btn">Show More</button>
            </div> */}
            </div>
        </>
    );
};

export default PullRequestsTable;
