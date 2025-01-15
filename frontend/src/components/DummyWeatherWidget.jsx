import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

function DummyWeatherWidget() {
  const weather = { Sample: 1 };
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
        value="Kolhapur"
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" size="small" sx={{ mb: 2 }}>
        Fetch Weather
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
            {"Kolhapur"}
          </Typography>
          <Typography variant="body1">
            <strong>Temperature:</strong> {30}°C
          </Typography>
          <Typography variant="body1">
            <strong>Condition:</strong> {"Partly Cloudy"}
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
}

export default DummyWeatherWidget;
