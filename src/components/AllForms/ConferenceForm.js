import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, TextField, Button, Select, FormControl, InputLabel, MenuItem, Autocomplete } from "@mui/material";
import SingleSelect from "./Forms/SingleSelect";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useMutation, useQueryClient } from "react-query";

const ConferenceForm = ({ initialData, onClose }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const defaultValues = {
    type: '',
    name: '',
    date: '',
    grade: '',
    section: '',
    teachers: '',
    purpose: '',
    others: '',
    note: '',
    recommendations: '',
  }

  const { control, handleSubmit, reset, setValue, getValues } = useForm({ defaultValues: initialData || defaultValues }); // Only destructure control since we are not using form submission

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) =>
      initialData
        ? AxiosInstance.put(`/conferenceform/${initialData.id}/`, data)
        : AxiosInstance.post(`/conferenceform/`, data), {
    onSuccess: () => {
      queryClient.invalidateQueries('conferenceData');
      console.log("Data invalidated");
      queryClient.refetchQueries('conferenceData');
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



  const handleOptionSelect = (selectedOption) => {
    if (selectedOption) {
      // Update all fields based on the selected student
      setValue("sr_code", selectedOption.sr_code || "");
      setValue(
        "name",
        `${selectedOption.firstname || ""} ${selectedOption.lastname || ""}`
      );
      setValue("grade", selectedOption.year.replace("Grade", "Grade ") || "");
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

  return (
    <form onSubmit={handleSubmit(submission)}>
      <Paper
        elevation={0}
        sx={{
          paddingY: "20px",
          borderRadius: "8px"
        }}
      >
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Type of Conference</InputLabel>
              <Select
                label="Type of Conference"
                {...field} >
                <MenuItem value={"Teacher's Conference"}>Teacher's Conference</MenuItem>
                <MenuItem value={"Parent's Conference"}>Parent's Conference</MenuItem>
              </Select> </FormControl>)} />

        <Box
          sx={{
            width: "100%",
            mb: 2,
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
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
            mt: 2
          }}
        >

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name of Student"
                {...field}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{
                  flex: 1,
                  "& .MuiInputBase-input": {
                    fontSize: "16px",
                  },
                }}
              />)} />
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField
                label="Date"
                {...field}
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            mb: 2,
          }}
        >
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <TextField
                label="Grade"
                {...field}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": {
                    fontSize: "16px",
                  },
                }}
              />)} />
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <TextField
                label="Section"
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                {...field}
                sx={{
                  width: "100%",
                  mt: 2,
                  "& .MuiInputBase-input": {
                    fontSize: "16px",
                  },
                }}
              />)} />
          {/* Add the new TextField here */}
          <Controller
            name="teachers"
            control={control}
            render={({ field }) => (
              <TextField
                label="Name of Teacher/s or Parent/s"
                {...field}
                variant="outlined"
                sx={{
                  width: "100%",
                  mt: 2, // Add margin-top for spacing
                  "& .MuiInputBase-input": {
                    fontSize: "16px",
                  },
                }}
              />)} />

          <Typography
            variant="body1"
            sx={{
              color: "#3f3f3f",
              marginTop: 2,
              fontWeight: "medium",
              textAlign: "left",
            }}
          >
            Purpose of Conference:
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center", // Align items vertically centered
              gap: 2,
              mt: 1,
            }}
          >
            <Controller
              name="purpose"
              control={control}
              render={({ field }) => (
                <SingleSelect
                  label="Purpose of Conference"
                  {...field}
                  options={[
                    "Academic",
                    "Behavioral",
                    "Others"
                  ]}
                />)} />
            <Box sx={{ display: "flex" }}>
              <Controller
                name="others"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Others"
                    {...field}
                    variant="standard"
                    sx={{
                      width: "200px",
                      "& .MuiInputBase-input": {
                        fontSize: "16px",
                      },
                    }}
                  />)} />
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            width: "100%",
            mb: 2,
          }}
        >
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                label="Counselor's Note:"
                {...field}
                multiline
                rows={4}
                sx={{
                  width: "100%", // Ensures the field takes up the full width of the container
                }}
              />)} />
        </Box>

        <Box
          sx={{
            width: "100%",
            mb: 2,
          }}
        >
          <Controller
            name="recommendations"
            control={control}
            render={({ field }) => (
              <TextField
                label="Recommendation/s:"
                {...field}
                multiline
                rows={4}
                sx={{
                  width: "100%", // Ensures the field takes up the full width of the container
                }}
              />)} />
        </Box>

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
      </Paper>
    </form>
  );
};

export default ConferenceForm;
