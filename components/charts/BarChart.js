'use client';

import { Bar, Line } from 'react-chartjs-2';

const graphConfig = {
    hoverBackgroundColor: 'rgba(249, 115, 22, 0.8)',
    borderColor: 'rgba(249, 115, 22, 0.9)',
    borderWidth: 2,
    label: 'Pull Requests',
    tension: 0.4,
    fill: true,
    backgroundColor: context => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 250);
        gradient.addColorStop(0, 'rgba(249, 115, 22, 0.5)');
        gradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
        return gradient;
    },
};

const graphOptions = {
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false,
    },
};

const BarChart = ({ labels, values }) => {
    return (
        <div className="w-full overflow-x-auto">
            <div className="h-80 min-w-[42rem]">
                <Line
                    options={{
                        ...graphOptions,
                    }}
                    data={{
                        labels,
                        datasets: [
                            {
                                data: values,
                                ...graphConfig,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default BarChart;
