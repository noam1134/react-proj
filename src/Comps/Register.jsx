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
    imagePath: "",
    hospitalId: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    imagePath: "",
    hospitalId: "",
  });
  const [imageUploadSuccess, setImageUploadSuccess] = useState(false); // New state for image upload success
  const navigate = useNavigate();

  const [widget, setWidget] = useState(null);

  useEffect(() => {
    setWidget(
      window.cloudinary.createUploadWidget(
        {
          cloudName: "dzl5twp4b",
          uploadPreset: "esseufv8",
          sources: ["local", "url", "camera"],
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
            fonts: {
              default: null, // Defaults to system font
            },
          },
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log(result.info.secure_url);
            setForm((prev) => ({
              ...prev,
              imagePath: result.info.secure_url,
            }));
            setErrors((prev) => ({ ...prev, imagePath: "" }));
            setImageUploadSuccess(true); // Set the success state
          }
        }
      )
    );
  }, []);

  const openWidget = () => {
    widget.open();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    let error = "";
    if (name === "email") {
      error = validateEmail(value) ? "" : "Invalid email address";
    } else if (name === "password") {
      error = validatePassword(value)
        ? ""
        : "Password should be at least 8 characters long and include at least one letter and one number";
    } else if (name === "firstName") {
      error = value ? "" : "First name is required";
    } else if (name === "lastName") {
      error = value ? "" : "Last name is required";
    } else if (name === "hospitalId") {
      error = value ? "" : "Hospital ID is required";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number
    return re.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const allErrors = {
      email: validateEmail(form.email) ? "" : "Invalid email address",
      password: validatePassword(form.password)
        ? ""
        : "Password should be at least 8 characters long and include at least one letter and one number",
      firstName: form.firstName ? "" : "First name is required",
      lastName: form.lastName ? "" : "Last name is required",
      hospitalId: form.hospitalId ? "" : "Hospital ID is required",
      imagePath: form.imagePath ? "" : "Image is required",
    };
    setErrors(allErrors);

    const isValid = Object.values(allErrors).every((e) => e === "");

    if (isValid) {
      try {
        const response = await fetch(
          "https://localhost:7115/api/HospitalManager/Registration",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        const data = await response.json();
        if (response.ok) {
          console.log("Registration successful");
          const { password, ...managerDetails } = form; // Exclude password from the form data
          sessionStorage.setItem("user", JSON.stringify(managerDetails));
          navigate("/main"); // Navigate to the main page upon successful registration
        } else {
          console.error("Registration failed:", data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  const hospitalOptions = [
    { id: "1", name: "Hospital 1" },
    { id: "2", name: "Hospital 2" },
    { id: "3", name: "Hospital 3" },
  ];

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
          error={!!errors.email}
          helperText={errors.email}
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
          error={!!errors.firstName}
          helperText={errors.firstName}
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
          error={!!errors.lastName}
          helperText={errors.lastName}
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
          error={!!errors.password}
          helperText={errors.password}
          fullWidth
          margin="dense"
        />
        <Select
          variant="outlined"
          name="hospitalId"
          value={form.hospitalId}
          onChange={handleChange}
          error={!!errors.hospitalId}
          fullWidth
          displayEmpty
          margin="dense"
        >
          <MenuItem value="" disabled>
            Select Hospital
          </MenuItem>
          {hospitalOptions.map((hospital) => (
            <MenuItem key={hospital.id} value={hospital.id}>
              {hospital.name}
            </MenuItem>
          ))}
        </Select>
        {errors.hospitalId && (
          <Typography color="error" style={{ marginBottom: "20px" }}>
            {errors.hospitalId}
          </Typography>
        )}
        <input
          accept="image/*"
          type="button"
          value="Upload Image"
          onClick={openWidget}
          style={{ display: "block", margin: "auto" }}
        />
        {imageUploadSuccess && (
          <Typography
            color="primary"
            style={{ marginBottom: "20px", textAlign: "center" }}
          >
            Image uploaded successfully!
          </Typography>
        )}
        {errors.imagePath && (
          <Typography color="error" style={{ marginBottom: "20px" }}>
            {errors.imagePath}
          </Typography>
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
