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

const Grade1 = () => {
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    test: "",
    rawscore: "",
    percentile: "",
    stanine: "",
    rating: "",
    vocab: "",
    letter: "",
    visual: "",
    auditory: "",
    comp: "",
    number: "",
    writing: "",
    spelling: "",
    q_vocab: "",
    q_letter: "",
    q_visual: "",
    q_auditory: "",
    q_comp: "",
    q_number: "",
    q_writing: "",
    q_spelling: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  // Submit handler
  const submission = (data) => {
    AxiosInstance.post(`/grade_one/`, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      section: data.section,
      test: data.test,
      rawscore: data.rawscore,
      percentile: data.percentile,
      stanine: data.stanine,
      rating: data.rating,
      vocab: data.vocab,
      letter: data.letter,
      visual: data.visual,
      auditory: data.auditory,
      comp: data.comp,
      number: data.number,
      writing: data.writing,
      spelling: data.spelling,
      q_vocab: data.q_vocab,
      q_letter: data.q_letter,
      q_visual: data.q_visual,
      q_auditory: data.q_auditory,
      q_comp: data.q_comp,
      q_number: data.number,
      q_writing: data.q_writing,
      q_spelling: data.q_spelling,
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
            Grade 1
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
              {/* Student Name */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField label="Student Name" {...field} fullWidth />
                )}
              />

              {/* Grouped Fields */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Age"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Sex"
                      {...field}
                      options={["M", "F"]}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="gradeLevel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Grade Level"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Section"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="test"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Test"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="rawscore"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Raw Score"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="percentile"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Percentile"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="stanine"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Stanine"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Rating"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="vocab"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Vocab"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="letter"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Letters"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="visual"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Visual"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="auditory"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Auditory"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="comp"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Comp"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Number"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="writing"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Writing"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="spelling"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Spelling"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="q_vocab"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Vocab"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="q_letter"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Letters"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="q_visual"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Visual"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="q_auditory"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Audit"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="q_comp"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Comp"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="q_number"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Number"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
                <Controller
                  name="q_writing"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Writing"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="q_spelling"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(Q)Spelling"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px" }}
                    />
                  )}
                />
              </Stack>

              {/* Submit Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
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
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </form>
  );
};

export default Grade1;
