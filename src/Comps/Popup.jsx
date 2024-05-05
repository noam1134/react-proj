import React, { useEffect, useRef } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";

const Popup = ({
  open,
  onClose,
  emailSubject,
  setEmailSubject,
  emailContent,
  setEmailContent,
  handleSend,
}) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
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
      <Paper ref={popupRef} style={{ padding: "20px", maxWidth: "400px" }}>
        <Typography variant="h6" gutterBottom>
          Send Email
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
          onClick={onClose}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </Paper>
    </div>
  );
};

export default Popup;
