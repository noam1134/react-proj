import {
  Grid,
  Card,
  Avatar,
  CardContent,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";

const HospitalManagerList = ({
  hospitalManagers,
  handleSendEmail,
  viewType,
}) => {
  const theme = useTheme();

  return (
    <>
      <Grid container spacing={3}>
        {hospitalManagers.map((manager) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={viewType === "grid" ? 4 : 12}
            key={manager.email}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: viewType === "grid" ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                transition: "0.3s",
                boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
              }}
              elevation={4}
            >
              <Avatar
                src={manager.imagePath}
                alt={`${manager.firstName} ${manager.lastName}`}
                sx={{
                  width: 72, 
                  height: 72,
                  m: 2,
                  boxShadow: theme.shadows[3],
                }}
              />

              <CardContent sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography gutterBottom variant="h6" noWrap>
                  {`${manager.firstName} ${manager.lastName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  Email: {manager.email}
                </Typography>
              </CardContent>
              <IconButton
                color="primary"
                onClick={() => handleSendEmail(manager)}
                sx={{ m: 1 }}
              >
                <EmailIcon />
              </IconButton>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default HospitalManagerList;
