import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Paper, Typography, Button, Box } from "@mui/material";

const EmailModal = ({ open, onClose, currentEmails, handlePreviousPage, handleNextPage, currentPage, totalPages }) => {
  if (!open) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Email History</DialogTitle>
      <DialogContent>
        <List>
          {currentEmails.map((email, index) => (
            <ListItem key={index} divider>
              <ListItemText primary={`From: ${email.fromEmail} - Subject: ${email.subject} - Content: ${email.content} - Sent on: ${new Date(email.sendingDate).toLocaleString()}`} />
            </ListItem>
          ))}
        </List>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Back</Button>
          <Button onClick={handleNextPage} disabled={currentPage >= totalPages}>Next</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EmailModal;
