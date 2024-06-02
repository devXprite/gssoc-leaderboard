import githubClient from '@/lib/githubClient';
import consola from 'consola';

const fetchUserInfo = async username => {
    const query = `
    query ($username: String!) {
        user(login: $username) {
          login
          name
          bio
          avatarUrl
          url
          followers {
            totalCount
          }
          following {
            totalCount
          }
          repositories {
            totalCount
          }
          starredRepositories {
            totalCount
          }
          pullRequests {
            totalCount
          }
          issues {
            totalCount
          }
          gists {
            totalCount
          }
          organizations {
            totalCount
          }
        }        
    }
    `;

    const variables = { username };

    try {
        consola.info('Trying to fetch User Info for user:', username);
        const response = await githubClient({
            query,
            variables,
        });

        const pullRequests = response.search;
        consola.success('Successfully fetched User Info for user:', username);

        return pullRequests;
    } catch (error) {
        console.error('Error fetching User Info', error);
        return [];
    }
};

export default fetchUserInfo;
