import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import AxiosInstance from "./Axios";
import SingleSelect from "./Forms/SingleSelect";
import recommend from "../../utils/recommend";

const PageOne = ({ control, setValue, getValues }) => {
  const subjects = [
    { label: "CLE", name: "cle" },
    { label: "ENGLISH", name: "english" },
    { label: "FILIPINO", name: "filipino" },
    { label: "AP", name: "ap" },
    { label: "SCIENCE", name: "science" },
    { label: "MATH", name: "math" },
    { label: "MAPEH", name: "mapeh" },
    { label: "TLE", name: "tle" },
    { label: "COMPUTER", name: "computer" },
    { label: "FL", name: "fl" },
  ];

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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {/* Name TextField */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField label="Name" {...field} sx={{ width: "100%" }} slotProps={{
                input: {
                  readOnly: true,
                },
              }} />
            )}
          />

          {/* Grade SingleSelect */}
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <TextField label="Grade" {...field} sx={{ width: "100%" }} slotProps={{
                input: {
                  readOnly: true,
                },
              }} />
            )}
          />

          {/* Section SingleSelect */}
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <TextField label="Section" {...field} sx={{ width: "100%" }} slotProps={{
                input: {
                  readOnly: true,
                },
              }} />
            )}
          />
        </Box>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Final Grade Summary
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          }}
        >
          {/* Subjects TextFields */}
          {subjects.map((subject) => (
            <Controller
              name={subject.name}
              key={subject.name}
              control={control}
              render={({ field }) => (
                <TextField
                  label={subject.label}
                  {...field}
                  sx={{ width: "100%" }}
                />
              )}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

const PageTwo = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Divider sx={{ my: 3 }} />
      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        PREFERRED TRACK/STRAND
      </Typography>

      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Academic Track:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Controller
          name="academic_track"
          control={control}
          render={({ field }) => (
            <SingleSelect
              label="Academic Track"
              {...field}
              options={["STEM", "ABM", "HUMSS"]}
            />
          )}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Controller
            name="other_track"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Other"
                variant="standard"
                sx={{ width: "200px", marginTop: "-10px" }}
              />
            )}
          />
        </Box>
      </Box>

      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Tech-Voc. Track:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Controller
          name="tech_voc"
          control={control}
          render={({ field }) => (
            <SingleSelect
              label="Technical Vocation"
              {...field}
              options={["HE", "ICT"]}
            />
          )}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Controller
            name="other_techvoc"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label="Other"
                sx={{ width: "200px", marginTop: "-10px" }}
              />
            )}
          />
        </Box>
      </Box>

      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        Preferred Course in College:
        <Controller
          name="preferredCourse"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="standard"
              sx={{ width: "200px", marginLeft: "10px", marginTop: "-10px" }}
            />
          )}
        />
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      ></Box>
    </Stack>
  </Box>
);

const PageThree = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Divider sx={{ my: 3 }} />

      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        MEDICAL RECORDS:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Controller
          name="medical_records"
          control={control}
          render={({ field }) => (
            <SingleSelect
              label="Medical Records"
              {...field}
              options={[
                "No history of medical illness",
                "With history of medical illness",
              ]}
            />
          )}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Controller
            name="specify"
            control={control}
            render={({ field }) => (
              <TextField
                label="Specify:"
                {...field}
                variant="standard"
                sx={{ width: "200px" }}
              />
            )}
          />
        </Box>
      </Box>

      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        ACADEMIC STATUS:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Controller
          name="academic_status"
          control={control}
          render={({ field }) => (
            <SingleSelect
              label="Academic Status"
              {...field}
              options={[
                "Above Average",
                "Average Student",
                "Low Average Student",
              ]}
            />
          )}
        />
      </Box>

      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        HOBBIES:
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Controller
          name="hobbies"
          control={control}
          render={({ field }) => (
            <SingleSelect
              label="Hobbies"
              {...field}
              options={[
                "Creative",
                "Intellectual",
                "Physical",
              ]}
            />
          )}
        />
      </Box>

      <Typography
        variant="h7"
        sx={{
          color: "#3f3f3f",
          marginTop: 4,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        PSYCHOLOGICAL TEST TAKEN WITH RESULT:
      </Typography>
      <Controller
        name="cognitive"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="Cognitive Abilities"
            {...field}
            options={[
              "High",
              "Average",
              "Low",
            ]}
          />
        )}
      />

      <Controller
        name="emotional"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="Emotional Intelligence"
            {...field}
            options={[
              "High",
              "Average",
              "Low",
            ]}
          />
        )}
      />

      <Controller
        name="personality"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="Personality Traits"
            {...field}
            options={[
              "High",
              "Average",
              "Low",
            ]}
          />
        )}
      />
      {localStorage.getItem("role") ==! "counselor" && (
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      >
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
      )}
    </Stack>
  </Box>
);

const CareerTracking = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();

  const defaultValues = {
    name: "",
    grade: "",
    section: "",
    cle: "",
    english: "",
    filipino: "",
    ap: "",
    science: "",
    math: "",
    mapeh: "",
    tle: "",
    computer: "",
    fl: "",
    academic_track: "",
    other_track: "",
    tech_voc: "",
    other_techvoc: "",
    preferredCourse: "",
    medical_records: "",
    specify: "",
    academic_status: "",
    hobbies: "",
    cognitive: "",
    emotional: "",
    personality: "",
  };

  const { control, handleSubmit, reset, watch, setValue, getValues } = useForm({
    defaultValues: defaultValues,
  });

  const stdnt = watch();

  const studentData = {
    grades: {
      ENGLISH: stdnt.english,
      FILIPINO: stdnt.filipino,
      ARALING_PANLIPUNAN: stdnt.ap,
      MATH: stdnt.math,
      SCIENCE: stdnt.science,
      COMPUTER: stdnt.computer,
      TLE: stdnt.tle,
      FOREIGN_LANGUAGE: stdnt.fl,
      MAPEH: stdnt.mapeh,
    },
    academicTrack: stdnt.academic_track, // ABM, STEM, HUMMS
    vocationalTrack: stdnt.tech_voc, // Home Economic, ICT
    academicStatus: stdnt.academic_status, // "Above Average", "Average", "Low Average"
    medicalRecord: stdnt.medical_records, // "No History of Illness" or "Has History of Illness"
    hobbies: stdnt.hobbies,
    psych_results: {
      COGNITIVE_ABILITIES: stdnt.cognitive,
      EMOTIONAL_INTELLIGENCE: stdnt.emotional,
      PERSONALITY_TRAITS: stdnt.personality,
    }
  };

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    async (data) => {
      const res = await recommend(studentData);

      initialData
        ? AxiosInstance.put(`/careertracking/${initialData.id}/`, {
          ...data,
          top_one: res[0].industry,
          top_two: res[1].industry,
          top_three: res[2].industry,
        })
        : AxiosInstance.post(`/careertracking/`, {
          ...data,
          top_one: res[0].industry,
          top_two: res[1].industry,
          top_three: res[2].industry,
        });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("careertrackingData");
        console.log("Data invalidated");
        queryClient.refetchQueries("careertrackingData");
        console.log("Data refetched");
        reset();
        onClose();
        setPage(1);
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
    setPage((prevPage) => Math.min(prevPage + 1, 3)); // Maximum page is now 3
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
          borderRadius: "8px"
        }}
      >
        {page === 1 && <PageOne control={control} setValue={setValue} getValues={getValues} />}
        {page === 2 && <PageTwo control={control} />}
        {page === 3 && <PageThree control={control} />}
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mt: 4 }}
        >
          <IconButton onClick={handleBack} disabled={page === 1}>
            <ArrowBack />
          </IconButton>
          <IconButton onClick={handleNext} disabled={page === 3}>
            <ArrowForward />
          </IconButton>
        </Stack>
      </Paper>
    </form>
  );
};

export default CareerTracking;
