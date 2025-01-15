import Weather from "../models/Weather.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const updateWeather = async (req, res) => {
  try {
    const userId = req.user.id;
    const { city } = req.body;

    // Get weather data from OpenWeatherMap API
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    const weatherData = response.data;

    // Save to database
    let weather = await Weather.findOne({ userId });
    if (!weather) {
      weather = new Weather({
        userId,
        city,
        weatherData,
      });
    } else {
      weather.city = city;
      weather.weatherData = weatherData;
    }

    await weather.save();
    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Weather update error:", error);
    if (error.response?.status === 404) {
      res.status(404).json({ error: "City not found" });
    } else if (error.response?.status === 401) {
      res.status(401).json({ error: "Invalid API key" });
    } else {
      res.status(500).json({ error: "Failed to update weather data" });
    }
  }
};

export const getWeather = async (req, res) => {
  try {
    const userId = req.user.id;
    const weather = await Weather.findOne({ userId });

    if (!weather) {
      return res.status(404).json({ error: "No weather data found" });
    }

    // If data is older than 30 minutes, fetch new data
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    if (weather.updatedAt < thirtyMinutesAgo) {
      const API_KEY = process.env.OPENWEATHER_API_KEY;
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${weather.city}&units=metric&appid=${API_KEY}`
      );
      
      weather.weatherData = response.data;
      await weather.save();
    }

    res.status(200).json({
      city: weather.city,
      weatherData: weather.weatherData,
    });
  } catch (error) {
    console.error("Get weather error:", error);
    res.status(500).json({ error: "Failed to get weather data" });
  }
};
