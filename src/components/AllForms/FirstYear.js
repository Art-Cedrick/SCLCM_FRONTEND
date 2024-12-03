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

const FirstYear = () => {
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    course: "",
    vi_gstm: "",
    vi_nt: "",
    vi_epp: "",
    vi_w: "",
    vi_mc: "",
    vi_cuca: "",
    vi_asm: "",
    gtsm: "",
    nt: "",
    epp: "",
    w: "",
    mc: "",
    cu_ca: "",
    asm: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  // Submit handler
  const submission = (data) => {
    AxiosInstance.post(`/first_year/`, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      course: data.course,
      vi_gstm: data.vi_gstm,
      vi_nt: data.vi_nt,
      vi_epp: data.vi_epp,
      vi_w: data.vi_w,
      vi_mc: data.vi_mc,
      vi_cuca: data.vi_cuca,
      vi_asm: data.vi_asm,
      gtsm: data.gtsm,
      nt: data.nt,
      epp: data.epp,
      w: data.w,
      mc: data.mc,
      cu_ca: data.cu_ca,
      asm: data.asm,
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
            1st Year
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
                  name="gradeLevel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Grade Level:"
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
                  name="vi_gstm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(VI)GSTM:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="vi_nt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(VI)NT:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="vi_epp"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(VI)EPP:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="vi_w"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(VI)W:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="vi_mc"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(VI)MC:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="vi_cuca"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(VI)CU/CA:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="vi_asm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="(VI)ASM:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="gtsm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="GTSM:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="nt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="NT:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="epp"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="EPP:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="w"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="W:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="mc"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="MC:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="cu_ca"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="CU/CA:"
                      {...field}
                      fullWidth
                      variant="outlined"
                    />
                  )}
                />
                <Controller
                  name="asm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="ASM:"
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
        </CardContent>
      </Card>
    </form>
  );
};

export default FirstYear;
