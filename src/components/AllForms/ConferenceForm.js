import React, { useEffect } from "react";
import { Box, Typography, Paper, TextField, Button, Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import SingleSelect from "./Forms/SingleSelect";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useMutation, useQueryClient } from "react-query";

const ConferenceForm = ({initialData, onClose}) => {

  const queryClient = useQueryClient();

  const defaultValues = {
    type: '',
    name: '',
    date: '',
    grade: '',
    section: '',
    teachers: '',
    purpose: '',
    others: '',
    note: '',
    recommendations: '',
  }

  const { control, handleSubmit, reset } = useForm({defaultValues: initialData || defaultValues}); // Only destructure control since we are not using form submission

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) => 
      initialData
      ? AxiosInstance.put(`/conferenceform/${initialData.id}/`, {
        type: data.type,
        name: data.name,
        date: data.date,
        grade: data.grade,
        section: data.section,
        teachers: data.teachers,
        purpose: data.purpose,
        others: data.others,
        note: data.note,
        recommendations: data.recommendations,})
      : AxiosInstance.post(`/conferenceform/`, {
        type: data.type,
        name: data.name,
        date: data.date,
        grade: data.grade,
        section: data.section,
        teachers: data.teachers,
        purpose: data.purpose,
        others: data.others,
        note: data.note,
        recommendations: data.recommendations,
    }), {
      onSuccess: () => {
        queryClient.invalidateQueries('conferenceData');
        console.log("Data invalidated");
        queryClient.refetchQueries('conferenceData');
        console.log("Data refetched");
        reset();
        onClose();
        console.log("Data submitted and table refreshed");
      }, onError: (error) => {
        console.error("Error submitting data", error);
      },
    }
  )

  const submission = (data) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(submission)}>
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "800px", // Restrict the maximum width
        padding: 4,
        backgroundColor: "#fafafa", // Light gray background
        borderRadius: 2, // Rounded corners
        margin: "auto", // Center the form horizontally
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        CONFERENCE FORM
      </Typography>
      <Controller
          name = "type"
          control={control}
          render={({field}) => (
          <FormControl fullWidth>
          <InputLabel>Type of Conference</InputLabel>
          <Select
            label = "Type of Conference"
            {...field} >
            <MenuItem value={"Teacher's Conference"}>Teacher's Conference</MenuItem>
            <MenuItem value={"Parent's Conference"}>Parent's Conference</MenuItem>
          </Select> </FormControl> )} />

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
          mt: 2
        }}
      >
        <Controller
          name="name"
          control={control}
          render={({field}) => (
        <TextField
          label="Name of Student"
          {...field}
          sx={{
            flex: 1,
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        /> )} />
        <Controller
            name="date"
            control={control}
            render={({field}) => (
          <TextField
            label="Date"
            {...field}
            type="date"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
            )}
            />
      </Box>

      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <Controller
          name="grade"
          control={control}
          render={({field}) => (
        <TextField
          label="Grade"
          {...field}
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        />)} />
        <Controller
          name="section"
          control={control}
          render={({field}) => (
        <TextField
          label="Section"
          {...field}
          sx={{
            width: "100%",
            mt: 2,
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        /> )} />
        {/* Add the new TextField here */}
        <Controller
          name="teachers"
          control={control}
          render={({field}) => (
        <TextField
          label="Name of Teacher/s or Parent/s"
          {...field}
          variant="outlined"
          sx={{
            width: "100%",
            mt: 2, // Add margin-top for spacing
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        /> )} />

        <Typography
          variant="body1"
          sx={{
            color: "#3f3f3f",
            marginTop: 2,
            fontWeight: "medium",
            textAlign: "left",
          }}
        >
          Purpose of Conference:
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // Align items vertically centered
            gap: 2,
            mt: 1,
          }}
        >
          <Controller
          name = "purpose"
          control={control}
          render={({field}) => (
        <SingleSelect
          label = "Purpose of Conference"
          {...field}
          options = {[
            "Academic", 
            "Behavioral", 
            "Others"
          ]}
        /> )} />
          <Box sx={{ display: "flex" }}>
            <Controller
              name="others"
              control={control}
              render={({field}) => (
            <TextField
              label="Others"
              {...field}
              variant="standard"
              sx={{
                width: "200px",
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                },
              }}
            /> )} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <Controller
          name="note"
          control={control}
          render={({field}) => (
        <TextField
          label="Counselor's Note:"
          {...field}
          multiline
          rows={4}
          sx={{
            width: "100%", // Ensures the field takes up the full width of the container
          }}
        /> )} />
      </Box>

      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <Controller
          name="recommendations"
          control={control}
          render={({field}) => (
        <TextField
          label="Recommendation/s:"
          {...field}
          multiline
          rows={4}
          sx={{
            width: "100%", // Ensures the field takes up the full width of the container
          }}
        /> )} />
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
      >
        <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginTop: "10px" }}
            >
              Submit
            </Button>
      </Box>
    </Paper>
    </form>
  );
};

export default ConferenceForm;
