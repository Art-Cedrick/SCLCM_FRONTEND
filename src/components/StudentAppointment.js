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
import { AccessTime, CalendarToday, Circle, Person } from "@mui/icons-material";
import { School, SchoolIcon } from "lucide-react";

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
                <Card 
                  elevation={3} 
                  sx={{ 
                    backgroundColor: "#E7FBE6",
                    marginBottom: 2,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "scale(1.02)",
                    },
                    borderRadius: "12px",
                    border: "1px solid #c8e6c9",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <CardContent sx={{ padding: "24px" }}>
                    {/* Purpose with enhanced typography */}
                    <Typography 
                      variant="h5"
                      sx={{ 
                        color: "#003366",
                        fontWeight: "700",
                        marginBottom: "20px",
                        borderBottom: "2px solid #003366",
                        paddingBottom: "12px",
                        letterSpacing: "0.5px",
                        lineHeight: 1.3
                      }}
                    >
                      {schedule.purpose}
                    </Typography>

                    <Stack spacing={2.5}>
                      {/* Grade & Section with improved hierarchy */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <School sx={{ color: "#003366", fontSize: "1.5rem" }} />
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 500,
                          letterSpacing: "0.3px",
                          fontSize: "1.1rem"
                        }}>
                          Grade {schedule.grade} - Section {schedule.section}
                        </Typography>
                      </Box>
                      
                      {/* Date with better visual hierarchy */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <CalendarToday sx={{ color: "#003366", fontSize: "1.5rem" }} />
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 500,
                          letterSpacing: "0.3px"
                        }}>
                          {schedule.date}
                        </Typography>
                      </Box>

                      {/* Time with enhanced readability */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <AccessTime sx={{ color: "#003366", fontSize: "1.5rem" }} />
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 500,
                          letterSpacing: "0.3px"
                        }}>
                          {new Date(schedule.time_in_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(schedule.time_out_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </Typography>
                      </Box>

                      {/* Counselor with improved spacing */}
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Person sx={{ color: "#003366", fontSize: "1.5rem" }} />
                        <Typography variant="subtitle1" sx={{ 
                          fontWeight: 500,
                          letterSpacing: "0.3px"
                        }}>
                          {schedule.counselor_user ? schedule.counselor_user : "N/A"}
                        </Typography>
                      </Box>

                      {/* Status with enhanced visual appeal */}
                      <Box 
                        sx={{ 
                          display: "flex", 
                          alignItems: "center", 
                          gap: 1.5,
                          backgroundColor: new Date(schedule.time_out_date) < new Date() ? "#4caf50" : "#2196f3",
                          color: "white",
                          padding: "10px 20px",
                          borderRadius: "25px",
                          width: "fit-content",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          marginTop: "8px"
                        }}
                      >
                        <Circle sx={{ fontSize: "10px" }} />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 600,
                            letterSpacing: "0.5px",
                            textTransform: "uppercase",
                            fontSize: "0.875rem"
                          }}
                        >
                          {new Date(schedule.time_out_date) < new Date() ? "Completed" : (schedule.status || "Scheduled")}
                        </Typography>
                      </Box>
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
