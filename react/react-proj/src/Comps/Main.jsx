import React, { useEffect, useState } from "react";
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
    }

    // Fetch hospital managers
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://localhost:7115/api/HospitalManager/GetAllHospitalManagersByHospitalId?hospitalId=${JSON.parse(sessionStorage.getItem("user")).hospitalId}`
        );
        const data = await response.json();
        console.log(data)
        setHospitalManagers(data);
      } catch (error) {
        console.error("Failed to fetch hospital managers", error);
      }
    };

    fetchData();
  }, [navigate]);

  // Handle logout
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
      <Button variant="contained" color="primary" style={{ margin: "20px 0" }}>
        Create Report
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Hospital</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hospitalManagers.map((manager) => (
            <TableRow key={manager.id}>
              <TableCell>{manager.id}</TableCell>
              <TableCell>{manager.name}</TableCell>
              <TableCell>{manager.hospital}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default Main;
