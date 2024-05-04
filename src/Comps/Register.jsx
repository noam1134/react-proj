import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    hospitalId: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    hospitalId: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load Cloudinary script and initialize widget on mount
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.onload = () => initializeWidget();
      document.body.appendChild(script);
    } else {
      initializeWidget();
    }
  }, []);

  const initializeWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dzl5twp4b",
        uploadPreset: "esseufv8",
        sources: ["local", "url", "camera", "image_search"],
        googleApiKey: "<YOUR_GOOGLE_API_KEY>", // Include if using image_search
        showAdvancedOptions: true,
        cropping: true,
        multiple: false,
        defaultSource: "local",
        styles: {
          palette: {
            window: "#FFFFFF",
            windowBorder: "#90A0B3",
            tabIcon: "#0078FF",
            menuIcons: "#5A616A",
            textDark: "#000000",
            textLight: "#FFFFFF",
            link: "#0078FF",
            action: "#FF620C",
            inactiveTabIcon: "#0E2F5A",
            error: "#F44235",
            inProgress: "#0078FF",
            complete: "#20B832",
            sourceBg: "#E4EBF1",
          },
        },
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setForm((prev) => ({ ...prev, image: result.info.secure_url }));
        }
      }
    );

    document.getElementById("upload_widget").addEventListener(
      "click",
      function () {
        myWidget.open();
      },
      false
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement validation checks here before submitting the form
    // Here you would typically also include a fetch or axios post request to your backend API
    navigate("/main"); // Navigate to main dashboard after registration
  };

  return (
    <Box className="registerForm">
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <Select
          label="Select Hospital"
          variant="outlined"
          name="hospitalId"
          value={form.hospitalId}
          onChange={handleChange}
          fullWidth
          displayEmpty
          margin="dense"
        >
          {/* Populate these options based on your actual data */}
          <MenuItem value="">Select Hospital</MenuItem>
          <MenuItem value="1">Hospital 1</MenuItem>
          <MenuItem value="2">Hospital 2</MenuItem>
          <MenuItem value="3">Hospital 3</MenuItem>
        </Select>
        <Button
          id="upload_widget"
          type="button"
          variant="contained"
          color="primary"
          fullWidth
        >
          Upload Image
        </Button>
        {form.image && (
          <Box mt={2} mb={2}>
            <img
              src={form.image}
              alt="Uploaded Profile"
              style={{ width: "100%" }}
            />
          </Box>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
      <Typography variant="body1" style={{ marginTop: 16 }}>
        Already have an account?{" "}
        <Link to="/login" style={{ textDecoration: "none", color: "blue" }}>
          Log in
        </Link>
      </Typography>
    </Box>
  );
};

export default Register;
