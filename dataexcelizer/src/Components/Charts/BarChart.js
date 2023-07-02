import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

const BarChart = () => {
    const employeeData = useSelector((state) => state.employees.employees);
    const chartRef = useRef(null);

    useEffect(() => {
        Chart.register(...registerables);
        const statusCount = {};
        console.log(employeeData)
        employeeData.forEach((employee) => {
            if (statusCount.hasOwnProperty(employee.employeeStatus)) {
                statusCount[employee.employeeStatus]++;
            } else {
                statusCount[employee.employeeStatus] = 1;
            }
        });
        console.log(statusCount)

        const ctx = chartRef.current.getContext('2d');

        // Destroy any existing chart on the canvas
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }

        // Create a new Chart instance
        chartRef.current.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(statusCount),
                datasets: [
                    {
                        label: 'Employee Count',
                        data: Object.values(statusCount),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Customize the bar color
                        borderWidth: 1
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }, [employeeData]);

    return (
        <div className="w-[50%]">
            <canvas ref={chartRef} id="myChart" />
        </div>
    )
}

export default BarChart
