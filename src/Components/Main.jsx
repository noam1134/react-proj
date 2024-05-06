import React, { useState, useEffect, useRef } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import UserAuth from "./UserAuth";
import DataManager from "./DataManager";
import HospitalManagerList from "./HospitalManagerList";
import Popup from "./Popup";
import EmailModal from "./EmailModal";
import LogoutIcon from "@mui/icons-material/Logout";
import { apiLink } from "./consts";

const Main = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [selectedManager, setSelectedManager] = useState(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailContent, setEmailContent] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [emails, setEmails] = useState([]);
  const emailsPerPage = 6;
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfPath, setPdfPath] = useState("");
  const iframeRef = useRef(null);

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
    fetch(apiLink + `Mail/SendMail`, {
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

  const openPdf = () => {
    // Ensure this path points to a location within the public directory
    const path = `/hospital_${user && user.hospitalId}.pdf`;
    console.log(path); // This will help verify the correct path is generated
    setPdfPath(path);
    setPdfVisible(true);
  };
  const closePdf = () => {
    setPdfVisible(false);
  };

  const handleClickOutside = (event) => {
    if (
      pdfVisible &&
      iframeRef.current &&
      !iframeRef.current.contains(event.target)
    ) {
      closePdf();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [pdfVisible]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(emails.length / emailsPerPage)) {
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
        <LogoutIcon style={{ marginRight: 8 }} />
        Logout
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setEmailModalOpen(true)}
        style={{
          position: "absolute",
          right: 160,
          top: 20,
          padding: "6px 16px",
        }}
      >
        View Emails
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={openPdf}
        style={{ margin: "20px 0" }}
      >
        Create Report
      </Button>

      <Typography variant="h5" style={{ marginTop: 20, marginBottom: 10 }}>
        <br />
        YOUR COLLEAGUES <br />
        <br />

      </Typography>
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
        currentEmails={emails.slice(
          (currentPage - 1) * emailsPerPage,
          currentPage * emailsPerPage
        )}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        currentPage={currentPage}
        totalPages={Math.ceil(emails.length / emailsPerPage)}
      />
      {pdfVisible && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <iframe
            ref={iframeRef}
            src={pdfPath}
            width="70%"
            height="80%"
            style={{ border: "none", boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }}
            title="Hospital Report"
          />
        </div>
      )}
    </Paper>
  );
};

export default Main;
