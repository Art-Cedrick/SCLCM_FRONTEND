import React from "react";
import {
  Typography,
  Paper,
  Card,
  CardContent,
  Stack,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import TextFields from "./Forms/TextFields"; // Ensure this path is correct
import DatePicker from "./Forms/DatePicker";

const SCLCMGuidanceClass = () => {
  const { control, register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          WHAT DO YOU THINK OF WHAT WE DID TODAY?
        </Typography>
        <Paper
          elevation={3}
          sx={{
            padding: "40px",
            borderRadius: "8px",
            backgroundColor: "#f7f9fc",
            minHeight: "60vh",
          }}
        >
          <Stack spacing={2}>
            {/* First Row: Last Name, First Name, and Middle Name */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextFields
                label="GRADE"
                name="grade"
                control={control}
                placeholder=""
                sx={{ flex: 1 }}
              />
              <TextFields
                label="Section"
                name="section"
                control={control}
                placeholder=""
                sx={{ flex: 1 }}
              />
              <DatePicker label="Date" name="date" control={control} />
            </Stack>

            <Divider sx={{ marginY: 2 }} />

            {/* Question Section */}
            <Typography variant="h7" gutterBottom align="left">
              1. How much of the Guidance Class content was new to you?
            </Typography>
            <RadioGroup
              {...register("guidanceContent1")}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel
                value="none"
                control={<Radio />}
                label="None was new to me"
              />
              <FormControlLabel
                value="some"
                control={<Radio />}
                label="Some were new to me"
              />
              <FormControlLabel
                value="almostAll"
                control={<Radio />}
                label="Almost all was new to me"
              />
              <FormControlLabel
                value="everything"
                control={<Radio />}
                label="Everything was new to me"
              />
            </RadioGroup>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h7" gutterBottom align="left">
              2. Is the Guidance Class important to you?
            </Typography>
            <RadioGroup
              {...register("guidanceContent2")}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel
                value="not"
                control={<Radio />}
                label="Not at all relevant"
              />
              <FormControlLabel
                value="some"
                control={<Radio />}
                label="Somewhat relevant"
              />
              <FormControlLabel
                value="very"
                control={<Radio />}
                label="Very relevant"
              />
              <FormControlLabel
                value="extremely"
                control={<Radio />}
                label="Extremely relevant"
              />
            </RadioGroup>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h7" gutterBottom align="left">
              3. How easy were the written materials to understand?
            </Typography>
            <RadioGroup
              {...register("guidanceContent3")}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel
                value="not"
                control={<Radio />}
                label="Not at all easy"
              />
              <FormControlLabel
                value="some"
                control={<Radio />}
                label="Some were easy"
              />
              <FormControlLabel
                value="most"
                control={<Radio />}
                label="Most of it was easy"
              />
              <FormControlLabel
                value="everything"
                control={<Radio />}
                label="Everything was easy"
              />
            </RadioGroup>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h7" gutterBottom align="left">
              4. How effective was the counselor?
            </Typography>
            <RadioGroup
              {...register("guidanceContent4")}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel
                value="not"
                control={<Radio />}
                label="Not at all effective"
              />
              <FormControlLabel
                value="some"
                control={<Radio />}
                label="Somewhat effective"
              />
              <FormControlLabel
                value="very"
                control={<Radio />}
                label="Very effective"
              />
              <FormControlLabel
                value="extremely"
                control={<Radio />}
                label="Extremely effective"
              />
            </RadioGroup>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h7" gutterBottom align="left">
              5. How efficient do you feel about your ability to put what you
              have learned into practice?
            </Typography>
            <RadioGroup
              {...register("guidanceContent5")}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel
                value="not"
                control={<Radio />}
                label="Not at all confident"
              />
              <FormControlLabel
                value="some"
                control={<Radio />}
                label="Somewhat confident"
              />
              <FormControlLabel
                value="confident"
                control={<Radio />}
                label="Confident"
              />
              <FormControlLabel
                value="very"
                control={<Radio />}
                label="Very Confident"
              />
            </RadioGroup>
            <Divider sx={{ marginY: 2 }} />
            <Typography variant="h7" gutterBottom align="left">
              6. What is your overall assessment of the Guidance Class?
            </Typography>
            <RadioGroup
              {...register("guidanceContent6")}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <FormControlLabel value="poor" control={<Radio />} label="Poor" />
              <FormControlLabel
                value="satisfactory"
                control={<Radio />}
                label="Satisfactory"
              />
              <FormControlLabel value="good" control={<Radio />} label="Good" />
              <FormControlLabel
                value="excellent"
                control={<Radio />}
                label="Excellent"
              />
            </RadioGroup>

            {/* Submit Button */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              sx={{ marginTop: 2 }}
            >
              <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default SCLCMGuidanceClass;
