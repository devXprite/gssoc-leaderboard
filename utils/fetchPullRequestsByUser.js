import githubClient from "@/lib/githubClient";
import consola from "consola";

const fetchPullRequestsByUser = async ({username, endCursor = null}) => {
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
                createdAt
                totalCommentsCount
                changedFiles
                commits(first:1){
                  totalCount
                }
                repository {
                  name
                  url
                }
                closingIssuesReferences(first: 1) {
                  nodes {
                    url
                    number
                  }
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
        consola.info('Trying to fetch pull requests for user:', username);
        const response = await githubClient({
            query,
            variables,
        });

        const pullRequests = response.search;
        consola.success('Successfully fetched pull requests for user:', username);

        return pullRequests;
    } catch (error) {
        console.error('Error fetching pull requests', error);
        return [];
    }
};


export default fetchPullRequestsByUser;