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

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [hospitalManagers, setHospitalManagers] = useState([]);

  const openPdf = () => {
    const hospitalPath =
      "./src/data/hospital_" +
      JSON.parse(sessionStorage.getItem("user")).hospitalId +
      ".pdf";
    window.open(hospitalPath, "_blank");
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchData = useCallback(() => {
    if (user && user.hospitalId) {
      fetch(
        `https://localhost:7115/api/HospitalManager/GetAllHospitalManagersByHospitalId?hospitalId=${user.hospitalId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ hospitalId: user.hospitalId }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setHospitalManagers(data);
        })
        .catch((error) => {
          console.error("Failed to fetch hospital managers", error);
        });
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleCreateReport = () => {
    const userDetails = JSON.parse(sessionStorage.getItem("user"));
    fetch("http://localhost:7115/create-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userDetails }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error creating report:", error));
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
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "20px 0" }}
        onClick={openPdf}
      >
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
