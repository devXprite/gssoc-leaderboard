import projects from '@/data/projects.js';
import fetchRepoStats from '@/lib/fetchRepoStats';
import _ from 'lodash';
import { unstable_cache } from 'next/cache';

const getProjectsStats = unstable_cache(
    async () => {
        try {
            const projectListWithStats = await Promise.all(
                _.uniqBy(projects, 'project_link').map(async project => {
                    const [owner, name] = project.project_link.split('/').slice(3, 5);
                    const stats = await fetchRepoStats(owner, name);

                    return { ...project, stats };
                }),
            ).then(projects =>
                _.orderBy(
                    projects.filter(project => project.stats),
                    ['stats.latestCommit.committedDate'],
                    ['desc'],
                ),
            );

            return {
                projects: projectListWithStats,
                updatedAt: new Date().toLocaleString('en-IN', {
                    timeZone: 'Asia/Kolkata',
                    dateStyle: 'full',
                    timeStyle: 'full',
                }),
            };
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    ['projects'],
    {
        tags: ['projects'],
        revalidate: 60 * 60 * 1,
    },
);

export default getProjectsStats;
