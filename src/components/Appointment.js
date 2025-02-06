import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Autocomplete,
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
import { TimePicker } from "@mui/x-date-pickers";
import { Toaster, toast } from "sonner";
import dayjs from "dayjs";
import { useAppointmentStore } from "../store/useAppointmentStore";
const localizer = momentLocalizer(moment);

const ScheduleAppointment = () => {
  const { control, handleSubmit, reset, setValue, getValues, watch } = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelectedAppOpen, setIsSelectedAppOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const { appointments, status, messagePrompt, addAppointment, handleDelete, selectedAppointment, setSelectedAppointment, fetchAppointments } = useAppointmentStore();
  const selectedTime = watch("time");

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


  const handleSlotSelect = (slotInfo) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
  
    const selectedDateChecker = new Date(slotInfo.start);
    selectedDateChecker.setHours(0, 0, 0, 0);
  

    if (selectedDateChecker < today) {
      toast.error("You cannot book an appointment on a past date.");
      return; 
    }

    const { start, end } = slotInfo;
  
    // Check if the selected slot overlaps with any existing appointment
    const isOverlap = appointments.some(
      (appointment) =>
        (start >= appointment.start && start < appointment.end) || // Starts inside an existing event
        (end > appointment.start && end <= appointment.end) || // Ends inside an existing event
        (start <= appointment.start && end >= appointment.end) // Completely overlaps an existing event
    );

  
    if (isOverlap) {
      toast.error("This time slot is already booked.");
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

    // if(!data["time-in-date"] || !data["time-out-date"] || !data.purpose || !data.sr_code){
    //   toast.error("Please fill up the required fields");
    //   return;
    // }
    const startDate = data["time-in-date"];
    const endDate = data["time-out-date"];

    const selectedDate = dayjs(selectedSlot.slots[0]); 
    const fullStartDate = selectedDate
      .hour(startDate.hour())
      .minute(startDate.minute());
    
    const fullEndDate = selectedDate
      .hour(endDate.hour()) 
      .minute(endDate.minute()); 
    

    addAppointment({
      sr_code: data.sr_code,
      name: data.name,
      title: data.purpose,
      grade: data.grade,
      section: data.section,
      start: fullStartDate.toString(),
      end: fullEndDate.toString()
    });

    reset(); 
    setOpenDialog(false);

    // const timeIn = new Date(data["time-in-date"]);  
    // const timeOut = new Date(data["time-out-date"]);
    // console.log(timeOut.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
    // console.log(timeOut.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
    
    // console.log(data);

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

  // const showSnackbar = (message, severity = "success") => {
  //   setSnackbarMessage({ message, severity });
  //   setOpenSnackbar(true);
  // };

  // const fetchAppointments = async () => {
  //   try {
  //     const response = await AxiosInstance.get("/appointment/", {
  //       headers: { Authorization: `Token ${localStorage.getItem("token")}` },
  //     });
  //     console.log(response.data);
  //     // const formattedAppointments = response.data.map((appointment) => ({
  //     //   ...appointment,
  //     //   title: appointment.title,
  //     //   start: new Date(appointment.start),
  //     //   end: new Date(appointment.end),
  //     // }));
  //     // setAppointments(formattedAppointments);
  //   } catch (error) {
  //     console.error("Error fetching appointments:", error);
  //   }
  //   // setAppointments([
  //   //   // create a sample appointment the duration is 1 hour
  //   //   {
  //   //     title: "Sample Appointment",
  //   //     start: new Date(),
  //   //     end: new Date(new Date().getTime() + 1 * 60 * 60 * 1000),
  //   //   },
  //   // ]);  

  // };

  const dayPropGetter = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (date < today) {
      return {
        style: {
          pointerEvents: "none", // Prevent clicking
          backgroundColor: "#e6e6e6", // Light gray background
          color: "#aaa", // Gray text
        },
      };
    }
    return {};
  };
  
  const handleEventSelect = (event) => {
    setSelectedAppointment({
      id: event.id,
      title: event.title,
      name: event.name || "John Doe",
      grade: event.grade || "12",
      section: event.section || "A",
      start: event.start,
      end: event.end,
    });

    setIsSelectedAppOpen(true);
  };


  useEffect(() => {
    fetchAppointments();
}, []); 


  return (
    <div>
      <Toaster richColors position="top-right"/>
      <h1>Schedule an Appointment</h1>

        <Calendar
          localizer={localizer}
          events={appointments}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          selectable
          onSelectSlot={handleSlotSelect}
          dayPropGetter={dayPropGetter}
          onSelectEvent={handleEventSelect}
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

            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  sx={{ backgroundColor: '#e6e6e6' }}
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
                  label="Start Time"
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

            {/* Purpose Field */}
            <FormControl fullWidth margin="normal">
              <InputLabel>Purpose</InputLabel>
              {/* i want to add border in this control */}

              <Controller
                name="purpose"
                control={control}
                defaultValue=""
                // rules={{ required: "Purpose is required" }}
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


            {/* Grade Field */}
            <Controller

              name="grade"
              control={control}
              defaultValue=""

              render={({ field }) => (
                <TextField
                  {...field}
                  label="Grade"
                  sx={{ backgroundColor: '#e6e6e6' }}
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
                  sx={{ backgroundColor: '#e6e6e6' }}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />
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

      {isSelectedAppOpen && (
        <Dialog open={isSelectedAppOpen} onClose={() => setIsSelectedAppOpen(false)}>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogContent>
            <div>
              <TextField
                label="Name"
                value={selectedAppointment.name}
                fullWidth
                margin="normal"
                InputProps={{readOnly: true}}
              />
              <TextField 
                label="Grade & Section"
                value={`${selectedAppointment.grade}-${selectedAppointment.section}`}
                fullWidth
                margin="normal"
                InputProps={{readOnly: true}}
              />
              <TextField
                label="Start Time"
                value={moment(selectedAppointment.start).format('MMMM Do YYYY, h:mm a')}
                fullWidth
                margin="normal"
                InputProps={{readOnly: true}}
              />
              <TextField
                label="End Time" 
                value={moment(selectedAppointment.end).format('MMMM Do YYYY, h:mm a')}
                fullWidth
                margin="normal"
                InputProps={{readOnly: true}}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsSelectedAppOpen(false)} color="primary">
              Close
            </Button>
            {/* delete button */}
            <Button onClick={() => {
              handleDelete(selectedAppointment.id)
            }} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

      )}
    </div>
  );
};

export default ScheduleAppointment;
