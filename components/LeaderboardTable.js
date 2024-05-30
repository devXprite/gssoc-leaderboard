'use client';

import { Pagination } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGithub, FaList, FaSearch } from 'react-icons/fa';

const RESULT_PER_PAGE = 30;

const LeaderboardTable = ({ leaderboard, updatedAt }) => {
    const [page, setPage] = useState(1);
    const [searchFilter, setSearchFilter] = useState(null);
    const [tableData, setTableData] = useState(() =>
        leaderboard.slice((page - 1) * RESULT_PER_PAGE, page * RESULT_PER_PAGE),
    );

    useEffect(() => {
        const filteredData = leaderboard.filter(user => {
            if (!searchFilter) return true;
            return user.login.toLowerCase().includes(searchFilter.toLowerCase());
        });

        setTableData(filteredData.slice((page - 1) * RESULT_PER_PAGE, page * RESULT_PER_PAGE));
    }, [searchFilter, page]);

    return (
        <div className="mx-auto mt-4 max-w-screen-xl">
            <div className="mb-6 mr-auto  flex w-full max-w-md gap-3">
                <input
                    type="search"
                    className="w-full rounded border  border-gray-600 bg-gray-800 px-3 py-1.5 outline-none focus:border-primary-500 md:text-lg"
                    onChange={e => {
                        setSearchFilter(e.target.value), setPage(1);
                    }}
                    placeholder={`Search in ${leaderboard.length} users`}
                />
                <button className="rounded-md bg-gray-700 px-5">
                    <FaSearch className="text-base md:text-xl" />
                </button>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="overflow-x-auto">
                    <thead className="">
                        <tr>
                            <th rowSpan={2}>Rank</th>
                            <th rowSpan={2}>Avatar</th>
                            <th rowSpan={2}>UserName</th>
                            <th rowSpan={2}>Total Pr</th>
                            <th colSpan={5}>Score</th>
                            <th rowSpan={2}></th>
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
                        {tableData.map(user => (
                            <tr key={user.login}>
                                <td>{user.rank}</td>
                                <td>
                                    <img
                                        className="mx-auto block size-8 rounded-full border border-primary-700 md:size-10"
                                        src={user.avatar_url}
                                    />
                                </td>
                                <td>
                                    <Link
                                        // href={user.url}
                                        // target="_blank"
                                        href={`/user/${user.login}`}
                                        className="flex items-center gap-1 hover:text-primary-500 hover:underline md:gap-4"
                                    >
                                        <FaGithub className=" md:text-xl" />
                                        <span>{user.login}</span>
                                    </Link>
                                </td>
                                <td>{user.totalPr}</td>
                                <td>{user.scoreBreakdown?.level1}</td>
                                <td>{user.scoreBreakdown?.level2}</td>
                                <td>{user.scoreBreakdown?.level3}</td>
                                <td>{user.scoreBreakdown?.others}</td>
                                <td>{user.score}</td>
                                <td>
                                    <Link prefetch={false} href={`/user/${user.login}`}>
                                        <FaList className="mx-auto text-primary-500 md:text-xl" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-6">
                <Pagination
                    color="primary"
                    count={Math.ceil(leaderboard.length / RESULT_PER_PAGE)}
                    onChange={(e, page) => {
                        setPage(page);
                        setSearchFilter(null);
                    }}
                    // showFirstButton
                    // showLastButton
                    // size="large"
                    className="mx-auto w-max md:ml-auto"
                />
            </div>
        </div>
    );
};

export default LeaderboardTable;
