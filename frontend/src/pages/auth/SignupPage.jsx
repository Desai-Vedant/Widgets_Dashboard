import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  Container,
  Grid,
  Paper,
} from "@mui/material";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8}>
          <Paper elevation={6} sx={{ padding: 4, borderRadius: "16px" }}>
            <Box
              sx={{
                textAlign: "center",
                mb: 3,
              }}
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Create Your Account
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Sign up to access and customize your Dashboard.
              </Typography>
            </Box>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <Box
              component="form"
              onSubmit={handleSignup}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  mt: 2,
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Sign Up
              </Button>
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mt: 2 }}
            >
              Already have an account?{" "}
              <Button
                variant="text"
                color="primary"
                size="small"
                onClick={() => navigate("/login")}
                sx={{ textTransform: "none" }}
              >
                Log in here
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupPage;
