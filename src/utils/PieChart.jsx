import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export const PieChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartData) {
      const ctx = chartRef.current.getContext("2d");

       if (chartInstance.current) {
        chartInstance.current.destroy();
      }

       chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Present", "Absent"],
          datasets: [
            {
              label: "Attendance",
              data: [chartData.present, chartData.absent],
              backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas ref={chartRef} className="w-full  " />;
};
