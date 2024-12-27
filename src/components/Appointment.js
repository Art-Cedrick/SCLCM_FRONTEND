import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./AllForms/Axios";

const localizer = momentLocalizer(moment);

const ScheduleAppointment = () => {
  const { control, handleSubmit, reset, setValue, getValues } = useForm();
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: "",
    severity: "success",
  });

  const handleSlotSelect = (slotInfo) => {
    const { start, end } = slotInfo;
    const isOverlap = appointments.some(
      (appointment) =>
        (start >= appointment.start && start < appointment.end) ||
        (end > appointment.start && end <= appointment.end)
    );

    if (isOverlap) {
      alert("This time slot is already booked.");
      return;
    }

    setSelectedSlot(slotInfo);
    setOpenDialog(true);
  };

  const handleSearch = async (query) => {
    if (query.length > 1) {
      setLoading(true);
      try {
        const response = await AxiosInstance.get(
          `/search-student/?query=${query}`,
          {
            headers: { Authorization: `Token ${localStorage.getItem("token")}` },
          }
        );
        setOptions(response.data.results || []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setOptions([]);
      }
      setLoading(false);
    }
  };

  const handleOptionSelect = (selectedOption) => {
    if (selectedOption) {
      // Update all fields based on the selected student
      setValue("sr_code", selectedOption.sr_code || "");
      setValue(
        "name",
        `${selectedOption.first_name || ""} ${selectedOption.last_name || ""}`
      );
      setValue("grade", selectedOption.year || "");
      setValue("section", selectedOption.section || "");
    }
  };

  const onSubmit = async (data) => {
    if (!data.sr_code) {
      alert("Please provide a valid Student Number.");
      return;
    }

    if (data.purpose === "Others" && !data.other_purpose.trim()) {
      alert("Please specify the purpose.");
      return;
    }

    try {
      const response = await AxiosInstance.post(
        "/appointment/",
        {
          ...data,
          start: selectedSlot.start,
          end: selectedSlot.end,
        },
        {
          headers: { Authorization: `Token ${localStorage.getItem("token")}` },
        }
      );

      setAppointments((prev) => [
        ...prev,
        {
          ...response.data,
          start: new Date(response.data.start),
          end: new Date(response.data.end),
        },
      ]);
      showSnackbar("Appointment added successfully!", "success");
      reset(); // Reset the form after submission
      setOpenDialog(false);
    } catch (error) {
      console.error(
        "Error creating appointment:",
        error.response?.data || error.message
      );
      showSnackbar("Error creating appointment. Please try again.", "error");
    }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage({ message, severity });
    setOpenSnackbar(true);
  };

  const fetchAppointments = async () => {
    try {
      const response = await AxiosInstance.get("/appointment/", {
        headers: { Authorization: `Token ${localStorage.getItem("token")}` },
      });
      const formattedAppointments = response.data.map((appointment) => ({
        ...appointment,
        start: new Date(appointment.start),
        end: new Date(appointment.end),
      }));
      setAppointments(formattedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div>
      <h1>Schedule an Appointment</h1>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleSlotSelect}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Schedule Appointment</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* SR Code Field */}
            <Controller
              name="sr_code"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={getValues("sr_code")}
                  options={options}
                  loading={loading}
                  getOptionLabel={(option) => option.sr_code || ""}
                  noOptionsText="No results found"
                  onInputChange={(e, value) => handleSearch(value)}
                  onChange={(_, selectedOption) => handleOptionSelect(selectedOption)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search SR Code"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              )}
            />

            {/* Name Field */}
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  value={getValues("name")}
                  options={options}
                  loading={loading}
                  getOptionLabel={(option) =>
                    `${option.first_name || ""} ${option.last_name || ""}`
                  }
                  noOptionsText="No results found"
                  onInputChange={(e, value) => handleSearch(value)}
                  onChange={(_, selectedOption) => handleOptionSelect(selectedOption)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Student Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                    />
                  )}
                />
              )}
            />

            {/* Grade Field */}
            <Controller
              name="grade"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Grade"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />

            {/* Section Field */}
            <Controller
              name="section"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Section"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />

            {/* Purpose Field */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Purpose</InputLabel>
              <Controller
                name="purpose"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select {...field}>
                    <MenuItem value="Academic">Academic</MenuItem>
                    <MenuItem value="Personal">Personal</MenuItem>
                    <MenuItem value="Career">Career</MenuItem>
                    <MenuItem value="Others">Others</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          severity={snackbarMessage.severity}
          onClose={() => setOpenSnackbar(false)}
        >
          {snackbarMessage.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ScheduleAppointment;
