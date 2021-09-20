import React from "react";
import "./WeatherInfoCard.css";

const WeatherInfoCard = ({ weatherInfo, image }) => {
  return (
    <div className="weather-info-card">
      <img src={image} alt="" className="info-icon" />
      <p className="weather-info">{weatherInfo}</p>
    </div>
  );
};

export default WeatherInfoCard;
