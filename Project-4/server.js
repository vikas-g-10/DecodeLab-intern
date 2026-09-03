require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Weather API Backend",
  });
});

// API health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    service: "Weather API",
  });
});

// Weather route
app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city.trim();

    // Validate city name
    if (!city) {
      return res.status(400).json({
        error: "City name is required",
      });
    }

    // Fetch weather data from WeatherAPI
    const response = await axios.get(
      "https://api.weatherapi.com/v1/current.json",
      {
        params: {
          key: process.env.WEATHER_API_KEY,
          q: city,
        },
      }
    );

    const weather = response.data;

    // Reformat the external API response
    const formattedWeather = {
      city: weather.location.name,
      country: weather.location.country,
      temperature_c: weather.current.temp_c,
      condition: weather.current.condition.text,
      humidity: weather.current.humidity,
      wind_kph: weather.current.wind_kph,
    };

    res.json(formattedWeather);
  } catch (error) {
    console.error("Weather API error:", error.message);

    // Invalid city
    if (error.response?.status === 400) {
      return res.status(404).json({
        error: "City not found",
      });
    }

    // Other API/server errors
    res.status(500).json({
      error: "Unable to fetch weather data",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});