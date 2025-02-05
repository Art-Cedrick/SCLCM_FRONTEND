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
import { useAppointmentStore } from "../store/useAppointmentStore";
const localizer = momentLocalizer(moment);

const ScheduleAppointment = () => {
  const { control, handleSubmit, reset, setValue, getValues, watch } = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSelectedAppOpen, setIsSelectedAppOpen] = useState(false);

  const { appointments, status, messagePrompt, addAppointment, handleDelete, selectedAppointment, setSelectedAppointment, fetchAppointments } = useAppointmentStore();

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

    if(!data["time-in-date"] || !data["time-out-date"] || !data.purpose || !data.sr_code){
      toast.error("Please fill up the required fields");
      return;
    }
    addAppointment(data);
    reset(); 
    setOpenDialog(false);

  };

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
