import React from "react";
import "./DailyTempChart.css";
import { Line, defaults } from "react-chartjs-2";

defaults.plugins.legend.display = false;

const DailyTempChart = ({ chartOpen, handleChartOpen, weatherHourly }) => {
  const TempArray = weatherHourly
    .slice(0, -24)
    .filter((_, i) => i % 2 == 0)
    .map((elem) => {
      return Math.round(elem.temp);
    });

  console.log(TempArray);
  return (
    <div className={`chart-container ${chartOpen ? "open" : ""}`}>
      <div className="close" onClick={handleChartOpen}></div>
      <Line
        data={{
          labels: [
            "00:00",
            "02:00",
            "04:00",
            "06:00",
            "08:00",
            "10:00",
            "12:00",
            "14:00",
            "16:00",
            "18:00",
            "20:00",
            "22:00",
          ],
          datasets: [
            {
              label: "",
              data: TempArray,
              backgroundColor: "rgba(255, 255, 0, 0.2)",
              borderColor: "rgba(255, 189, 0, 0.5)",
              fill: true,
              tension: 0.3,
              pointRadius: 3,
              pointBackgroundColor: "rgba(255, 189, 0, 0.8)",
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            y: {
              title: {
                display: true,
                align: "end",
                text: "°C",
                font: {
                  size: 15,
                },
              },
            },
          },
        }}
        className="chart"
      />
    </div>
  );
};

export default DailyTempChart;
