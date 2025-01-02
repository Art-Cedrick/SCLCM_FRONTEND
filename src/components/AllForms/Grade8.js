import React, { useEffect, useState } from "react";
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

const Grade8 = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    conduct: "",
    self_image: "",
    worry: "",
    neg_perl_rel: "",
    antisocial: "",
    lie: "",
    problem_index: "",
    c: "",
    si: "",
    w: "",
    npr: "",
    a_s: "",
    l: "",
    pi: "",
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
        ? AxiosInstance.put(`/grade_eight/${initialData.id}/`, data)
        : AxiosInstance.post(`/grade_eight/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gradeeightData");
        console.log("Data invalidated");
        queryClient.refetchQueries("gradeeightData");
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
            Grade 8
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
        <Stack spacing={3}>
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
              name="conduct"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Conduct"
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  sx={{ flex: 1, minWidth: "200px" }}
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
              name="worry"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Worry"
                  {...field}
                  options={["Below Average", "Average", "Above Average"]}
                  sx={{ flex: 1, minWidth: "200px" }}
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
                  sx={{ flex: 1, minWidth: "200px" }}
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
              name="lie"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Lie"
                  {...field}
                  options={["Tapat", "Medya-Medya", "Sinungaling"]}
                  sx={{ flex: 1, minWidth: "200px" }}
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
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
            <Controller
              name="c"
              control={control}
              render={({ field }) => (
                <TextField
                  label="C"
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
              name="si"
              control={control}
              render={({ field }) => (
                <TextField
                  label="SI"
                  {...field}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
            <Controller
              name="w"
              control={control}
              render={({ field }) => (
                <TextField
                  label="W"
                  {...field}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
            <Controller
              name="npr"
              control={control}
              render={({ field }) => (
                <TextField
                  label="NPR"
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
              name="a_s"
              control={control}
              render={({ field }) => (
                <TextField
                  label="AS"
                  {...field}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
            <Controller
              name="l"
              control={control}
              render={({ field }) => (
                <TextField
                  label="L"
                  {...field}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
            <Controller
              name="pi"
              control={control}
              render={({ field }) => (
                <TextField
                  label="PI"
                  {...field}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
          </Stack>

          {/* Submit Button */}
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
        </Stack>
      </Paper>
    </form>
  );
};

export default Grade8;
