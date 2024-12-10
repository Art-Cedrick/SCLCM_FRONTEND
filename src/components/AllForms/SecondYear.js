import React from "react";
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form"; // Import Controller
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios";

const SecondYear = () => {
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    yearLevel: "",
    course: "",
    inc: "",
    intrapersonal: "",
    stress_management: "",
    adaptability: "",
    general_mood: "",
    total_eq: "",
    positive_impression: "",
    a_vi: "",
    b_vi: "",
    c_vi: "",
    d_vi: "",
    e_vi: "",
    f_vi: "",
    g_vi: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  // Submit handler
  const submission = (data) => {
    AxiosInstance.post(`/second_year/`, data)
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        reset(); // Reset form after successful submission
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submission)}>

      {/* <Typography variant="h5" gutterBottom align="center">
            2nd Year
          </Typography> */}
      <Paper
        elevation={0}
        sx={{
          paddingY: "20px",
          borderRadius: "8px",
        }}
      >
        <Stack spacing={2}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Student Name:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Age:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <SingleSelect
              label="Sex:"
              name="sex"
              control={control}
              options={["M", "F"]}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="yearLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Year Level:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <SingleSelect
              label="Course:"
              name="course"
              control={control}
              options={["Course 1", "Course 2", "Course 3", "Course 4"]}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="inc"
              control={control}
              render={({ field }) => (
                <TextField
                  label="INC:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="intrapersonal"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Intrapersonal Scale:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="stress_management"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Stress Management Scale:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="adaptability"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Adaptability Scale:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="general_mood"
              control={control}
              render={({ field }) => (
                <TextField
                  label="General Mood Scale:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="total_eq"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Total EQ:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="positive_impression"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Positive Impression:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="a_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="A (VI):"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="b_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="B (VI):"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="c_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="C (VI):"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="d_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="D (VI):"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="e_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="E (VI):"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="f_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="F (VI):"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="g_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="G (VI):"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
        </Stack>

        {/* Submit Button */}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(submission)}
            sx={{ marginTop: "10px" }}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </form>
  );
};

export default SecondYear;
