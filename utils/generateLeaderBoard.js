import projects from '@/data/projects';
import fetchPullRequests from './fetchPullRequests';
import levelScoreCard, { allowedLabels } from '@/data/levelScoreCard';
import _, { lowerCase } from 'lodash';

async function generateLeaderBoard() {
    let leaderboardObj = {};

    const processPullRequests = prArray => {
        prArray.edges
            .filter(({ node: pr }) => pr.author?.login)
            .forEach(({ node: pr }) => {
                const username = pr.author.login;
                const prLevel = (pr.labels.nodes.find(label => allowedLabels.includes(label.name))?.name || 'others')
                    .trim()
                    .toLowerCase();

                if (!leaderboardObj[username]) {
                    leaderboardObj[username] = {
                        avatar_url: pr.author.avatarUrl,
                        login: username,
                        url: pr.author.url,
                        score: 0,
                        totalPr: 0,
                        scoreBreakdown: { level1: 0, level2: 0, level3: 0, others: 0 },
                        prBreakdown: { level1: 0, level2: 0, level3: 0, others: 0 },
                    };
                }

                leaderboardObj[username].totalPr += 1;
                leaderboardObj[username].prBreakdown[prLevel] += 1;
                leaderboardObj[username].scoreBreakdown[prLevel] += levelScoreCard[prLevel];
                leaderboardObj[username].score += levelScoreCard[prLevel];
            });
    };

    async function fetchAllPullRequests(project) {
        let hasNextPage = true;
        let endCursor = null;

        const [owner, name] = project.project_link.split('/').slice(3, 5);

        while (hasNextPage) {
            const pullRequests = await fetchPullRequests({ owner, name, endCursor });

            hasNextPage = pullRequests.pageInfo.hasNextPage;
            endCursor = pullRequests.pageInfo.endCursor;

            processPullRequests(pullRequests);
        }
    }

    await Promise.all(projects.map(project => fetchAllPullRequests(project)));

    const leaderBoard = _.orderBy(Object.values(leaderboardObj), ['score'], ['desc']).map((user, i) => ({
        ...user,
        rank: i + 1,
    }));

    return leaderBoard;
}

export default generateLeaderBoard;
