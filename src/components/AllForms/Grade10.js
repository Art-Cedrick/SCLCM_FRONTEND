

import React from "react";
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Stack,
  Button,
  TextField
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios";

const Grade10 = () => {
  const defaultValues = {
    name: '',
    age: '',
    sex: '',
    gradeLevel: '',
    section: '',
    raw_score: '',
    percentile: '',
    stanine: '',
    verbal_interpretation: '',
  };

  const { control, handleSubmit, reset, setValue } = useForm({ defaultValues: defaultValues });

  const submission = (data) => {
    AxiosInstance.post(`/grade_ten/`, data)
      .then(response => {
        console.log("Data submitted successfully:", response.data);
        reset(); // Reset form after successful submission
      })
      .catch(error => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submission)}>

      {/* <Typography variant="h5" gutterBottom align="center">
            Grade 10
          </Typography> */}
      <Paper
        elevation={0}
        sx={{
          paddingY: "20px",
          borderRadius: "8px",
        }}
      >
        <Stack spacing={2}>
          {/* First row with one column for name */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField label="Student Name:" {...field} fullWidth />
              )}
            />
          </Stack>

          {/* Subsequent rows with three columns each */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField label="Age:" {...field} fullWidth />
              )}
            />
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Sex:"
                  {...field}
                  options={["M", "F"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="gradeLevel"
              control={control}
              render={({ field }) => (
                <TextField label="Grade Level:" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Section:"
                  {...field}
                  options={[
                    "Gabriel",
                    "Michael",
                    "Judiel",
                    "Raphael",
                    "Sealtiel",
                    "Uriel",
                  ]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="raw_score"
              control={control}
              render={({ field }) => (
                <TextField label="Raw Score:" {...field} fullWidth />
              )}
            />
            <Controller
              name="percentile"
              control={control}
              render={({ field }) => (
                <TextField label="Percentile:" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="stanine"
              control={control}
              render={({ field }) => (
                <TextField label="Stanine:" {...field} fullWidth />
              )}
            />
            <Controller
              name="verbal_interpretation"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Verbal Interpretation:"
                  {...field}
                  options={[
                    "Superior",
                    "Above Average",
                    "Average",
                    "Below Average",
                    "Low",
                    "Poor",
                  ]}
                  fullWidth
                />
              )}
            />
          </Stack>
        </Stack>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
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

export default Grade10;
