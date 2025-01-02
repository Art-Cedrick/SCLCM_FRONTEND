import React, { useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Autocomplete,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

const Grade1 = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();
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

  const { control, handleSubmit, reset, setValue, getValues } = useForm({
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) =>
      initialData
        ? AxiosInstance.put(`/grade_one/${initialData.id}/`, data)
        : AxiosInstance.post(`/grade_one/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gradeoneData");
        console.log("Data invalidated");
        queryClient.refetchQueries("gradeoneData");
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

  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOptionSelect = (selectedOption) => {
    if (selectedOption) {
      // Update all fields based on the selected student
      setValue("sr_code", selectedOption.sr_code || "");
      setValue(
        "name",
        `${selectedOption.firstname || ""} ${selectedOption.lastname || ""}`
      );
      setValue("gradeLevel", selectedOption.year.replace("Grade", "Grade ") || "");
      setValue("section", selectedOption.section || "");
    }
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

  const submission = (data) => mutation.mutate(data);

  return (
    <form onSubmit={handleSubmit(submission)}>
      {/* <Typography variant="h5" gutterBottom align="center">
            Grade 1
          </Typography> */}
      <Paper
        elevation={0}
        sx={{
          paddingY: "20px",
          borderRadius: "8px",
        }}
      >
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
        <Stack spacing={2}>
          {/* Student Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField label="Student Name" {...field} fullWidth slotProps={{
                input: {
                  readOnly: true,
                },
              }} />
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
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
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
                  sx={{ flex: 1, minWidth: "200px" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
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
    </form>
  );
};

export default Grade1;
