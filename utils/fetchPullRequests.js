import githubClient from '@/lib/githubClient';
import consola from 'consola';

async function fetchPullRequests({ owner, name, endCursor = null }) {
    // const query = `
    // query($repoOwner: String!, $repoName: String!, $endCursor: String) {
    //     repository(owner: $repoOwner, name: $repoName) {
    //       pullRequests(
    //         first: 100
    //         labels: ["GSSoC"]
    //         orderBy: {field: CREATED_AT, direction: DESC}
    //         states: MERGED
    //         after: $endCursor
    //       ) {
    //         pageInfo {
    //           endCursor
    //           hasNextPage
    //         }
    //         nodes {
    //           url
    //           author {
    //             login
    //             avatarUrl
    //             url
    //           }
    //           labels(first: 10) {
    //             nodes {
    //               name
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // `;

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
        queryString: `repo:${owner}/${name} is:pr is:merged closed:2024-05-10..2024-08-10 label:gssoc`,
    };

    try {
        consola.info('Trying to fetch pull requests for', owner, name);

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
}

export default fetchPullRequests;
