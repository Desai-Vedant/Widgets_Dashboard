import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated");
        }

        const response = await axios.post(
          "http://localhost:3000/api/auth/getdetails",
          {},
          {
            withCredentials: true,
          }
        );

        const { email } = response.data;
        setEmail(email);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    const response = await axios.post(
      "http://localhost:3000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );
    logout();
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Profile Page
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Email:</strong> {email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogout}
              sx={{ mt: 2 }}
            >
              Logout
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Profile;
