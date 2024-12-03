import React, { useState } from "react";
import {
  Typography,
  Paper,
  Stack,
  IconButton,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import TextFields from "./Forms/TextFields";
import MultipleSelect from "./Forms/MultipleSelect";
import DatePicker from "./Forms/DatePicker";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useForm } from "react-hook-form";

const ResponsiveStack = ({ children }) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    {React.Children.map(children, (child) => (
      <Grid item xs={12} sm={6} md={3}>
        {child}
      </Grid>
    ))}
  </Grid>
);

const PageOne = ({ control }) => (
  <Card sx={{ marginBottom: 3, boxShadow: 2 }}>
    <CardContent>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 5, fontWeight: "bold" }}
      >
        PERSONAL DATA
      </Typography>
      <ResponsiveStack>
        <TextFields
          label="Last Name"
          placeholder="Enter your last name"
          name="lastName"
          control={control}
        />
        <TextFields
          label="Auxiliary Name (e.g., Jr., Sr., I, II, III)"
          placeholder="Enter auxiliary name"
          name="auxiliaryName"
          control={control}
        />
        <TextFields
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          control={control}
        />
        <TextFields
          label="Middle Name"
          placeholder="Enter your middle name"
          name="middleName"
          control={control}
        />
      </ResponsiveStack>

      <ResponsiveStack>
        <TextFields
          label="Street No."
          placeholder="Enter street number"
          name="streetNo"
          control={control}
        />
        <TextFields
          label="Street"
          placeholder="Enter street name"
          name="street"
          control={control}
        />
        <TextFields
          label="Subdivision/Village"
          placeholder="Enter subdivision or village"
          name="subdivision"
          control={control}
        />
        <TextFields
          label="Town"
          placeholder="Enter town"
          name="town"
          control={control}
        />
      </ResponsiveStack>

      <ResponsiveStack>
        <DatePicker
          label="Date of Birth"
          name="dateOfBirth"
          control={control}
        />
        <TextFields
          label="Place of Birth"
          placeholder="Enter place of birth"
          name="placeOfBirth"
          control={control}
        />
        <TextFields
          label="Age"
          placeholder="Enter your age"
          name="age"
          control={control}
        />
        <TextFields
          label="Religion"
          placeholder="Enter your religion"
          name="religion"
          control={control}
        />
      </ResponsiveStack>

      <ResponsiveStack>
        <TextFields
          label="Citizenship"
          placeholder="Enter your citizenship"
          name="citizenship"
          control={control}
        />
        <TextFields
          label="Gender"
          placeholder="Enter your gender"
          name="gender"
          control={control}
        />
      </ResponsiveStack>
    </CardContent>
  </Card>
);

const PageTwo = ({ control }) => (
  <Card sx={{ marginBottom: 3, boxShadow: 2 }}>
    <CardContent>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 4, fontWeight: "bold" }}
      >
        LAST SCHOOL ATTENDED
      </Typography>
      <Stack spacing={2}>
        <TextFields
          label="Name of School"
          placeholder="Enter name of school"
          name="schoolName"
          control={control}
        />
        <TextFields
          label="School Address"
          placeholder="Enter school address"
          name="schoolAddress"
          control={control}
        />
        <TextFields
          label="Year/Grade Level"
          placeholder="Enter year or grade level"
          name="gradeLevel"
          control={control}
        />
        <TextFields
          label="Year of Graduation"
          placeholder="Enter year of graduation"
          name="graduationYear"
          control={control}
        />
      </Stack>
    </CardContent>
  </Card>
);

const PageThree = ({ control }) => (
  <Card sx={{ marginBottom: 3, boxShadow: 2 }}>
    <CardContent>
      <Typography
        variant="h6"
        sx={{
          color: "#3f3f3f",
          marginBottom: 4,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        FAMILY DATA
      </Typography>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 4, fontWeight: "bold" }}
      >
        FATHER'S INFORMATION
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Father's Name"
            placeholder="Enter father's name"
            name="fathersName"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Occupation"
            placeholder="Enter occupation"
            name="fathersOccupation"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Telephone No."
            placeholder="Enter telephone number"
            name="fathersTelephoneNo"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Mobile No."
            placeholder="Enter mobile number"
            name="fathersMobileNo"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Email Address"
            placeholder="Enter email address"
            name="fathersEmailAddress"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Religion"
            placeholder="Enter religion"
            name="fathersReligion"
            control={control}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} /> {/* Divider added here */}
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
      >
        MOTHER'S INFORMATION
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Mother's Name"
            placeholder="Enter mother's name"
            name="mothersName"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Occupation"
            placeholder="Enter occupation"
            name="mothersOccupation"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Telephone No."
            placeholder="Enter telephone number"
            name="mothersTelephoneNo"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Mobile No."
            placeholder="Enter mobile number"
            name="mothersMobileNo"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Email Address"
            placeholder="Enter email address"
            name="mothersEmailAddress"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextFields
            label="Religion"
            placeholder="Enter religion"
            name="mothersReligion"
            control={control}
          />
        </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} /> {/* Another Divider for separation */}
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 4, fontWeight: "bold" }}
      >
        PERSON/RELATIVE TO BE NOTIFIED IN CASE OF EMERGENCY
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextFields
            label="Name"
            placeholder="Enter name"
            name="emergencyContactName"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFields
            label="Relationship"
            placeholder="Enter relationship"
            name="emergencyContactRelationship"
            control={control}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextFields
            label="Landline / Mobile Phone"
            placeholder="Enter phone number"
            name="emergencyContactPhone"
            control={control}
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

const PageFour = ({ control }) => {
  const gradeOptions = [
    "Kinder",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "First Year",
    "Second Year",
    "Third Year",
  ];

  return (
    <Card sx={{ marginBottom: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            color: "#3f3f3f",
            marginBottom: 4,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          SCHOLASTIC PROGRESS
        </Typography>

        <Stack spacing={2}>
          {/* Replace TextFields for Grade/Year with MultipleSelect */}
          <MultipleSelect
            label="Grade/Year"
            options={gradeOptions}
            control={control}
            name="gradeYear"
          />
          <TextFields
            label="School Attended"
            placeholder="Enter school attended"
            name="schoolAttended"
            control={control}
          />
          <TextFields
            label="Location"
            placeholder="Enter location"
            name="location"
            control={control}
          />
          <TextFields
            label="Academic Honors"
            placeholder="Enter academic honors"
            name="academicHonors"
            control={control}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

const PageFive = ({ control }) => (
  <Card sx={{ marginBottom: 3, boxShadow: 2 }}>
    <CardContent>
      <Typography
        variant="h6"
        sx={{
          color: "#3f3f3f",
          marginBottom: 4,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        EXTRA-CURRICULAR ACTIVITIES
      </Typography>

      <Stack spacing={2}>
        <TextFields
          label="Clubs/Organization"
          placeholder="Enter club/organization name"
          name="clubsOrganization"
          control={control}
        />
        <TextFields
          label="Position Held"
          placeholder="Enter position held"
          name="positionHeld"
          control={control}
        />
        <TextFields
          label="Year"
          placeholder="Enter year"
          name="year"
          control={control}
        />
        <TextFields
          label="Grade/Year Level"
          placeholder="Enter grade/year level"
          name="gradeYearLevel"
          control={control}
        />
      </Stack>
    </CardContent>
  </Card>
);

const PageSix = ({ control }) => (
  <Card sx={{ marginBottom: 3, boxShadow: 2 }}>
    <CardContent>
      <Typography
        variant="h6"
        sx={{
          color: "#3f3f3f",
          marginBottom: 4,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        PSYCHOLOGICAL TEST RESULTS
      </Typography>

      <Stack spacing={2}>
        <TextFields
          label="Name of Test"
          placeholder="Enter name of test"
          name="nameOfTest"
          control={control}
        />
        <TextFields
          label="Raw Score"
          placeholder="Enter raw score"
          name="rawScore"
          control={control}
        />
        <TextFields
          label="Percentile Rank"
          placeholder="Enter percentile rank"
          name="percentileRank"
          control={control}
        />
        <TextFields
          label="Stanine"
          placeholder="Enter stanine"
          name="stanine"
          control={control}
        />
        <TextFields
          label="Verbal Interpretation"
          placeholder="Enter verbal interpretation"
          name="verbalInterpretation"
          control={control}
        />
      </Stack>
    </CardContent>
  </Card>
);

const StudentApplicationForm = () => {
  const { control } = useForm();
  const [page, setPage] = useState(1);

  const handleNext = () => {
    setPage((prevPage) => Math.min(prevPage + 1, 6));
  };

  const handleBack = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "900px",
        padding: 4,
        backgroundColor: "#fafafa",
        borderRadius: 2,
        margin: "auto",
        mt: 4,
        mb: 4,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#3f3f3f",
          marginBottom: 4,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        STUDENT EVALUATION FORM
      </Typography>

      {page === 1 && <PageOne control={control} />}
      {page === 2 && <PageTwo control={control} />}
      {page === 3 && <PageThree control={control} />}
      {page === 4 && <PageFour control={control} />}
      {page === 5 && <PageFive control={control} />}
      {page === 6 && <PageSix control={control} />}
      {/* Other Pages */}

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        sx={{ marginTop: 4 }}
      >
        <IconButton
          onClick={handleBack}
          disabled={page === 1}
          sx={{ color: "#1976d2" }}
        >
          <ArrowBack />
        </IconButton>
        <IconButton
          onClick={handleNext}
          disabled={page === 6}
          sx={{ color: "#1976d2" }}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
    </Paper>
  );
};

export default StudentApplicationForm;
