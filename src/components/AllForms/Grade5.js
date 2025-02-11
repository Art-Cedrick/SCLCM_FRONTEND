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

const Grade5 = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    raw_score: "",
    percentile: "",
    stanine: "",
    verbal_interpretation: "",
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
        ? AxiosInstance.put(`/grade_five/${initialData.id}/`, data)
        : AxiosInstance.post(`/grade_five/`, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("gradefiveData");
        console.log("Data invalidated");
        queryClient.refetchQueries("gradefiveData");
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
            Grade 5
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
          {/* First row with single column for name */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField label="Student Name" {...field} fullWidth  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }} />
              )}
            />
          </Stack>

          {/* Next rows in three columns */}
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
                <TextField label="Grade Level" {...field} fullWidth  slotProps={{
                  input: {
                    readOnly: true,
                  },
                }} />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Section"
                  {...field}
                  fullWidth
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="raw_score"
              control={control}
              render={({ field }) => (
                <TextField label="Raw Score" {...field} fullWidth />
              )}
            />
            <Controller
              name="percentile"
              control={control}
              render={({ field }) => (
                <TextField label="Percentile" {...field} fullWidth />
              )}
            />
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="stanine"
              control={control}
              render={({ field }) => (
                <TextField label="Stanine" {...field} fullWidth />
              )}
            />
            <Controller
              name="verbal_interpretation"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Verbal Interpretation"
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

export default Grade5;
