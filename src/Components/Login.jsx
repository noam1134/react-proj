import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { apiLink } from "./consts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        apiLink +
          `HospitalManager/LogIn?emailToLogin=${email}&passwordToLogin=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        const { password, ...managerDetails } = data; // Exclude password
        sessionStorage.setItem("user", JSON.stringify(managerDetails));
        navigate("/"); // Navigate to the main page
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Login failed. Please check your Email/Password.");
      console.error("Error:", err);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Typography variant="body2" align="center">
          Don't have an account?{" "}
          <Link
            to="/register"
            color="primary"
            style={{ textDecoration: "none" }}
          >
            {" "}
            Register
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
