import React from "react";
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Stack,
  Button,
  TextField
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import SingleSelect from "./Forms/SingleSelect";
import AxiosInstance from "./Axios";

const Grade7 = () => {
  const defaultValues = {
    name: '',
    age: '',
    sex: '',
    gradeLevel: '',
    section: '',
    tot: '',
    beh: '',
    inte: '',
    phy: '',
    fre: '',
    popularity: '',
    hap: '',
    beh_num: '',
    int_num: '',
    phy_num: '',
    fre_num: '',
    popularity_num: '',
    hap_num: '',
  };

  const { control, handleSubmit, reset, setValue} = useForm({ defaultValues:defaultValues });

  const submission = (data) => {
    AxiosInstance.post(`/grade_seven/`, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      section: data.section,
      tot: data.tot,
      beh: data.beh,
      inte: data.inte,
      phy: data.phy,
      fre: data.fre,
      popularity: data.popularity,
      hap: data.hap,
      beh_num: data.beh_num,
      int_num: data.int_num,
      phy_num: data.phy_num,
      fre_num: data.fre_num,
      popularity_num: data.popularity_num,
      hap_num: data.hap_num,
    })
      .then(response => {
        console.log("Data submitted successfully:", response.data);
        reset(); // Reset form after successful submission
      })
      .catch(error => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submission)}>
      <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Grade 7
          </Typography>
          <Paper
            elevation={3}
            sx={{
              padding: "40px",
              borderRadius: "8px",
              backgroundColor: "#f7f9fc",
              minHeight: "50vh",
            }}
          >
            <Stack spacing={2}>
              {/* First row with one column for name */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Student Name"
                      {...field}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              {/* Subsequent rows with three columns each */}
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
                    <SingleSelect
                      label="Grade Level"
                      {...field}
                      options={[
                        "Grade 1",
                        "Grade 2",
                        "Grade 3",
                        "Grade 4",
                        "Grade 5",
                        "Grade 6",
                        "Grade 7",
                        "Grade 8",
                        "Grade 9",
                        "Grade 10",
                        "Grade 11",
                        "Grade 12",
                        "1st Year",
                        "2nd Year",
                        "3rd Year",
                        "4th Year",
                      ]}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Section"
                      {...field}
                      options={[
                        "Gabriel",
                        "Michael",
                        "Judiel",
                        "Raphael",
                        "Sealtiel",
                        "Uriel",
                      ]}
                      fullWidth
                    />
                  )}
                />
                <Controller 
                  name="tot"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Total Score"
                      {...field}
                      options={[
                        "Low Range",
                        "Low Average Range",
                        "High Average Range",
                        "High Range",
                      ]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="beh"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Behavioral Adjustment"
                      {...field}
                      options={[
                        "Low Range",
                        "Low Average Range",
                        "High Average Range",
                        "High Range",
                      ]}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="inte"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Intellectual and School Status"
                      {...field}
                      options={[
                        "Low Range",
                        "Low Average Range",
                        "High Average Range",
                        "High Range",
                      ]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="phy"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Physical Appearance and Attributes"
                      {...field}
                      options={[
                        "Low Range",
                        "Low Average Range",
                        "High Average Range",
                        "High Range",
                      ]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="fre"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Freedom from Anxiety"
                      {...field}
                      options={[
                        "Low Range",
                        "Low Average Range",
                        "High Average Range",
                        "High Range",
                      ]}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="popularity"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Popularity"
                      {...field}
                      options={[
                        "Low Range",
                        "Low Average Range",
                        "High Average Range",
                        "High Range",
                      ]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="hap"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Happiness and Satisfaction"
                      {...field}
                      options={[
                        "Low Range",
                        "Low Average Range",
                        "High Average Range",
                        "High Range",
                      ]}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              {/* Last row with three columns for numerical values */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="beh_num"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="BEH (Numerical)"
                      {...field}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="int_num"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="INT (Numerical)"
                      {...field}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="phy_num"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="PHY (Numerical)"
                      {...field}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="fre_num"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="FRE (Numerical)"
                      {...field}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="popularity_num"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="POP (Numerical)"
                      {...field}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="hap_num"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="HAP (Numerical)"
                      {...field}
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
        </CardContent>
      </Card>
    </form>
  );
};

export default Grade7;
