import React from "react";
import "./styles/WeatherInfoCard.css";

const WeatherInfoCard = ({ weatherInfo, image }) => {
  return (
    <div className="weather-info-card">
      <img width="60" height="60" src={image} alt="" className="info-icon" />
      <p className="weather-info">{weatherInfo}</p>
    </div>
  );
};

export default WeatherInfoCard;
