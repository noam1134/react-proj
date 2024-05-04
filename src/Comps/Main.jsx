import React, { useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserAuth from "./UserAuth";
import DataManager from "./DataManager";
import HospitalManagerList from "./HospitalManagerList";
import Popup from "./Popup";
import EmailModal from "./EmailModal";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [selectedManager, setSelectedManager] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [emails, setEmails] = useState([]); // This is your newly defined state for emails
  const emailsPerPage = 5;

  // Now, emails state will be correctly handled by DataManager
  const { hospitalManagers } = DataManager({
    user,
    setSelectedManager,
    setPopupOpen,
    setEmails,
    setEmailModalOpen,
  });

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleSendEmail = (manager) => {
    setSelectedManager(manager);
    setEmailSubject("");
    setEmailContent("");
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleSend = () => {
    const mailData = {
      fromEmail: user.email,
      toEmail: selectedManager.email,
      subject: emailSubject,
      content: emailContent,
      sendingDate: new Date(),
    };
    fetch("https://localhost:7115/api/Mail/SendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mailData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log("Email successfully sent to:", selectedManager.email);
          handleClosePopup();
        } else {
          console.error("Failed to send email");
        }
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = emails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(emails.length / emailsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <UserAuth setUser={setUser} />
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
        onClick={() => setEmailModalOpen(true)}
        style={{ position: "absolute", right: 160, top: 20 }}
      >
        View Emails
      </Button>
      <HospitalManagerList
        hospitalManagers={hospitalManagers}
        handleSendEmail={handleSendEmail}
      />
      <Popup
        open={popupOpen}
        onClose={handleClosePopup}
        emailSubject={emailSubject}
        setEmailSubject={setEmailSubject}
        emailContent={emailContent}
        setEmailContent={setEmailContent}
        handleSend={handleSend}
      />
      <EmailModal
        open={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        currentEmails={currentEmails}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Paper>
  );
};

export default Main;
