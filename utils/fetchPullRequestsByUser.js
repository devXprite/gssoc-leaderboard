const fetchPullRequestsByUser = async username => {
    const query = `
    query ($queryString: String!, $endCursor: String) {
        search(query: $queryString, type: ISSUE, first: 100, after: $endCursor) {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            node {
              ... on PullRequest {
                titleHTML
                url
                mergedAt
                totalCommentsCount
                repository {
                  name
                }
                author {
                  login
                  avatarUrl
                  url
                }
                labels(first: 10) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
        endCursor: endCursor,
        queryString: `author:${username} is:pr is:merged closed:2024-05-10..2024-08-10 label:gssoc`,
    };

    try {
        consola.info('Trying to fetch pull requests for', username);

        const response = await githubClient({
            query,
            variables,
        });

        const pullRequests = response.search;
        return pullRequests;
    } catch (error) {
        console.error('Error fetching pull requests', error);
        return [];
    }
};
