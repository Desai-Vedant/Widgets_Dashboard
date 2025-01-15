import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";

export default function Home() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ padding: 4, borderRadius: "16px" }}>
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Personalized Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Access your personalized features by logging in or signing up.
          </Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLogin}
              sx={{
                padding: "12px 0",
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Login
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleSignup}
              sx={{
                padding: "12px 0",
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
