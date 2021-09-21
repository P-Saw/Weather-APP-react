import { useState } from "react";
import DailyTempChart from "./DailyTempChart";
import "./Main.css";

const Main = ({
  weatherStart,
  place,
  weatherCode,
  dayNight,
  weatherHourly,
}) => {
  console.log(weatherCode);
  const [chartOpen, setChartOpen] = useState(false);

  const handleChartOpen = () => setChartOpen(!chartOpen);

  const dateConverter = (timezone) => {
    const d = new Date();
    const localtime = d.getTime();
    const localOffset = d.getTimezoneOffset() * 60000;
    const utc = localtime + localOffset;
    const newDate = utc + 1000 * timezone;
    const convertedDate = new Date(newDate);
    return convertedDate;
  };

  const dateBuilder = (timezone) => {
    let convertedDate = dateConverter(timezone);
    if (timezone > 50000) {
      convertedDate = new Date(timezone * 1000);
    }
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wendesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const day = days[convertedDate.getDay()];
    const date = convertedDate.getDate();
    const month = months[convertedDate.getMonth()];

    return `${day} ${date} ${month}`;
  };

  const hourBuilder = (timezone) => {
    const convertedDate = dateConverter(timezone);

    const hour = convertedDate.getHours();
    let minutes = convertedDate.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return `${hour}:${minutes}`;
  };

  const hourLocal = () => {
    const date = new Date();

    const hour = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    return `${hour}:${minutes}`;
  };

  const weatherBg = (code, day) => {
    switch (true) {
      case code <= 232:
        return "storm";
      case code >= 300 && code <= 531:
        return "rain";
      case code >= 600 && code <= 622:
        return "snow";
      case code >= 701 && code <= 781:
        return "mist";
      case code >= 801:
        return "clouds";
      case code === 800 && day === "01n":
        return "clear-night";
      default:
        return "clear";
    }
  };
  return (
    <div className={`main-bg-app ${weatherBg(weatherCode, dayNight)}`}>
      {typeof weatherStart.current != "undefined" ? (
        <>
          <div className="place-name">
            <h1 className="town">
              {place.city ? place.city : "Welcome to Weather APP"}
            </h1>
            <h3 className="country">
              {place.countryName
                ? place.countryName
                : "Enable localization or search by city"}
            </h3>
          </div>
          <div className="place-info">
            <div className="place-date">
              <p className="hour">
                {weatherStart.dt ? hourBuilder(weatherStart.dt) : hourLocal()}
              </p>
              <p className="day">{dateBuilder(weatherStart.current.dt)}</p>
            </div>
            <div className="place-temperature">
              <div className="temperature">
                {Math.round(weatherStart.current.temp)}°C
              </div>
            </div>
          </div>
          <div className={`slide-wrapper ${chartOpen ? "open" : ""}`}>
            <div className="slide-chart" onClick={handleChartOpen}>
              <p className="slide-text">DAILY</p>
              <p className="slide-text">CHART</p>
              <span>&#8594;</span>
            </div>
          </div>
          <DailyTempChart
            chartOpen={chartOpen}
            handleChartOpen={handleChartOpen}
            weatherHourly={weatherHourly}
          />
        </>
      ) : typeof weatherStart.main != "undefined" ? (
        <>
          <div className="place-name">
            <h1 className="town">{weatherStart.name}</h1>
            <h3 className="country">{weatherStart.sys.country}</h3>
          </div>

          <div className="place-info">
            <div className="place-date">
              <p className="hour">{hourBuilder(weatherStart.timezone)}</p>
              <p className="day">{dateBuilder(weatherStart.timezone)}</p>
            </div>
            <div className="place-temperature">
              <div className="temperature">
                {Math.round(weatherStart.main.temp)}°C
              </div>
            </div>
          </div>
          <div className={`slide-wrapper ${chartOpen ? "open" : ""}`}>
            <div className="slide-chart" onClick={handleChartOpen}>
              <p className="slide-text">DAILY</p>
              <p className="slide-text">CHART</p>
              <span>&#8594;</span>
            </div>
          </div>
          <DailyTempChart
            chartOpen={chartOpen}
            handleChartOpen={handleChartOpen}
            weatherHourly={weatherHourly}
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Main;
