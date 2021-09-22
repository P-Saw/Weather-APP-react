import "./styles/Side.css";
import WeeklyTemperatures from "./WeeklyTemperatures";
import wind_icon from "../assets/wind-icon.jpg";
import cloud_icon from "../assets/clouds-icon.jpg";
import humidity_icon from "../assets/humidity-icon.jpg";
import pressure_icon from "../assets/pressure-icon.svg";
import WeatherInfoCard from "./WeatherInfoCard";
import WeatherIcon from "./WeatherIcon";

const Side = ({ weatherStart, weatherDaily, weatherCode, dayNight }) => {
  return (
    <div className="side-app">
      {typeof weatherStart.current != "undefined" ? (
        <>
          <WeatherIcon
            weatherDescription={weatherStart.current.weather[0].description}
            weatherCode={weatherCode}
            dayNight={dayNight}
          />
          <div className="weather-info-container">
            <WeatherInfoCard
              weatherInfo={`${Math.round(weatherStart.current.wind_speed)}m/s`}
              image={wind_icon}
            />
            <WeatherInfoCard
              weatherInfo={`${weatherStart.current.humidity}%`}
              image={humidity_icon}
            />
            <WeatherInfoCard
              weatherInfo={`${weatherStart.current.clouds}%`}
              image={cloud_icon}
            />
            <WeatherInfoCard
              weatherInfo={`${weatherStart.current.pressure}hPa`}
              image={pressure_icon}
            />
          </div>
          <WeeklyTemperatures weatherDaily={weatherDaily} />
        </>
      ) : typeof weatherStart.main != "undefined" ? (
        <>
          <WeatherIcon
            weatherDescription={weatherStart.weather[0].description}
            weatherCode={weatherCode}
            dayNight={dayNight}
          />
          <div className="weather-info-container">
            <WeatherInfoCard
              weatherInfo={`${Math.round(weatherStart.wind.speed)}m/s`}
              image={wind_icon}
            />
            <WeatherInfoCard
              weatherInfo={`${weatherStart.main.humidity}%`}
              image={humidity_icon}
            />
            <WeatherInfoCard
              weatherInfo={`${weatherStart.clouds.all}%`}
              image={cloud_icon}
            />
            <WeatherInfoCard
              weatherInfo={`${weatherStart.main.pressure}hPa`}
              image={pressure_icon}
            />
          </div>
          <WeeklyTemperatures weatherDaily={weatherDaily} />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Side;
