import projects from '@/data/projects';
import fetchPullRequests from './fetchPullRequests';

const level_labels = {
    level1: 10,
    level2: 25,
    level3: 45,
};

async function generateLeaderBoard() {
    let leaderboardObj = {};

    async function processPullRequests(pullRequests) {
        pullRequests.edges.forEach(edge => {
            const pr = edge.node;
            const user = pr.author;

            if (!leaderboardObj[user.login]) {
                leaderboardObj[user.login] = {
                    avatar_url: user.avatarUrl,
                    login: user.login,
                    url: user.url,
                    score: 0,
                    totalPr: 0,
                    scoreBreakdown: {
                        level1: 0,
                        level2: 0,
                        level3: 0,
                        others: 0,
                    },
                    prBreakdown: {
                        level1: 0,
                        level2: 0,
                        level3: 0,
                        others: 0,
                    },
                };
            }

            leaderboardObj[user.login].totalPr++;

            for (const label of pr.labels.nodes) {
                if (label.name in level_labels) {
                    leaderboardObj[user.login].scoreBreakdown[label.name] += level_labels[label.name];
                    leaderboardObj[user.login].score += level_labels[label.name];
                    leaderboardObj[user.login].prBreakdown[label.name]++;
                    break;
                }

                leaderboardObj[user.login].scoreBreakdown.others += 1;
                leaderboardObj[user.login].score += 1;
                leaderboardObj[user.login].prBreakdown.others++;
            }
        });
    }

    async function fetchAllPullRequests(project) {
        let hasNextPage = true;
        let endCursor = null;

        const [owner, name] = project.project_link.split('/').slice(3, 5);

        while (hasNextPage) {
            const pullRequests = await fetchPullRequests({ owner, name, endCursor });
            await processPullRequests(pullRequests);

            hasNextPage = pullRequests.pageInfo.hasNextPage;
            endCursor = pullRequests.pageInfo.endCursor;
        }
    }

    const projectTasks = projects.map(project => fetchAllPullRequests(project));
    await Promise.all(projectTasks);

    const leaderBoard = Object.values(leaderboardObj)
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 }));

    return leaderBoard;
}

export default generateLeaderBoard;
