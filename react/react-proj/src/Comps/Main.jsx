import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const {
  createReport
} = require("./jsFiles/runReportCreation.js");

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [hospitalManagers, setHospitalManagers] = useState([]);

  useEffect(() => {
    // Retrieve user from session storage
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Redirect to login if no user is found in session storage
      navigate("/login");
      return; // Exit if navigating away
    }
  }, [navigate]);

  const fetchData = useCallback(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    if (userDetails && userDetails.hospitalId) {
      // Assuming POST is required by the server for this API endpoint
      fetch(
        `https://localhost:7115/api/HospitalManager/GetAllHospitalManagersByHospitalId?hospitalId=${userDetails.hospitalId}`,
        {
          method: "POST", // Changed to POST method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hospitalId: userDetails.hospitalId }), // Send hospitalId in the body
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setHospitalManagers(data);
        })
        .catch((error) => {
          console.error("Failed to fetch hospital managers", error);
          // Optionally handle the error, e.g., set an error state and display it
        });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Welcome {user.firstName} {user.lastName}!
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleLogout}
        style={{ position: "absolute", right: 20, top: 20 }}
      >
        Logout
      </Button>
      <Button variant="contained" color="primary" style={{ margin: "20px 0" }} onClick={createReport}>
        Create Report
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hospitalManagers.map((manager) => (
            <TableRow key={manager.email}>
              <TableCell>{manager.firstName}</TableCell>
              <TableCell>{manager.lastName}</TableCell>
              <TableCell>{manager.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Main;
