import _ from 'lodash';
import fetchPullRequestsByUser from './fetchPullRequestsByUser';
import levelScoreCard, { allowedLabels } from '@/data/levelScoreCard';


const genrateUserPr = async username => {
    const repositories = {};
    const pullRequests = [];

    const userStats = {
        login: username,
        totalPr: 0,
        totalScore: 0,
        prBreakdown: {
            level1: 0,
            level2: 0,
            level3: 0,
            others: 0,
        },
        scoreBreakdown: {
            level1: 0,
            level2: 0,
            level3: 0,
            others: 0,
        },
    };

    async function processPullRequests(pr) {
        pr.edges.forEach(edge => pullRequests.push(edge.node));
    }

    async function fetchAllPullRequests() {
        let hasNextPage = true;
        let endCursor = null;

        while (hasNextPage) {
            const pullRequests = await fetchPullRequestsByUser({ username, endCursor });
            await processPullRequests(pullRequests);

            hasNextPage = pullRequests.pageInfo.hasNextPage;
            endCursor = pullRequests.pageInfo.endCursor;
        }
    }

    await fetchAllPullRequests();

    pullRequests.forEach((pr, i) => {
        const repoName = pr.repository.name;
        const prLevel = pr.labels.nodes.find(label => allowedLabels.includes(label.name))?.name || 'others';

        pullRequests[i].level = prLevel;

        userStats.totalPr += 1;
        userStats.prBreakdown[prLevel] += 1;

        userStats.totalScore += levelScoreCard[prLevel];
        userStats.scoreBreakdown[prLevel] += levelScoreCard[prLevel];

        if (!repositories[repoName]) {
            repositories[repoName] = {
                name: repoName,
                url: pr.repository.url,
                prCount: 0,
                totalScore: 0,
                prBreakdown: {
                    level1: 0,
                    level2: 0,
                    level3: 0,
                    others: 0,
                },
            };
        }

        repositories[repoName].prCount += 1;
        repositories[repoName].prBreakdown[prLevel] += 1;

        repositories[repoName].totalScore += levelScoreCard[prLevel];
    });

    return {
        pullRequests,
        userStats,
        repositories: _.orderBy(Object.values(repositories), ['totalScore'], ['desc']),
    };
};

export default genrateUserPr;
