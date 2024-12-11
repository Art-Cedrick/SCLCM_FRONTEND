import React, { useEffect } from "react";
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
import { useMutation, useQueryClient } from "react-query";

const Grade9 = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    top_one: "",
    top_two: "",
    top_three: "",
    self_control: "",
    mas_fem: "",
    status: "",
    infrequency: "",
    acquiescence: "",
    r: "",
    i: "",
    a: "",
    s: "",
    e: "",
    c: "",
    se: "",
    mf: "",
    st: "",
    inf: "",
    ac: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) =>
      initialData
        ? AxiosInstance.put(`/grade_nine/${initialData.id}/`, data)
        : AxiosInstance.post(`/grade_nine/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gradenineData");
        console.log("Data invalidated");
        queryClient.refetchQueries("gradenineData");
        console.log("Data refetched");
        reset();
        onClose();
        console.log("Data submitted and table refreshed");
      },
      onError: (error) => {
        console.error("Error submitting data", error);
      },
    }
  );

  const submission = (data) => mutation.mutate(data);
  return (
    <form onSubmit={handleSubmit(submission)}>
      {/* <Typography variant="h5" gutterBottom align="center">
            Grade 9
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
                    "Ignatius",
                    "Joseph",
                    "Lorenzo",
                    "Padre Pio",
                    "Andrew",
                    
                  ]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="top_one"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Top 1:"
                  {...field}
                  options={[
                    "Realistic",
                    "Investigative",
                    "Artistic",
                    "Social",
                    "Enterprising",
                    "Conventional",
                  ]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="top_two"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Top 2:"
                  {...field}
                  options={[
                    "Realistic",
                    "Investigative",
                    "Artistic",
                    "Social",
                    "Enterprising",
                    "Conventional",
                  ]}
                  fullWidth
                />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="top_three"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Top 3:"
                  {...field}
                  options={[
                    "Realistic",
                    "Investigative",
                    "Artistic",
                    "Social",
                    "Enterprising",
                    "Conventional",
                  ]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="self_control"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Self Control:"
                  {...field}
                  options={["High", "Low"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="mas_fem"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Masculinity-Femininity:"
                  {...field}
                  options={["High", "Low"]}
                  fullWidth
                />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Status:"
                  {...field}
                  options={["1", "2", "3"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="infrequency"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Infrequency:"
                  {...field}
                  options={["High", "Low"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="acquiescence"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Acquiescence:"
                  {...field}
                  options={["High", "Low"]}
                  fullWidth
                />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="r"
              control={control}
              render={({ field }) => (
                <TextField label="R:" {...field} fullWidth />
              )}
            />
            <Controller
              name="i"
              control={control}
              render={({ field }) => (
                <TextField label="I:" {...field} fullWidth />
              )}
            />
            <Controller
              name="a"
              control={control}
              render={({ field }) => (
                <TextField label="A:" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="s"
              control={control}
              render={({ field }) => (
                <TextField label="S:" {...field} fullWidth />
              )}
            />
            <Controller
              name="e"
              control={control}
              render={({ field }) => (
                <TextField label="E:" {...field} fullWidth />
              )}
            />
            <Controller
              name="c"
              control={control}
              render={({ field }) => (
                <TextField label="C:" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="se"
              control={control}
              render={({ field }) => (
                <TextField label="Sc:" {...field} fullWidth />
              )}
            />
            <Controller
              name="mf"
              control={control}
              render={({ field }) => (
                <TextField label="Mf:" {...field} fullWidth />
              )}
            />
            <Controller
              name="st"
              control={control}
              render={({ field }) => (
                <TextField label="St:" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="inf"
              control={control}
              render={({ field }) => (
                <TextField label="Inf:" {...field} fullWidth />
              )}
            />
            <Controller
              name="ac"
              control={control}
              render={({ field }) => (
                <TextField label="Ac:" {...field} fullWidth />
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

export default Grade9;
