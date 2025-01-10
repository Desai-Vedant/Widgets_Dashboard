import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";

const WeatherWidget = ({ onAddToDashboard }) => {
  const [city, setCity] = useState("New York");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const API_KEY = "API KEY"; // Replace with your API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError(null);
    } catch (err) {
      setError("City not found or API error.");
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardContent>
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
          sx={{ mb: 2 }}
        >
          Fetch Weather
        </Button>
        {weather ? (
          <Box>
            <Typography variant="body1">
              <strong>City:</strong> {weather.name}
            </Typography>
            <Typography variant="body1">
              <strong>Temperature:</strong> {weather.main.temp}°C
            </Typography>
            <Typography variant="body1">
              <strong>Condition:</strong> {weather.weather[0].description}
            </Typography>
          </Box>
        ) : (
          error && <Typography color="error">{error}</Typography>
        )}
        <Button
          variant="outlined"
          size="small"
          onClick={() => onAddToDashboard(weather)}
          sx={{ mt: 2 }}
        >
          Add to Dashboard
        </Button>
      </CardContent>
    </Card>
  );
};

WeatherWidget.propTypes = {
  onAddToDashboard: PropTypes.func.isRequired,
};

export default WeatherWidget;
