import React from "react";
import "./WeatherIcon.css";
import clear_icon from "../assets/Clear-icon.png";
import clouds_icon from "../assets/Clouds-icon.png";
import storm_icon from "../assets/Storm-icon.png";
import rain_icon from "../assets/Rain-icon.png";
import snow_icon from "../assets/Snow-icon.png";
import mist_icon from "../assets/Mist-icon.png";
import clear_night_icon from "../assets/Night-icon.png";

const WeatherIcon = ({ weatherDescription, weatherCode, dayNight }) => {
  const weatherIcon = (code, day) => {
    switch (true) {
      case code <= 232:
        return storm_icon;
      case code >= 300 && code <= 531:
        return rain_icon;
      case code >= 600 && code <= 622:
        return snow_icon;
      case code >= 701 && code <= 781:
        return mist_icon;
      case code >= 801:
        return clouds_icon;
      case code === 800 && day === "01n":
        return clear_night_icon;
      default:
        return clear_icon;
    }
  };

  return (
    <div className="weather-img">
      <img
        src={weatherIcon(weatherCode, dayNight)}
        alt=""
        className="weather-icon"
      />
      <p className="weather-description">{weatherDescription}</p>
    </div>
  );
};

export default WeatherIcon;
