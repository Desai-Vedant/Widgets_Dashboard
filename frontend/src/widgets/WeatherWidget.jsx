import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

const WeatherWidget = () => {
  const [city, setCity] = useState("Pune");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateBackend = async (weatherData) => {
    try {
      await axios.post(
        "http://localhost:3000/api/weather/update",
        weatherData,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Failed to update the backend:", error);
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const API_KEY = "API_kEY"; // Use environment variable
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError(null);
      updateBackend(response.data); // Auto-update backend
    } catch (err) {
      setWeather(null);
      setError("City not found or API error.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialCity = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/weather/getdata",
          {},
          { withCredentials: true }
        );
        if (response.data?.city) {
          setCity(response.data.city);
          fetchWeather(response.data.city);
        }
      } catch (error) {
        console.error("Failed to fetch initial city:", error);
      }
    };
    fetchInitialCity();
  }, []);

  return (
    <Box
      id="weather"
      sx={{
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Weather Widget
      </Typography>
      <TextField
        label="City"
        variant="outlined"
        size="small"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        size="small"
        onClick={() => fetchWeather(city)}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={20} /> : "Fetch Weather"}
      </Button>
      {weather ? (
        <Box
          sx={{
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h5" gutterBottom>
            {weather.name}
          </Typography>
          <Typography variant="body1">
            <strong>Temperature:</strong> {weather.main.temp}°C
          </Typography>
          <Typography variant="body1">
            <strong>Condition:</strong> {weather.weather[0]?.description}
          </Typography>
        </Box>
      ) : (
        error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )
      )}
    </Box>
  );
};

export default WeatherWidget;
