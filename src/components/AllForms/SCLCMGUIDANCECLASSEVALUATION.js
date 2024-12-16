import React from "react";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Stack,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import SingleSelect from "./Forms/SingleSelect";
import AxiosInstance from "./Axios";

const SCLCMGUIDANCECLASSEVALUATION = () => {
  const defaultValues = {
    name: "",
    grade: "",
    section: "",
    question_1: "",
    question_2: "",
    question_3: "",
    question_4: "",
    question_5: "",
    question_6: "",
    question_7: "",
    question_8: "",
    question_9: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  const submission = (data) => {
    AxiosInstance.post(`/sclcm_guidance_class/`, {
      ...data,
      name: data.name,
    })
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        reset(); // Reset form after successful submission
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submission)}>
      <Card elevation={0} sx={{ maxWidth: "900px", margin: "20px auto" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            WHAT DO YOU THINK OF WHAT WE DID TODAY?
          </Typography>
          <Paper
            elevation={0}
            sx={{
              padding: "40px",
              borderRadius: "8px",
              minHeight: "60vh",
            }}
          >
            <Stack spacing={2}>
              {/* First Row: Name, Grade, Section */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>

                <Controller
                  name="grade"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Grade Level"
                      options={["Grade 6", "Grade 7", "Grade 8"]}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Section"
                      options={[
                        "St. Gregory",
                        "St. Alexander",
                        "St. Barachiel",
                        "St. Gabriel",
                        "St. Sealtiel",
                        "St. Raphael",
                        "St. Michael",
                        "St. Uriel",
                        "St. Judiel",
                        "St. Sebastian",
                        "St. Charles",
                        "St. Christopher",
                        "St. Vincent",
                        "St. Francis",
                        "St. Benedict",
                        "St. Martin",
                      ]}
                      {...field}
                    />
                  )}
                />
              </Stack>

              <Divider sx={{ marginY: 2 }} />

              {/* Question Section */}
              <Typography variant="h7" gutterBottom align="left">
                1. How much of the Guidance Class content was new to you?
              </Typography>
              <Controller
                name="question_1"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Answer here"
                    options={[
                      "None was new to me",
                      "Some were new to me",
                      "Almost all was new to me",
                      "Everything was new to me",
                    ]}
                    sx={{ width: "100%" }} // Set width to 250px
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                2. Is the Guidance Class important to you?
              </Typography>
              <Controller
                name="question_2"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Answer here"
                    options={[
                      "Not at all relevant",
                      "Somewhat relevant",
                      "Very relevant",
                      "Extremely relevant",
                    ]}
                    sx={{ width: "100%" }} // Set width to 250px
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                3. How easy were the written materials to understand?
              </Typography>
              <Controller
                name="question_3"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Answer here"
                    options={[
                      "Not at all easy",
                      "Some were easy",
                      "Most of it was easy",
                      "Everything was easy",
                    ]}
                    sx={{ width: "100%" }} // Set width to 250px
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                4. How effective was the counselor?
              </Typography>
              <Controller
                name="question_4"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Answer here"
                    options={[
                      "Not at all effective",
                      "Somewhat effective",
                      "Very effective",
                      "Extremely effective",
                    ]}
                    sx={{ width: "100%" }} // Set width to 250px
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                5. How efficient do you feel about your ability to put what you
                have learned into practice?
              </Typography>
              <Controller
                name="question_5"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Answer here"
                    options={[
                      "Not at all confident",
                      "Somewhat confident",
                      "Confident",
                      "Very Confident",
                    ]}
                    sx={{ width: "100%" }} // Set width to 250px
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                6. What is your overall assessment of the Guidance Class?
              </Typography>
              <Controller
                name="question_6"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Answer here"
                    options={["Poor", "Satisfactory", "Good", "Excellent"]}
                    sx={{ width: "100%" }} // Set width to 250px
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                7. What were the two best things about our guidance class today?
              </Typography>
              <Controller
                name="question_7"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Answer here"
                    placeholder=""
                    multiline
                    rows={2}
                    sx={{ flex: 1 }}
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                8. What were the two worst things about our guidance class
                today?
              </Typography>
              <Controller
                name="question_8"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Answer here"
                    placeholder=""
                    multiline
                    rows={2}
                    sx={{ flex: 1 }}
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h7" gutterBottom align="left">
                9. What would make it better?
              </Typography>
              <Controller
                name="question_9"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Answer here"
                    placeholder=""
                    multiline
                    rows={2}
                    sx={{ flex: 1 }}
                  />
                )}
              />

              {/* Submit Button */}
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ marginTop: 2 }}
              >
                <Button variant="contained" onClick={handleSubmit(submission)}>
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </form>
  );
};

export default SCLCMGUIDANCECLASSEVALUATION;
