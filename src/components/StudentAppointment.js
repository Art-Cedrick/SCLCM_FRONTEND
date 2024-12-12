import React, { useState, useEffect } from "react";
import AxiosInstance from "./AllForms/Axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

function StudentAppointment() {
  const [schedules, setSchedules] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);  // State to control Snackbar visibility
  const [notificationMessage, setNotificationMessage] = useState(""); // State for message

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await AxiosInstance.get("/appointment/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        
        // Check if the new appointments are received
        if (response.data.length > 0 && response.data.length !== schedules.length) {
          // Trigger notification when new appointments are received
          setNotificationMessage("You have a new appointment scheduled!");
          setOpenSnackbar(true); // Show the Snackbar
        }
        
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [schedules]);  // Re-run fetchSchedules whenever schedules change

  // Handle Snackbar close
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "white", height: "auto" }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ color: "#003366" }}>
        Your Schedules
      </Typography>

      {/* Using Stack and Grid layout to display schedules */}
      <Stack spacing={3}>
        {schedules.length === 0 ? (
          // Centering the "No schedules yet" card
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px", // Reduced space above the card
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                textAlign: "center",
                backgroundColor: "#E7FBE6",
                width: "50%",  // Adjust width for a balanced look
                margin: "0 auto", // Ensures equal space on both sides
              }}
            >
              <Typography variant="h6" color="textSecondary">
                No schedules yet.
              </Typography>
            </Paper>
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {schedules.map((schedule) => (
              <Grid item xs={12} sm={6} md={4} key={schedule.id}>
                <Card elevation={3} sx={{ backgroundColor: "#E7FBE6", marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#003366" }}>
                      {schedule.purpose}
                    </Typography>
                    <Stack spacing={1}>
                      <Typography>Grade: {schedule.grade}</Typography>
                      <Typography>Section: {schedule.section}</Typography>
                      <Typography>Date: {schedule.date}</Typography>
                      <Typography>Time: {schedule.time}</Typography>
                      <Typography>Counselor: {schedule.counselor_user ? schedule.counselor_user : "N/A"}</Typography>
                      <Typography variant="body2">
                        Status: {schedule.status || "Scheduled"}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Stack>

      {/* Snackbar Notification positioned on the right */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Hide the notification after 6 seconds
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} // Position it at the top-right
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default StudentAppointment;
