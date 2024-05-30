import fetchPullRequestsByUser from "./fetchPullRequestsByUser";


const genrateUserPr = async username => {
    const prArray = [];

    async function processPullRequests(pullRequests) {
        pullRequests.edges.forEach(edge => prArray.push(edge.node));
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

    return prArray;
};

export default genrateUserPr;
