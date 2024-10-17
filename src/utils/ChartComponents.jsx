import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";

const BarChart = ({ chartData }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && chartData) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart instance to prevent memory leaks or issues
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create the new chart instance
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: chartData.map((data,index) => `Test ${index+1}`), // Use titles from data as labels
          datasets: [
            {
              label: "Your Scores",
              data: chartData.map((data) => data.score),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 3,
            },
            {
              label: "Total Marks",
              data: chartData.map((data) => data.totalMarks),
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              borderColor: "rgba(153, 102, 255, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          onClick: (e) => {
            const canvasPosition = getRelativePosition(e, chartInstance.current);

            const dataX = chartInstance.current.scales.x.getValueForPixel(
              canvasPosition.x
            );
            const dataY = chartInstance.current.scales.y.getValueForPixel(
              canvasPosition.y
            );

            console.log("Clicked Position:", { dataX, dataY });
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [chartData]);

  return <canvas className="w-full h-[100vh] aspect-square " ref={chartRef} />;
};

export default BarChart;
