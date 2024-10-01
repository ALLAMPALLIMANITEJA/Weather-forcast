import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");

  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.main && data.main.temp && data.weather) {
          const kelvin = data.main.temp;
          const celsius = kelvin - 273.15;
          const weatherCondition = data.weather[0].main;
          
          // Determine the weather icon based on the condition
          let icon = "";
          if (weatherCondition === "Clear") {
            icon = "☀️"; // Sunny
          } else if (weatherCondition === "Rain") {
            icon = "🌧️"; // Rainy
          } else if (weatherCondition === "Clouds") {
            icon = "☁️"; // Cloudy
          } else if (weatherCondition === "Snow") {
            icon = "❄️"; // Snowy
          } else if (weatherCondition === "Drizzle") {
            icon = "🌦️"; // Light Rain
          } else if (weatherCondition === "Thunderstorm") {
            icon = "⛈️"; // Thunderstorm
          } else {
            icon = "🌡️"; // General/Unknown Weather
          }

          setWeatherIcon(icon);
          setResult(
            `Temperature at ${city.toUpperCase()}: ${Math.round(celsius)}°C`
          );
        } else {
          setResult("City not found or invalid data. Please try again.");
        }
        setCity("");
      })
      .catch((error) => {
        setResult("Error fetching data. Please check your connection or try again.");
        console.error("Error fetching weather data:", error);
      });
  };

  return (
    <center>
      <div className="card">
        <div className="card-body">
          <h4 className="title">WEATHER APP</h4>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              name="city"
              placeholder="Enter City"
              value={city}
              onChange={changeHandler}
            />
            <br />
            <br />
            <input type="submit" value="Get Temperature" />
          </form>
          <h1>{result} {weatherIcon}</h1> {/* Display temperature and icon */}
        </div>
      </div>
    </center>
  );
};

export default App;
