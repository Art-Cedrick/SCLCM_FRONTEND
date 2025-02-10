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


const FirstYear = ({initialData, onClose}) => {
  const queryClient = useQueryClient();
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

  const { control, handleSubmit, reset, setValue, getValues } = useForm({ defaultValues: defaultValues });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) => 
      initialData
      ? AxiosInstance.put(`/first_year/${initialData.id}/`, data)
      : AxiosInstance.post(`/first_Year/`, data), {
      onSuccess: () => {
        queryClient.invalidateQueries('firstyearData');
        console.log("Data invalidated");
        queryClient.refetchQueries('firstyearData');
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
            1st Year
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
              name="gradeLevel"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Grade Level:"
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
                  label="Course:"
                  {...field}
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

export default FirstYear;
