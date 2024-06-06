import projects from '@/data/projects';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

const page = () => {
    return (
        <div>
            <h2 className="mb-2 text-center text-3xl font-semibold text-primary-500 md:text-4xl">Projects</h2>

            <div className="mx-auto mt-12 grid w-full gap-6 md:max-w-screen-xl md:grid-cols-3 lg:grid-cols-4">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="flex flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-3 shadow-lg shadow-black/50 md:p-4"
                    >
                        <h3 className="truncate font-semibold text-primary-500 md:text-lg">{project.project_name}</h3>
                        <p className="truncate text-sm md:text-base ">
                            by{' '}
                            <a
                                target="_blank"
                                className="text-green-500 hover:underline"
                                href={project['GitHub Profile URL']}
                            >
                                {project.owner_name}
                            </a>{' '}
                        </p>

                        <p className="mb-2 mt-2 line-clamp-4 text-xs text-gray-400 md:text-sm">
                            {project.project_description}
                        </p>

                        <p className="mb-6 flex flex-wrap gap-x-1 gap-y-1.5">
                            {project.technology_used.split(',').map((tech, index) => (
                                <span
                                    key={index}
                                    className="rounded-full border border-primary-500/50 bg-primary-500/20 px-2 py-0.5 text-xs md:text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </p>

                        <a target="_blank" href={project.project_link} className="btn-gradient mt-auto w-full">
                            <FaGithub />
                            <span>View Project</span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default page;
