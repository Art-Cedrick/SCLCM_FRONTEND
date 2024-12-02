// import React, { useState, useEffect } from "react";
// import AxiosInstance from "./AllForms/Axios";
// import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

// function StudentAppointment() {
//   const [schedules, setSchedules] = useState([]);

//   useEffect(() => {
//     const fetchSchedules = async () => {
//       try {
//         const response = await AxiosInstance.get("/appointment/", {
//           headers: { Authorization: `Token ${localStorage.getItem("token")}` }
//         });
//         setSchedules(response.data);
//       } catch (error) {
//         console.error("Error fetching schedules:", error);
//       }
//     };
//     fetchSchedules();
//   }, []);

//   return (
//     <Box sx={{ padding: "20px" }}>
//       <Typography variant="h5" align="center" gutterBottom>
//         Your Schedules
//       </Typography>
//       <Grid container spacing={2}>
//         {schedules.length === 0 ? (
//           <Grid item xs={12}>
//             <Card sx={{ padding: 2, textAlign: "center" }}>
//               <Typography variant="h6" color="textSecondary">
//                 No schedules yet.
//               </Typography>
//             </Card>
//           </Grid>
//         ) : (
//           schedules.map((schedule) => (
//             <Grid item xs={12} sm={6} md={4} key={schedule.id}>
//               <Card elevation={3}>
//                 <CardContent>
//                   <Typography variant="h6">{schedule.purpose}</Typography>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     Date: {schedule.date}
//                   </Typography>
//                   <Typography variant="subtitle1" color="textSecondary">
//                     Time: {schedule.time}
//                   </Typography>
//                   <Typography variant="body2">
//                     Counselor: {schedule.counselor_user ? schedule.counselor_user : "N/A"}
//                   </Typography>
//                   <Typography variant="body2">
//                     Grade: {schedule.grade} | Section: {schedule.section}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   );
// }

// export default StudentAppointment;
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
} from "@mui/material";

function StudentAppointment() {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await AxiosInstance.get("/appointment/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

  return (
    <Box sx={{ padding: "20px", backgroundColor: "#f5f5f5", height: "auto" }}>
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
                backgroundColor: "#ffffff",
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
                <Card elevation={3} sx={{ backgroundColor: "#ffffff", marginBottom: 2 }}>
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
    </Box>
  );
}

export default StudentAppointment;
