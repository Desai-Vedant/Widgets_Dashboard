import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

const WeatherWidget = () => {
  const [city, setCity] = useState("Kolhapur");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/weather/update",
        { city: cityName },
        { withCredentials: true }
      );
      setWeather(response.data);
    } catch (err) {
      setWeather(null);
      if (err.response?.status === 404) {
        setError("City not found. Please check the spelling.");
      } else {
        setError("Failed to fetch weather data. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/weather/getdata",
          {},
          { withCredentials: true }
        );
        if (response.data?.city) {
          setCity(response.data.city);
        }
        if (response.data?.weatherData) {
          setWeather(response.data.weatherData);
        }
      } catch (error) {
        console.error("Failed to fetch initial weather:", error);
        setError("Failed to load weather data");
      } finally {
        setLoading(false);
      }
    };
    fetchInitialWeather();
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
        width: "100%",
        height: "100%",
        minHeight: 300,
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
        error={!!error}
        helperText={error}
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
            <strong>Temperature:</strong> {Math.round(weather.main.temp)}°C
          </Typography>
          <Typography variant="body1">
            <strong>Condition:</strong> {weather.weather[0].description}
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
