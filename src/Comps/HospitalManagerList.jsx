import {
  Grid,
  Card,
  Avatar,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";

const HospitalManagerList = ({
  hospitalManagers,
  handleSendEmail,
  viewType,
  setViewType,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleView = () => {
    setViewType(viewType === "grid" ? "list" : "grid");
  };

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
                  width: 72, // Increased from 56 to 72
                  height: 72, // Increased from 56 to 72
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
