import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import "./styles.css";

const Register = () => {
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    hospitalID: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    hospitalID: "",
  });

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum eight characters, at least one letter and one number
    return re.test(password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value) ? "" : "Invalid email address",
      }));
    } else if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validatePassword(value)
          ? ""
          : "Password should be at least 8 characters long and include at least one letter and one number",
      }));
    } else if (name === "firstName") {
      setErrors((prev) => ({
        ...prev,
        firstName: value ? "" : "First name is required",
      }));
    } else if (name === "lastName") {
      setErrors((prev) => ({
        ...prev,
        lastName: value ? "" : "Last name is required",
      }));
    } else if (name === "hospitalID") {
      setErrors((prev) => ({
        ...prev,
        hospitalID: value ? "" : "Hospital ID is required",
      }));
    }

    // Clear password error when a valid password is entered
    if (name === "password" && validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !errors.email &&
      !errors.password &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.hospitalID &&
      form.email &&
      form.password &&
      form.firstName &&
      form.lastName &&
      form.hospitalID
    ) {
      console.log("Form is valid:", form);
      // Submit form
    }
  };

  // Array of hospital IDs for dropdown
  const hospitalOptions = [
    { id: "hospital1", name: "Hospital 1" },
    { id: "hospital2", name: "Hospital 2" },
    { id: "hospital3", name: "Hospital 3" },
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
          margin="normal"
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
          margin="normal"
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
          margin="normal"
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
          margin="normal"
        />
        <Select
          label="Hospital"
          variant="outlined"
          name="hospitalID"
          value={form.hospitalID}
          onChange={handleChange}
          error={!!errors.hospitalID}
          fullWidth
          displayEmpty
          margin="normal"
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default Register;
