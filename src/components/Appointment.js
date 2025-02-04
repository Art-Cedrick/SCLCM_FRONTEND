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
import { Controller, useForm } from "react-hook-form";
import AxiosInstance from "./AllForms/Axios";
import { format } from "date-fns";
import { TimePicker } from "@mui/x-date-pickers";

const localizer = momentLocalizer(moment);

const ScheduleAppointment = () => {
  const { control, handleSubmit, reset, setValue, getValues, watch } = useForm();
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectedTime = watch("time");

  const handleSlotSelect = (slotInfo) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize time to midnight
  
    const selectedDateChecker = new Date(slotInfo.start);
    selectedDateChecker.setHours(0, 0, 0, 0); // Normalize time to midnight
  

    if (selectedDateChecker < today) {
      console.warn("Cannot select past dates!");
      return; // Prevent selection
    }
  

    const { start, end } = slotInfo;
    const isOverlap = appointments.some(
      (appointment) =>
        (start >= appointment.start && start < appointment.end) ||
        (end > appointment.start && end <= appointment.end)
    );

    const selectedDate = slotInfo.start.toISOString().split("T")[0]; 
    console.log(selectedDate);
    if (isOverlap) {
      alert("This time slot is already booked.");
      return;
    }



    setSelectedSlot(slotInfo);

    setOpenDialog(true);
  };

  useEffect(() => {
    if (selectedSlot) {
      const { start, end } = selectedSlot;
      if (selectedTime) {
        const selectedTime = new Date(watch("time"));
        const startTime = new Date(start);
        startTime.setHours(selectedTime.getHours());
        startTime.setMinutes(selectedTime.getMinutes());

        const endTime = new Date(start);
        endTime.setHours(selectedTime.getHours());
        endTime.setMinutes(selectedTime.getMinutes());

        setSelectedSlot({ start: startTime, end: endTime });
        setStartDate(startTime);
        setEndDate(endTime);
      } else {
        setStartDate(start);
        setEndDate(end);
      }
    }
  }, [selectedTime]);

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
      // console.log(selectedDate);
      setValue("sr_code", selectedOption.sr_code || "");
      setValue(
        "name",
        `${selectedOption.firstname || ""} ${selectedOption.lastname || ""}`
      );
      setValue("grade", selectedOption.year || "");
      setValue("section", selectedOption.section || "");
    }
  };

  const onSubmit = async (data) => {

    const timeIn = new Date(data["time-in-date"]);  
    const timeOut = new Date(data["time-out-date"]);
    console.log(timeOut.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    console.log(timeOut.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    
    console.log(data);

    // if (!data.sr_code) {
    //   alert("Please provide a valid Student Number.");
    //   return;
    // }

    // if (data.purpose === "Others" && !data.other_purpose.trim()) {
    //   alert("Please specify the purpose.");
    //   return;
    // }

    // try {
    //   const response = await AxiosInstance.post(
    //     "/appointment/",
    //     {
    //       ...data,
    //       start: startDate.toLocaleString(),
    //       end: endDate.toLocaleString(),
    //       date:
    //         format(new Date(selectedSlot.start), "yyyy-MM-dd"),
    //       title: data.purpose,
    //       time: format(new Date(data.time), "HH:mm:ss"),
    //     },
    //     {
    //       headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    //     }
    //   );

    //   setAppointments((prev) => [
    //     ...prev,
    //     {
    //       ...response.data,
    //       start: new Date(response.data.start),
    //       end: new Date(response.data.end)
    //     },
    //   ]);
    //   showSnackbar("Appointment added successfully!", "success");
    //   reset(); // Reset the form after submission
    //   setOpenDialog(false);
    // } catch (error) {
    //   console.error(
    //     "Error creating appointment:",
    //     error.response?.data || error.message
    //   );
    //   showSnackbar("Error creating appointment. Please try again.", "error");
    // }
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage({ message, severity });
    setOpenSnackbar(true);
  };

  const fetchAppointments = async () => {
    // try {
    //   const response = await AxiosInstance.get("/appointment/", {
    //     headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    //   });
    //   const formattedAppointments = response.data.map((appointment) => ({
    //     ...appointment,
    //     title: appointment.title,
    //     start: new Date(appointment.start),
    //     end: new Date(appointment.end),
    //   }));
    //   setAppointments(formattedAppointments);
    // } catch (error) {
    //   console.error("Error fetching appointments:", error);
    // }
    setAppointments([
      // create a sample appointment the duration is 1 hour
      {
        title: "Sample Appointment",
        start: new Date(),
        end: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
      },
    ]);  

  };

  const dayPropGetter = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (date < today) {
      return {
        style: {
          pointerEvents: "none", // Prevent clicking
          backgroundColor: "#f0f0f0", // Light gray background
          color: "#aaa", // Gray text
        },
      };
    }
    return {};
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
        dayPropGetter={dayPropGetter} // Apply past date styling
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
            {/* <Controller
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
            /> */}
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              )}
            />



            {/* Time in Date Format */}
            <Controller
              name="time-in-date"
              control={control}
              defaultValue={null}

              render={({ field: { onChange, value } }) => (
                <TimePicker
                  value={value}
                  onChange={onChange}
                  fullWidth
                  label="Time"
                  margin="normal"
                  sx={{ width: '100%', marginTop: '10px' }}
                />
              )}
            />

            {/* End Time date */}
            <Controller
              name="time-out-date"
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value } }) => (
                <TimePicker
                  value={value}
                  onChange={onChange}
                  fullWidth
                  label="End Time"
                  margin="normal"
                  sx={{ width: '100%', marginTop: '10px' }}
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
                    <MenuItem value="Routine Interview">Routine Interview</MenuItem>
                    <MenuItem value="Referral">Referral</MenuItem>
                    <MenuItem value="Individual Planning">Individual Planning</MenuItem>
                    <MenuItem value="Counseling">Counseling</MenuItem>
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
