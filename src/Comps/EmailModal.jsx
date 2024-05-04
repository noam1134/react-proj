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
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Styled component for custom scrollbar and Accordion
const CustomScroll = styled("div")(({ theme }) => ({
  height: "50vh",
  overflowY: "scroll", // Changed from 'auto' to 'scroll' to always show the scrollbar
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
  cursor: "pointer", // Indicates it's clickable
  margin: theme.spacing(1), // Adds space around each accordion
  boxShadow: "none", // Starts with no shadow
  "&:hover, &:hover .MuiAccordionSummary-root": {
    backgroundColor: theme.palette.grey[400], // Darker on hover
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)", // Shadow appears on hover
  },
  "& .MuiAccordionSummary-root": {
    backgroundColor: theme.palette.background.default,
    borderBottom: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2), // Consistent padding
    minHeight: "48px", // Fixed minimum height
    "&.Mui-expanded": {
      minHeight: "48px",
    },
  },
  "& .MuiAccordionSummary-content": {
    margin: "0", // Fixing content margin
    "&.Mui-expanded": {
      margin: "0", // Maintains margin on expansion
    },
  },
  "& .MuiAccordionDetails-root": {
    backgroundColor: theme.palette.grey[100],
    padding: theme.spacing(2), // Details padding
  },
}));

const EmailModal = ({
  open,
  onClose,
  currentEmails,
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
}) => {
  const [expanded, setExpanded] = useState(null);

  // Reset expanded state whenever the currentPage changes
  useEffect(() => {
    setExpanded(null);
  }, [currentPage]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Email History</DialogTitle>
      <DialogContent dividers>
        <CustomScroll>
          {currentEmails.map((email, index) => (
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
                    width: "98%",
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
};

export default EmailModal;