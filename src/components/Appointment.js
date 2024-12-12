import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  TextField,
  Card,
  CardContent,
  Stack,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Snackbar, // Import Snackbar
  Alert, // Import Alert for custom Snackbar style
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./AllForms/Axios";
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Appointment = () => {
  const defaultValues = {
    sr_code: "",
    name: "",
    grade: "",
    section: "",
    date: "",
    time: "",
    purpose: "",
    other_purpose: "",
  };

  const { control, handleSubmit, reset, watch } = useForm({ defaultValues });
  const purpose = watch("purpose");

  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  
  // Snackbar state to control visibility
  const [openSnackbar, setOpenSnackbar] = useState(false); // Notification state
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Message to display in Snackbar

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await AxiosInstance.get("/appointment/", {
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const onSubmit = async (data) => {
    if (!data.sr_code) {
      alert("Please provide a valid Student Number.");
      return;
    }

    try {
      const response = await AxiosInstance.post("/appointment/", data, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setAppointments((prev) => [...prev, response.data]);
      reset();
      setOpenDialog(false);

      // Show success notification
      setSnackbarMessage("Schedule successfully added!");
      setOpenSnackbar(true); // Open the Snackbar

    } catch (error) {
      console.error("Error creating appointment:", error.response?.data || error.message);
      alert("Error creating appointment.");
    }
  };

  const confirmDelete = (id) => {
    setAppointmentToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDelete = async () => {
    if (appointmentToDelete === null) return;

    const updatedAppointments = appointments.filter(
      (appointment) => appointment.id !== appointmentToDelete
    );
    setAppointments(updatedAppointments);

    try {
      await AxiosInstance.delete(`/appointment/${appointmentToDelete}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting appointment:", error.response?.data || error.message);
      alert("Error deleting appointment.");
      setAppointments(appointments);
      setOpenDeleteDialog(false);
    }
  };

  // Close the Snackbar after it is displayed
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: "20px", backgroundColor: "white", height:"80vh", marginTop:"-20px" }}>
      <Typography variant="h5" align="center" gutterBottom sx={{ color: "#003366", fontFamily: "'Rozha One'" }}>
        SCHEDULES
      </Typography>

      {/* Add Appointment Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          sx={{ 
            backgroundColor: "#003366", 
            "&:hover": { backgroundColor: "#004c8c" },
            fontFamily: "'Rozha One'", 
            display: "flex", 
            alignItems: "center" 
          }}
        >
          <AddCircleIcon sx={{ marginRight: 1 }} />
          Add Schedule
        </Button>
      </Box>

      {/* Appointment Cards using Grid layout */}
      <Grid container spacing={3} justifyContent="center">
        {appointments.length === 0 ? (
          <Paper elevation={3} sx={{ padding: 2, textAlign: "center", backgroundColor: "#E7FBE6", width: '50%', marginTop:"20px" }}>
            <Typography variant="h6" color="#004c8c" sx={{ fontFamily: "'Rozha One'" }}>
              No scheduled yet.
            </Typography>
          </Paper>
        ) : (
          appointments.map((appointment, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={3}
                sx={{
                  backgroundColor: "#E7FBE6",
                  marginBottom: 2,
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{ color: "black", fontWeight:"bold" }}>
                    {appointment.name}
                  </Typography>
                  <Typography>Student Number: {appointment.sr_code} </Typography>
                  <Typography>Grade: {appointment.grade}</Typography>
                  <Typography>Section: {appointment.section}</Typography>
                  <Typography>Date: {appointment.date}</Typography>
                  <Typography>Time: {appointment.time}</Typography>
                  <Typography>Purpose: {appointment.purpose}</Typography>
                  <Typography>Counselor: {appointment.counselor_user}</Typography>
                  {appointment.purpose === "Others" && (
                    <Typography>Other Purpose: {appointment.other_purpose}</Typography>
                  )}
                  <Box sx={{ textAlign: "center", marginTop: 2 }}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => confirmDelete(appointment.id)}
                      sx={{ backgroundColor: "#004c8c", "&:hover": { backgroundColor: "#004c8c" } }}
                    >
                      Done
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Dialog for Adding Appointment */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: "#003366", color: "#ffffff", marginBottom:"10px", fontFamily: "'Rozha One'" }}>Add New Appointment</DialogTitle>
        <DialogContent sx={{ backgroundColor: "#f5f5f5" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <Controller
                name="sr_code"
                control={control}
                rules={{ required: "Student Number is required" }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Student Number"
                    error={!!error}
                    helperText={error ? error.message : ""}
                    sx={{ backgroundColor: "#ffffff" }}
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => <TextField {...field} label="Name" sx={{ backgroundColor: "#ffffff" }} />}
              />
              <Controller
                name="grade"
                control={control}
                render={({ field }) => <TextField {...field} label="Grade" sx={{ backgroundColor: "#ffffff" }} />}
              />
              <Controller
                name="section"
                control={control}
                render={({ field }) => <TextField {...field} label="Section" sx={{ backgroundColor: "#ffffff" }} />}
              />
              <Controller
                name="date"
                control={control}
                render={({ field }) => <TextField {...field} type="date" sx={{ backgroundColor: "#ffffff" }} />}
              />
              <Controller
                name="time"
                control={control}
                render={({ field }) => <TextField {...field} type="time" sx={{ backgroundColor: "#ffffff" }} />}
              />
              <FormControl fullWidth>
                <InputLabel sx={{ color: "#003366", fontFamily: "'Rozha One'" }}>Purpose</InputLabel>
                <Controller
                  name="purpose"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Purpose" sx={{ backgroundColor: "#ffffff", fontFamily: "'Rozha One'" }}>
                      <MenuItem value="Routine Interview">Routine Interview</MenuItem>
                      <MenuItem value="Referral">Referral</MenuItem>
                      <MenuItem value="Individual Planning">Individual Planning</MenuItem>
                      <MenuItem value="Counseling">Counseling</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              {purpose === "Others" && (
                <Controller
                  name="other_purpose"
                  control={control}
                  render={({ field }) => <TextField {...field} placeholder="Specify if others" sx={{ backgroundColor: "#ffffff" }} />}
                />
              )}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#003366" }}>
          <Button onClick={() => setOpenDialog(false)} color="secondary" sx={{ color: "#ffffff" }}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary" sx={{ color: "#ffffff" }}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Position at the bottom
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Dialog for Deleting Appointment */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle sx={{ backgroundColor: "#003366", color: "#ffffff", fontFamily: "'Rozha One'" }}>
          Confirm Deletion
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#f5f5f5" }}>
          <Typography sx={{ color: "#003366", marginTop:"10px", fontFamily: "'Rozha One'" }}>
            Are you sure you want to mark this scheduled as done?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#003366" }}>
          <Button onClick={() => setOpenDeleteDialog(false)} color="secondary" sx={{ color: "#ffffff" }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" sx={{ color: "#ffffff" }}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointment;
