'use client';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    RadialLinearScale,
    Filler,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Colors,
    CategoryScale,
} from 'chart.js';

ChartJS.register(
    ArcElement,
    LineElement,
    CategoryScale,
    PointElement,
    BarElement,
    LinearScale,
    RadialLinearScale,
    Filler,
    Tooltip,
    Legend,
    Title,
    Colors,
);

ChartJS.defaults.plugins.colors.enabled = false;

ChartJS.defaults.plugins.title.display = true;
ChartJS.defaults.plugins.legend.position = 'bottom';
// ChartJS.defaults.borderColor = '#000000';
ChartJS.defaults.scale.grid.color = 'rgba(256, 256, 256, 0.07)';


const ChartInit = () => {
    return <div></div>;
};

export default ChartInit;
