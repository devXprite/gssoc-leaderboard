'use client';

import { Doughnut } from 'react-chartjs-2';

const HalfDoughnut = ({ data, title }) => {

    return (
        <div className="mx-auto">
            <Doughnut
                data={data}
                options={{
                    // circumference: 180,
                    // rotation: -90,
                    // maintainAspectRatio: false,
                    // borderColor: "#000000",

                    plugins: {
                        legend: {
                            display: false ,
                            position: 'bottom',
                        },

                        title: {
                            text: title,
                            color: '#ccc',
                            align: 'center',
                            position: 'bottom',
                            font: {
                                size: 16,
                                weight: 'bold',
                            },
                        },
                        // subtitle: {
                        //     text: '',
                        // },
                    },
                }}
            />
        </div>
    );
};

export default HalfDoughnut;
