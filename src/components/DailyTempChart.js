import "./styles/DailyTempChart.css";
import { Line, defaults } from "react-chartjs-2";
import { makeHourArray } from "./makeHourArray.js";

defaults.plugins.legend.display = false;

const DailyTempChart = ({
  chartOpen,
  handleChartOpen,
  weatherHourly,
  hourBuilder,
}) => {
  const TempArray = weatherHourly
    .slice(0, -22)
    .filter((_, i) => i % 2 === 0)
    .map((elem) => {
      return Math.round(elem.temp);
    });
  let hourArray = [];
  if (typeof hourBuilder != "undefined") {
    let wholeHour = parseInt(hourBuilder.substr(0, hourBuilder.indexOf(":")));
    hourArray = makeHourArray(wholeHour);
  }
  return (
    <div className={`chart-container ${chartOpen ? "open" : ""}`}>
      <div className="close" onClick={handleChartOpen}></div>
      <h3 className="chart-heading">Next 24h forecast</h3>
      <Line
        data={{
          labels: typeof hourArray != "undefined" ? hourArray : [],
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
