import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';

const ChartComponent = () => {

    return (
        <div className='mt-20 mb-10'>
            <p className="mb-2 text-2xl font-semibold">Data Analysis</p>
            <div className="flex flex-col lg:flex-row gap-10 ">
                <BarChart />
                <PieChart />
            </div>
        </div>
    );
};

export default ChartComponent;
