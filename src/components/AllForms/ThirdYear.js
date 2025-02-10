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
import { useForm, Controller } from "react-hook-form"; // Import Controller
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios";
import { useMutation, useQueryClient } from "react-query";

const ThirdYear = ({initialData, onClose}) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    yearLevel: "",
    course: "",
    hypochondriasis: "",
    denial: "",
    interpersonal_problems: "",
    alienation: "",
    persecutory_ideas: "",
    anxiety: "",
    thinking_disorder: "",
    impulse_expression: "",
    social_isolation: "",
    self_depreciation: "",
    deviation: "",
  };

  const { control, handleSubmit, reset, setValue, getValues } = useForm({ defaultValues: defaultValues });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) => 
      initialData
      ? AxiosInstance.put(`/third_year/${initialData.id}/`, data)
      : AxiosInstance.post(`/third_year/`, data), {
      onSuccess: () => {
        queryClient.invalidateQueries('thirdyearData');
        console.log("Data invalidated");
        queryClient.refetchQueries('thirdyearData');
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
      setValue("yearLevel", selectedOption.year.replace("Grade", "Grade ") || "");
      setValue("course", selectedOption.section || "");
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
            3rd Year
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
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
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
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (

                <SingleSelect
                  {...field}
                  label="Sex:"


                  options={["M", "F"]}
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="yearLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Year Level:"
                  {...field}
                  fullWidth
                  variant="outlined"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
           <Controller
              name="course"
              control={control}
              render={({ field }) => (

                <TextField
                  {...field}
                  label="Course:"
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="hypochondriasis"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Hypochondriasis:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="denial"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Denial:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="interpersonal_problems"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Interpersonal Problems:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="alienation"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Alienation:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="persecutory_ideas"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Persecutory Ideas:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="anxiety"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Anxiety:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="thinking_disorder"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Thinking Disorder:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="impulse_expression"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Impulse Expression:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="social_isolation"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Social Isolation:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
            <Controller
              name="self_depreciation"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Self Depreciation:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="deviation"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Deviation:"
                  {...field}
                  fullWidth
                  variant="outlined"
                />
              )}
            />
          </Stack>
        </Stack>

        {/* Submit Button */}
        {/* <Box
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
        </Box> */}
      </Paper>
    </form>
  );
};

export default ThirdYear;
