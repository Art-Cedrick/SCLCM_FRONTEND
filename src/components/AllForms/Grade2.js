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

const Grade2 = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    totalEQ: "",
    verbalInterpretation: "",
    stanine: "",
    sa: "",
    mme: "",
    sm: "",
    e: "",
    hr: "",
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
        ? AxiosInstance.put(`/grade_two/${initialData.id}/`, data)
        : AxiosInstance.post(`/grade_two/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gradetwoData");
        console.log("Data invalidated");
        queryClient.refetchQueries("gradetwoData");
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
            Grade 2
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
                label="Name"
                {...field}
                placeholder=""
                sx={{
                  flex: 1,
                  minWidth: "100%",
                  marginBottom: { xs: 2, sm: 0 },
                }} // Full width
              />
            )}
          />

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
                  placeholder=""
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
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
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
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
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
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
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
                />
              )}
            />
            <Controller
              name="totalEQ"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Total EQ"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
                />
              )}
            />
            <Controller
              name="verbalInterpretation"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Verbal Interpretation"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
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
              name="stanine"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Stanine"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
                />
              )}
            />
            <Controller
              name="sa"
              control={control}
              render={({ field }) => (
                <TextField
                  label="SA"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
                />
              )}
            />
            <Controller
              name="mme"
              control={control}
              render={({ field }) => (
                <TextField
                  label="MME"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
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
              name="sm"
              control={control}
              render={({ field }) => (
                <TextField
                  label="SM"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
                />
              )}
            />
            <Controller
              name="e"
              control={control}
              render={({ field }) => (
                <TextField
                  label="E"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
                />
              )}
            />
            <Controller
              name="hr"
              control={control}
              render={({ field }) => (
                <TextField
                  label="HR"
                  {...field}
                  sx={{
                    flex: 1,
                    minWidth: "200px",
                    marginBottom: { xs: 2, sm: 0 },
                  }}
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
    </form>
  );
};

export default Grade2;
