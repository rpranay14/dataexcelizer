import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';

const PieChart = () => {
    const employeeData = useSelector((state) => state.employees.employees);
    const chartRef = useRef(null);
    useEffect(() => {
        Chart.register(...registerables);
        const skillsCount = {};
        employeeData.forEach((employee) => {
            const skills = employee.skills.split(','); // Split the comma-separated string into an array of skills
            skills.forEach((skill) => {
                const trimmedSkill = skill.trim(); // Remove any leading/trailing whitespaces from the skill
                if (trimmedSkill) {
                    if (skillsCount.hasOwnProperty(trimmedSkill)) {
                        skillsCount[trimmedSkill]++;
                    } else {
                        skillsCount[trimmedSkill] = 1;
                    }
                }
            });
        });
        const ctx = chartRef.current.getContext('2d');
        if (chartRef.current.chart) {
            chartRef.current.chart.destroy();
        }
        chartRef.current.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(skillsCount),
                datasets: [
                    {
                        label: 'Employee Skills Distribution',
                        data: Object.values(skillsCount),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                        borderWidth: 1,
                    },
                ],
            },
        });

    }, [employeeData]);
    return (
        <div>
            <canvas ref={chartRef} id="myChart" />
        </div>
    )
}

export default PieChart
