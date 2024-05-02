import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Paper,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [hospitalManagers, setHospitalManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);

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

  const handleSendEmail = (manager) => {
    setSelectedManager(manager);
    setEmailSubject(""); // Clearing the subject
    setEmailContent(""); // Clearing the content
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleSend = () => {
    // Logic to send email
    console.log("Sending email to:", selectedManager.email);
    console.log("Subject:", emailSubject);
    console.log("Content:", emailContent);
    handleClosePopup();
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
      <Typography variant="h5" gutterBottom>
        Hospital Managers
      </Typography>
      <Grid container spacing={3}>
        {hospitalManagers.map((manager) => (
          <Grid item xs={12} sm={6} md={4} key={manager.email}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={manager.imageUrl} // Add the image URL for the manager
                alt={manager.firstName}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {manager.firstName} {manager.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Email: {manager.email}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSendEmail(manager)}
                  style={{ marginTop: "10px" }}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      {popupOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper style={{ padding: "20px", maxWidth: "400px" }}>
            <Typography variant="h6" gutterBottom>
              Send Email to {selectedManager.firstName}{" "}
              {selectedManager.lastName}
            </Typography>
            <TextField
              label="Subject"
              fullWidth
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              label="Content"
              multiline
              fullWidth
              rows={4}
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              style={{ marginBottom: "10px" }}
            />
            <Button variant="contained" color="primary" onClick={handleSend}>
              Send
            </Button>
            <Button
              variant="contained"
              onClick={handleClosePopup}
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </Button>
          </Paper>
        </div>
      )}
    </Paper>
  );
};

export default Main;
