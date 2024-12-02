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
import { useForm, Controller } from "react-hook-form";
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios";

const FourthYear = () => {
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    course_program: "",
    l_raw: "",
    l_s: "",
    l_vi: "",
    q_percent: "",
    q_s: "",
    sq_vi: "",
    t_raw: "",
    t_percent: "",
    t_s: "",
    t_vi: "",
    kiersey: "",
    written: "",
    negotiating_persuading: "",
    verbal_communication: "",
    co_op: "",
    investigating_analyzing: "",
    leadership: "",
    planning_organizing: "",
    numeracy: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  // Submit handler
  const submission = (data) => {
    AxiosInstance.post(`/fourth_year/ `, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      course_program: data.course_program,
      l_raw: data.l_raw,
      l_s: data.l_s,
      l_vi: data.l_vi,
      q_percent: data.q_percent,
      q_s: data.q_s,
      sq_vi: data.sq_vi,
      t_raw: data.t_raw,
      t_percent: data.t_percent,
      t_s: data.t_s,
      t_vi: data.t_vi,
      kiersey: data.kiersey,
      written: data.written,
      negotiating_persuading: data.negotiating_persuading,
      verbal_communication: data.verbal_communication,
      co_op: data.co_op,
      investigating_analyzing: data.investigating_analyzing,
      leadership: data.leadership,
      planning_organizing: data.planning_organizing,
      numeracy: data.numeracy,
    })
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
      <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            4th Year
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: "40px",
              borderRadius: "8px",
              backgroundColor: "#f7f9fc",
              minHeight: "50vh",
            }}
          >
            <Stack spacing={2}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Student Name:"
                      variant="outlined"
                      fullWidth
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
                      {...field}
                      label="Age:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Sex:"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      options={["M", "F"]}
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="gradeLevel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Grade Level:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="course_program"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Course/Program:"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      options={["Course 1", "Course 2", "Course 3"]}
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="l_raw"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="L-Raw:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="l-s"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="L - S:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="l_vi"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="L - VI:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="q-raw"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Q - Raw:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="q_percent"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Q - %:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="q_s"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Q - S:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="sq_vi"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="SQ - VI:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="t_raw"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="T - Raw:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="t_percent"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="T - %:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="t_s"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="T - S:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="t_vi"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="T - VI:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="kiersey"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Kiersey Temperament Sorter:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="written"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Written:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="negotiating_persuading"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Negotiating Persuading:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="verbal_communication"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Verbal Communication:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="co_op"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Co-op:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="investigating_analyzing"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Investigating Analyzing:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="leadership"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Leadership:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="planning_organizing"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Planning Organizing:"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="numeracy"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Numeracy:"
                      variant="outlined"
                      fullWidth
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
        </CardContent>
      </Card>
    </form>
  );
};
export default FourthYear;
