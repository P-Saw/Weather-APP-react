import { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import Side from "./components/Side";

function App() {
  const [query, setQuery] = useState("");
  const [weatherStart, setWeatherStart] = useState({});
  const [weatherDaily, setWeatherDaily] = useState([]);
  const [weatherHourly, setWeatherHourly] = useState([]);
  const [place, setPlace] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [weatherCode, setWeatherCode] = useState(800);
  const [dayNight, setDayNight] = useState("01d");
  const api_key = process.env.REACT_APP_API_KEY;

  const success = (position) => {
    setLat(position.coords.latitude);
    setLng(position.coords.longitude);
  };

  const fetchWeatherByLoc = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(success);
      const getWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely&units=metric&appid=${api_key}`
      );
      const weather = await getWeather.json();
      console.log(weather);
      setWeatherStart(weather);
      setWeatherCode(weather.current.weather[0].id);
      setDayNight(weather.current.weather[0].icon);
      setWeatherDaily(weather.daily);
      setWeatherHourly(weather.hourly);
      const getPlace = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
      );
      const place = await getPlace.json();
      setPlace(place);
    } catch (err) {
      console.log(err);
    }
  };

  const search = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${api_key}`
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("Something went wrong, please try again...");
          }
          return res.json();
        })
        .then((data) => {
          setErrorMsg(null);
          setWeatherStart(data);
          setWeatherCode(data.weather[0].id);
          setDayNight(data.weather[0].icon);
          console.log(data);
          setQuery("");
          return fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely&units=metric&appid=${api_key}`
          );
        })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          setWeatherDaily(data.daily);
          setWeatherHourly(data.hourly);
        })
        .catch((err) => {
          setErrorMsg(err.message);
        });
    }
  };

  useEffect(() => {
    fetchWeatherByLoc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lng]);

  return (
    <div className="App">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for City..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        <button className="btn" onClick={search}>
          Search
        </button>
      </div>
      {errorMsg && <div className="error-msg"> {errorMsg} </div>}
      <div className="app-card">
        <Main
          weatherStart={weatherStart}
          weatherCode={weatherCode}
          weatherHourly={weatherHourly}
          dayNight={dayNight}
          place={place}
        />
        <Side
          weatherStart={weatherStart}
          weatherDaily={weatherDaily}
          weatherCode={weatherCode}
          dayNight={dayNight}
        />
      </div>
      <p className="attribution">
        All images found on <a href="https://www.vecteezy.com">Vecteezy</a>{" "}
        edited and animated by me.
      </p>
    </div>
  );
}

export default App;
