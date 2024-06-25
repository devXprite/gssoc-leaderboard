import _ from 'lodash';
import githubClient from './githubClient';

const fetchRepoStats = async (owner, name) => {
    const response = await githubClient({
        query: `{
        repository(owner: "${owner}", name: "${name}") {
            pullRequests(states: [OPEN], first: 0) {
                totalCount
              }
              latestPullRequest: pullRequests(states: [MERGED], first: 1) {
                nodes {
                  title
                  mergedAt
                }
              }
              issues(states: [OPEN], first: 0) {
                totalCount
              }
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 1) {
                      totalCount
                      nodes {
                        committedDate
                        message
                      }
                    }
                  }
                }
              }
            }
            rateLimit {
              cost
            }
          }
        `,
        variables: '',
    });

    if (!response.repository) return null;

    const projectData = {};

    projectData.totalPullRequests = response.repository.pullRequests.totalCount;
    projectData.totalIssues = response.repository.issues.totalCount;
    projectData.totalCommits = _.get(response, 'repository.defaultBranchRef.target.history.totalCount', 0);
    projectData.latestCommit = _.get(response, 'repository.defaultBranchRef.target.history.nodes[0]', null);
    projectData.latestPullRequest = _.get(response, 'repository.latestPullRequest.nodes[0]', null);

    // projectData.latestCommit.committedDate = new Date(projectData.latestCommit.committedDate).toLocaleString('en-IN', {
    //     timeZone: 'Asia/Kolkata',
    //     dateStyle: 'full',
    //     timeStyle: 'long',
    // });

    // projectData.latestPullRequest.mergedAt = new Date(projectData.latestPullRequest.mergedAt).toLocaleString('en-IN', {
    //     timeZone: 'Asia/Kolkata',
    //     dateStyle: 'full',
    //     timeStyle: 'long',
    // });

    return projectData;
};

export default fetchRepoStats;
