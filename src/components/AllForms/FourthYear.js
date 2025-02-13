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

const FourthYear = ({initialData, onClose}) => {
  const queryClient = useQueryClient();
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    course_program: "",
    l_raw: "",
    l_s: "",
    l_vi: "",
    q_percent: "",
    q_s: "",
    sq_vi: "",
    t_raw: "",
    t_percent: "",
    t_s: "",
    t_vi: "",
    kiersey: "",
    written: "",
    negotiating_persuading: "",
    verbal_communication: "",
    co_op: "",
    investigating_analyzing: "",
    leadership: "",
    planning_organizing: "",
    numeracy: "",
  };

  const { control, handleSubmit, reset, setValue, getValues} = useForm({ defaultValues: defaultValues });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) => 
      initialData
      ? AxiosInstance.put(`/fourth_year/${initialData.id}/`, data)
      : AxiosInstance.post(`/fourth_year/`, data), {
      onSuccess: () => {
        queryClient.invalidateQueries('fourthyearData');
        console.log("Data invalidated");
        queryClient.refetchQueries('fourthyearData');
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
      setValue("course_program", selectedOption.section || "");
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
            4th Year
          </Typography> */}
      <Paper
        elevation={0}
        sx={{
          paddingY: "20px",
          borderRadius: "8px",
        }}
      >  <Controller
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
                  {...field}
                  label="Student Name:"
                  variant="outlined"
                  fullWidth
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
                  {...field}
                  label="Age:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Sex:"
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  options={["M", "F"]}
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="gradeLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Grade Level:"
                  variant="outlined"
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
              name="course_program"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Course/Program:"
                  {...field}
                  // slotProps={{
                  //   input: {
                  //     readOnly: true,
                  //   },
                  // }}
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="l_raw"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="L-Raw:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="l_s"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="L - S:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="l_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="L - VI:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="q-raw"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Q - Raw:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="q_percent"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Q - %:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="q_s"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Q - S:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="sq_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="SQ - VI:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="t_raw"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="T - Raw:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="t_percent"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="T - %:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="t_s"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="T - S:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="t_vi"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="T - VI:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="kiersey"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Kiersey Temperament Sorter:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="written"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Written:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="negotiating_persuading"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Negotiating Persuading:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="verbal_communication"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Verbal Communication:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="co_op"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Co-op:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="investigating_analyzing"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Investigating Analyzing:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="leadership"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Leadership:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Stack>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Controller
              name="planning_organizing"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Planning Organizing:"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
            <Controller
              name="numeracy"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Numeracy:"
                  variant="outlined"
                  fullWidth
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
    </form>
  );
};
export default FourthYear;
