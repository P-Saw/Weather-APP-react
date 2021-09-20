import React from "react";
import "./WeeklyTemperatures.css";

const WeeklyTemperatures = ({ weatherDaily }) => {
  const dateBuilder = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
    const day = days[date.getDay()];
    return day;
  };

  return typeof weatherDaily != "undefined" ? (
    <div className="temperatures">
      <h2>Week</h2>
      <ul className="temp-list">
        {weatherDaily.slice(1).map((elem) => {
          return (
            <li key={elem.dt} className="temp-list-item">
              <span className="week-day">{dateBuilder(elem.dt)}</span>{" "}
              <span className="week-temp">{Math.round(elem.temp.day)}°C</span>{" "}
              <img
                width="40"
                height="40"
                src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}.png`}
                alt=""
                className="week-icon"
              />
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    ""
  );
};

export default WeeklyTemperatures;
