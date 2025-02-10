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
import AxiosInstance from "./Axios";
import SingleSelect from "./Forms/SingleSelect"; // Import the custom SingleSelect
import { useMutation, useQueryClient } from "react-query";

const Grade12 = ({initialData, onClose}) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    top1: "",
    top2: "",
    top3: "",
    ad: "",
    sc: "",
    ass: "",
    so: "",
    s: "",
    f: "",
    c: "",
  };

  const { control, handleSubmit, reset, setValue, getValues } = useForm({ defaultValues: defaultValues });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) => 
      initialData
      ? AxiosInstance.put(`/grade_twelve/${initialData.id}/`, data)
      : AxiosInstance.post(`/grade_twelve/`, data), {
      onSuccess: () => {
        queryClient.invalidateQueries('gradetwelveData');
        console.log("Data invalidated");
        queryClient.refetchQueries('gradetwelveData');
        console.log("Data refetched");
        reset();
        onClose();
        console.log("Data submitted and table refreshed");
      }, onError: (error) => {
        console.error("Error submitting data", error);
      },
    }
  )

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
  const sectionOptions = [
    "Fatima",
    "Consolation",
    "Grace",
    "Assumption",
    "Guadalupe",
    "Good Voyage",
    "Good Remedy",
    "Perpetual Help",
    "Mt. Carmel",
    "Lourdes",
    "Pillar / Mercy",
  ];

  const topOptions = [
    "Achievement Drive",
    "Self Confidence",
    "Assertiveness",
    "Service Orientation",
    "Sociability",
    "Flexibility",
    "Conscientiousness",
  ];

  return (
    <form onSubmit={handleSubmit(submission)}>
      {/* <Typography variant="h5" gutterBottom align="center">
            Grade 12
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
          {/* Student Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Student Name"
                {...field}
                sx={{
                  flex: 1,
                  minWidth: "100%",
                  marginBottom: { xs: 2, sm: 0 },
                }}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            )}
          />

          {/* Age and Sex */}
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
                  value={field.value}
                  onChange={field.onChange}
                  options={["M", "F"]}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
          </Stack>

          {/* Grade Level and Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ flexWrap: "wrap" }}
          >
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
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Section"
                  {...field}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
          </Stack>

          {/* Top 1, Top 2, Top 3 */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ flexWrap: "wrap" }}
          >
            <Controller
              name="top1"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Top 1"
                  value={field.value}
                  onChange={field.onChange}
                  options={topOptions}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
            <Controller
              name="top2"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Top 2"
                  value={field.value}
                  onChange={field.onChange}
                  options={topOptions}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
          </Stack>

          {/* Top 3 and AD */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ flexWrap: "wrap" }}
          >
            <Controller
              name="top3"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Top 3"
                  value={field.value}
                  onChange={field.onChange}
                  options={topOptions}
                  sx={{ flex: 1, minWidth: "200px" }}
                />
              )}
            />
            <Controller
              name="ad"
              control={control}
              render={({ field }) => (
                <TextField
                  label="AD"
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

          {/* SC, Ass, SO */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ flexWrap: "wrap" }}
          >
            <Controller
              name="sc"
              control={control}
              render={({ field }) => (
                <TextField
                  label="SC"
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
              name="ass"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Ass"
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

          {/* SO, S */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ flexWrap: "wrap" }}
          >
            <Controller
              name="so"
              control={control}
              render={({ field }) => (
                <TextField
                  label="SO"
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
              name="s"
              control={control}
              render={({ field }) => (
                <TextField
                  label="S"
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

          {/* F, C */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ flexWrap: "wrap" }}
          >
            <Controller
              name="f"
              control={control}
              render={({ field }) => (
                <TextField
                  label="F"
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
              name="c"
              control={control}
              render={({ field }) => (
                <TextField
                  label="C"
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
          {/* <Box
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
          </Box> */}
        </Stack>
      </Paper>
    </form>
  );
};

export default Grade12;
