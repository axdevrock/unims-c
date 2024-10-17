import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

const CustomBarChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartData) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance to avoid memory leaks
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create the new chart instance
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.map((data, index) => `Assignment ${index + 1}`), // Generate labels dynamically
          datasets: [
            {
              label: "Student Marks",
              data: chartData.map((data) =>
                data.studentSubmission ? parseInt(data.studentSubmission.marks) : 0
              ),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 2,
            }, 
          ],
        },
        options: {
          responsive: true,
          onClick: (e) => {
            const canvasPosition = getRelativePosition(e, chartInstance.current);

            const dataX = chartInstance.current.scales.x.getValueForPixel(canvasPosition.x);
            const dataY = chartInstance.current.scales.y.getValueForPixel(canvasPosition.y);

            // console.log("Clicked Position:", { dataX, dataY });
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100, // Assuming max score is 100 for assignments
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                },
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas ref={chartRef} className="w-full h-[50vh] bg-gray-100 rounded-md" />;
};

export default CustomBarChart;
