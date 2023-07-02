import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import BarChart from './Charts/BarChart';
import PieChart from './Charts/PieChart';

const ChartComponent = () => {

    return (
        <div className='flex gap-4'>
            <BarChart />
            <PieChart />

        </div>

    );
};

export default ChartComponent;
