import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomScroll = styled("div")(({ theme }) => ({
  height: "50vh",
  overflowY: "scroll",
  "&::-webkit-scrollbar": {
    width: "6px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[300],
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "3px",
  },
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  transition: "background-color 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  margin: theme.spacing(1),
  boxShadow: "none",
  "&:hover, &:hover .MuiAccordionSummary-root": {
    backgroundColor: theme.palette.grey[400],
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  },
  "& .MuiAccordionSummary-root": {
    backgroundColor: theme.palette.background.default,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
    minHeight: "48px",
    "&.Mui-expanded": {
      minHeight: "48px",
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: "0",
    "&.Mui-expanded": {
      margin: "0",
    },
  },
  "& .MuiAccordionDetails-root": {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2),
  },
}));

function EmailModal({
  open,
  onClose,
  currentEmails,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
}) {
  const [expanded, setExpanded] = useState(null);
  // State for storing current emails
  const [emails, setEmails] = useState(currentEmails);

  useEffect(() => {
    setExpanded(null);
    setEmails(currentEmails); // Update emails state when currentEmails prop changes
  }, [currentEmails, currentPage]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  if (!open) return null;

  const handleDeleteEmail = async (emailId) => {
    console.log("Attempting to delete email with ID:", emailId);
    try {
      const response = await fetch(
        `https://localhost:7115/api/Mail/DeleteEmailFromInbox?emailId=${emailId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete the email");
      }

      setEmails(emails.filter((email) => email.emailId !== emailId));
      console.log("Email deleted successfully!");
    } catch (error) {
      console.error("Error:", error);
      console.log("An error occurred while deleting the email.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Email History</DialogTitle>
      <DialogContent dividers>
        <CustomScroll>
          {emails.map((email, index) => (
            <StyledAccordion
              key={index}
              expanded={expanded === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: "medium" }}>
                    From: {email.fromEmail}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{ fontWeight: "medium" }}
                  >
                    Subject: {email.subject}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">{email.content}</Typography>
                <Typography variant="caption" color="textSecondary">
                  Sent on: {new Date(email.sendingDate).toLocaleString()}
                </Typography>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => handleDeleteEmail(email.emailId)}
                  sx={{ mt: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
              </AccordionDetails>
            </StyledAccordion>
          ))}
        </CustomScroll>
      </DialogContent>
      <Box
        mt={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding="0 24px 8px"
      >
        <IconButton onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body2">
          {currentPage} of {totalPages}
        </Typography>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Dialog>
  );
}

export default EmailModal;
