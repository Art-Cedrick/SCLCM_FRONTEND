import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SingleSelect from "./Forms/SingleSelect";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useMutation, useQueryClient } from "react-query";

const PageOne = ({ control, setValue, getValues }) => {
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
    <Box>
      <Stack spacing={6}>
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
        <Stack direction="row" spacing={3}>

          <Stack spacing={6} sx={{ flex: 1 }}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  sx={{ width: "100%" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
            <Controller
              name="grade"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Grade"
                  {...field}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
          </Stack>
          <Stack spacing={6} sx={{ flex: 1 }}>
            <Controller
              name="section"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Section"
                  {...field}
                  variant="outlined"
                  sx={{ width: "100%" }}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              )}
            />
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
                  sx={{ width: "100%" }}
                />
              )}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
};

const PageTwo = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
      >
        PERSONAL - SOCIAL DEVELOPMENT (PSD)
      </Typography>
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          textAlign: "left",
        }}
      >
        Family:
      </Typography>
      <Stack spacing={2}>
        <Controller
          control={control}
          name="family_problem"
          render={({ field }) => (
            <SingleSelect
              label="Problems Encountered"
              {...field}
              options={[
                "lack of quality time",
                "parental pressure",
                "sibling rivalry",
                "financial discomfort",
                "parent-child misunderstanding",
                "others",
              ]}
              sx={{ width: "50%" }}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Controller
          name="family_details"
          control={control}
          render={({ field }) => (
            <TextField
              label="Details"
              {...field}
              multiline
              rows={4}
              sx={{ width: "100%" }}
            />
          )}
        />
      </Box>
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          textAlign: "left",
        }}
      >
        Friends/Peers/Interpersonal Relationship:
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="friends_problem"
          control={control}
          render={({ field }) => (
            <SingleSelect
              {...field}
              label="Problems Encountered"
              options={[
                "incompatibilities",
                "adjustment difficulties",
                "lack of communication",
                "boy-girl relationships",
                "mistrust",
                "bullying",
                "peer pressure",
                "others",
              ]}
              sx={{ width: "50%" }}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Controller
          name="friends_details"
          control={control}
          render={({ field }) => (
            <TextField
              label="Details"
              {...field}
              multiline
              rows={4}
              sx={{ width: "100%" }}
            />
          )}
        />
      </Box>
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          textAlign: "left",
        }}
      >
        Personal & Health:
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="health_problem"
          control={control}
          render={({ field }) => (
            <SingleSelect
              {...field}
              label="Problems Encountered"
              options={[
                "physical disabilities",
                "stress",
                "hospitalization",
                "gender confusion",
                "poor health",
                "low self-esteem",
                "psychological disturbance",
                "others",
              ]}
              sx={{ width: "50%" }}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Controller
          name="health_details"
          control={control}
          render={({ field }) => (
            <TextField
              label="Details"
              {...field}
              multiline
              rows={4}
              sx={{ width: "100%" }}
            />
          )}
        />
      </Box>
    </Stack>
  </Box>
);

const PageThree = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
      >
        ACADEMIC DEVELOPMENT (AD)
      </Typography>
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          textAlign: "left",
        }}
      >
        Academics/School:
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="academic_problem"
          control={control}
          render={({ field }) => (
            <SingleSelect
              {...field}
              label="Problems Encountered"
              options={[
                "failing marks",
                "misbehavior",
                "transition to school sife",
                "learning sifficulties",
                "low motivation",
                "teachers",
                "laziness",
                "difficult subjects",
                "frequent D.O. client",
                "failed to comply requirements",
                "others",
              ]}
              sx={{ width: "50%" }}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Controller
          name="academic_details"
          control={control}
          render={({ field }) => (
            <TextField
              label="Details"
              {...field}
              multiline
              rows={4}
              sx={{ width: "100%" }}
            />
          )}
        />
      </Box>
    </Stack>
  </Box>
);

const PageFour = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
      >
        CAREER DEVELOPMENT (AC)
      </Typography>
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          textAlign: "left",
        }}
      >
        Academics/School:
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="career_problem"
          control={control}
          render={({ field }) => (
            <SingleSelect
              {...field}
              label="Problems Encountered"
              options={[
                "undecided",
                "no identified",
                "confusion",
                "parent's choice",
                "change of interest",
                "others",
              ]}
              sx={{ width: "50%" }}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Controller
          name="career_details"
          control={control}
          render={({ field }) => (
            <TextField
              label="Details"
              {...field}
              multiline
              rows={4}
              sx={{ width: "100%" }}
            />
          )}
        />
      </Box>
    </Stack>
  </Box>
);

const PageFive = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        GENERAL IMPRESSION/ COUNSELOR'S REMARKS
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="remarks"
          control={control}
          render={({ field }) => (
            <TextField {...field} multiline rows={4} sx={{ width: "100%" }} />
          )}
        />
      </Stack>
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Recommendations:
      </Typography>
      <Stack spacing={2}>
        <Controller
          name="recommendation"
          control={control}
          render={({ field }) => (
            <SingleSelect
              {...field}
              label="Recommendation"
              options={[
                "for follow-up",
                "conference with parent/guardian",
                "conference with adviser/subject teacher",
                "for assessment",
              ]}
              sx={{ width: "50%" }}
            />
          )}
        />
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Controller
            name="other_recommendation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Other"
                variant="standard"
                sx={{ width: "200px" }}
              />
            )}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      >
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Box>
    </Stack>
  </Box>
);

const RoutineInterview = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();

  const defaultValues = {
    sr_code: "",
    name: "",
    section: "",
    grade: "",
    date: "",
    family_problem: "",
    family_details: "",
    friends_problem: "",
    friends_details: "",
    health_problem: "",
    health_details: "",
    academic_problem: "",
    academic_details: "",
    career_problem: "",
    career_details: "",
    remarks: "",
    recommendation: "",
    other_recommendation: "",
  };

  const { handleSubmit, reset, control, setValue, getValues } = useForm({
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) =>
      initialData
        ? AxiosInstance.put(`/routine_interview/${initialData.id}/`, data)
        : AxiosInstance.post(/routine_interview/, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("routineData");
        console.log("Data invalidated");
        queryClient.refetchQueries("routineData");
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

  const [page, setPage] = useState(1);

  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, 5)); // Maximum page remains 5
  };

  const handleBack = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <form onSubmit={handleSubmit(submission)}>
      <Paper
        elevation={0}
        sx={{
          paddingY: "20px",
          borderRadius: "8px",
        }}
      >
        {page === 1 && <PageOne control={control} setValue={setValue} getValues={getValues} />}
        {page === 2 && <PageTwo control={control} />}
        {page === 3 && <PageThree control={control} />}
        {page === 4 && <PageFour control={control} />}
        {page === 5 && <PageFive control={control} />}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 4 }}
        >
          <IconButton onClick={handleBack} disabled={page === 1}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={handleNext} disabled={page === 5}>
            <ArrowForward />
          </IconButton>
        </Stack>
      </Paper>
    </form>
  );
};

export default RoutineInterview;