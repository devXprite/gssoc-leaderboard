import projects from '@/data/projects';
import fetchPullRequests from './fetchPullRequests';

const level_labels = {
    level1: 10,
    level2: 25,
    level3: 45,
};

async function getLeaderBoard() {
    let leaderboard = {};

    async function processPullRequests(pullRequests) {
        pullRequests.edges.forEach(edge => {
            const pr = edge.node;
            const user = pr.author;

            if (!leaderboard[user.login]) {
                leaderboard[user.login] = {
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


                leaderboard[user.login].totalPr++;

                for (const label of pr.labels.nodes) {
                    if (label.name in level_labels) {
                        leaderboard[user.login].scoreBreakdown[label.name] += level_labels[label.name];
                        leaderboard[user.login].score += level_labels[label.name];
                        leaderboard[user.login].prBreakdown[label.name]++;
                        break;
                    }

                    leaderboard[user.login].scoreBreakdown.others += 1;
                    leaderboard[user.login].score += 1;
                    leaderboard[user.login].prBreakdown.others++;
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

    return leaderboard;
}

export default getLeaderBoard;
