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


const Grade4 = ({initialData, onClose}) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: '',
    age: '',
    sex: '',
    gradeLevel: '',
    section: '',
    conduct: '',
    self_image: '',
    worry: '',
    neg_perl_rel: '',
    antisocial: '',
    lie: '',
    problem_index: '',
    c: '',
    si: '',
    w: '',
    npr: '',
    a_s: '',
    l: '',
    pi: '',
  }

  const { control, handleSubmit, reset, setValue } = useForm({ defaultValues: defaultValues });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) => 
      initialData
      ? AxiosInstance.put(`/grade_four/${initialData.id}/`, data)
      : AxiosInstance.post(`/grade_four/`, data), {
      onSuccess: () => {
        queryClient.invalidateQueries('gradefourData');
        console.log("Data invalidated");
        queryClient.refetchQueries('gradefourData');
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

      {/* <Typography variant="h5" gutterBottom align="center">
            Grade 4
          </Typography> */}
      <Paper
        elevation={0}
        sx={{
          paddingY: "20px",
          borderRadius: "8px",
        }}
      >
        <Stack spacing={3}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Student Name"
                {...field}
                fullWidth
              />
            )}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField label="Age" {...field} fullWidth />
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
                  fullWidth
                />
              )}
            />
            <Controller
              name="gradeLevel"
              control={control}
              render={({ field }) => (
                <TextField label="Grade Level" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Section"
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
              name="conduct"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Conduct"
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="self_image"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Self Image"
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  fullWidth
                />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="worry"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Worry"
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="neg_perl_rel"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Neg. Perl. Rel."
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="antisocial"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="AntiSocial"
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  fullWidth
                />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="lie"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Lie"
                  {...field}
                  options={["Tapat", "Medya - Medya", "Sinungaling"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="problem_index"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Problem Index"
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  fullWidth
                />
              )}
            />
            <Controller
              name="c"
              control={control}
              render={({ field }) => (
                <TextField label="C" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="si"
              control={control}
              render={({ field }) => (
                <TextField label="SI" {...field} fullWidth />
              )}
            />
            <Controller
              name="w"
              control={control}
              render={({ field }) => (
                <TextField label="W" {...field} fullWidth />
              )}
            />
            <Controller
              name="npr"
              control={control}
              render={({ field }) => (
                <TextField label="NPR" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="a_s"
              control={control}
              render={({ field }) => (
                <TextField label="AS" {...field} fullWidth />
              )}
            />
            <Controller
              name="l"
              control={control}
              render={({ field }) => (
                <TextField label="L" {...field} fullWidth />
              )}
            />
            <Controller
              name="pi"
              control={control}
              render={({ field }) => (
                <TextField label="PI" {...field} fullWidth />
              )}
            />
          </Stack>

          {/* Submit Button */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Box>
        </Stack>
      </Paper>
    </form>
  );
};

export default Grade4;
