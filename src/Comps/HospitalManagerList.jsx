import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const HospitalManagerList = ({ hospitalManagers, handleSendEmail }) => {
  return (
    <Grid container spacing={3}>
      {hospitalManagers.map(manager => (
        <Grid item xs={12} sm={6} md={4} key={manager.email}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={manager.imageUrl}
              alt={`${manager.firstName} ${manager.lastName}`}
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
  );
};

export default HospitalManagerList;
