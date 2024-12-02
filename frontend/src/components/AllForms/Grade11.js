// import React from "react";
// import {
//   Typography,
//   Paper,
//   Box,
//   Card,
//   CardContent,
//   Stack,
//   Button,
//   TextField
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct

// const Grade11 = () => {
//   const defaultValues = {
//     name: "",
//     age: "",
//     sex: "",
//     gradeLevel: "",
//     section: "",
//     top_1: "",
//     top_2: "",
//     top_3: "",
//     warmth: "",
//     reasoning: "",
//     dominance: "",
//     liveliness: "",
//     rule_consciousness: "",
//     social_boldness: "",
//     sensitivity: "",
//     vigilance: "",
//     abstract: "",
//     privateness: "",
//     apprehension: "",
//     openness: "",
//     self_reliance: "",
//     perfectionism: "",
//     tension: "",
//   };

//   const { control, handleSubmit, reset, setValue } = useForm({
//     defaultValues: defaultValues
//   });

//   // Submit handler
//   const submission = (data) => {
//     AxiosInstance.post(`/grade_two/`, {
//     name: data.name,
//     age: data.age,
//     sex: data.sex,
//     gradeLevel: data.gradeLevel,
//     section: data.section,
//     top_1: data.top_1,
//     top_2: data.top_2,
//     top_3: data.top_3,
//     warmth: data.warmth,
//     reasoning: data.reasoning,
//     dominance: data.dominance,
//     liveliness: data.liveliness,
//     rule_consciousness: data.rule_consciousness,
//     social_boldness: data.social_boldness,
//     sensitivity: data.sensitivity,
//     vigilance: data.vigilance,
//     abstract: data.abstract,
//     privateness: data.privateness,
//     apprehension: data.apprehension,
//     openness: data.openness,
//     self_reliance: data.self_reliance,
//     perfectionism: data.perfectionism,
//     tension: data.tension,
//     })
//       .then((response) => {
//         console.log("Data submitted successfully:", response.data);
//         reset(); // Reset form after successful submission
//       })
//       .catch((error) => {
//         console.error("Error submitting data:", error);
//       });
//   };
//   return (
//     <form onSubmit={handleSubmit(submission)}>
//     <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom align="center">
//           Grade 11
//         </Typography>
//         <Paper
//           elevation={3}
//           sx={{
//             padding: "40px",
//             borderRadius: "8px",
//             backgroundColor: "#f7f9fc",
//             minHeight: "50vh",
//           }}
//         >
//           <Stack spacing={2}>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Student Name:"
//                 name="name"
//                 control={control}
//               />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField label="Age:" name="age" control={control} />
//               <SingleSelect
//                 label="Sex:"
//                 name="sex"
//                 control={control}
//                 options={["M", "F"]}
//               />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Grade Level:"
//                 name="gradeLevel"
//                 control={control}
//               />
//               <SingleSelect
//                 label="Section:"
//                 name="section"
//                 control={control}
//                 options={[
//                   "Fatima",
//                   "Consolation",
//                   "Grace",
//                   "Assumption",
//                   "Guadalupe",
//                   "Good Voyage",
//                   "Good Remedy",
//                   "Perpetual Help",
//                   "Mt. Carmel",
//                   "Lourdes",
//                   "Pillar / Mercy",
//                 ]}
//               />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField label="Top 1:" name="top_1" control={control} />
//               <TextField label="Top 2:" name="top_2" control={control} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField label="Top 3:" name="top_3" control={control} />
//               <TextField label="Warmth:" name="warmth" control={control} />
//             </Stack>

//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Reasoning:"
//                 name="reasoning"
//                 control={control}
//               />
//               <TextField label="Emotion:" name="emotion" control={control} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Dominance:"
//                 name="dominance"
//                 control={control}
//               />
//               <TextField
//                 label="Liveliness:"
//                 name="liveliness"
//                 control={control}
//               />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Rule - Consciousness:"
//                 name="rule_consciousness"
//                 control={control}
//               />
//               <TextField
//                 label="Social Boldness:"
//                 name="social_boldness"
//                 control={control}
//               />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Sensitivity:"
//                 name="sensitivity"
//                 control={control}
//               />
//               <TextField
//                 label="Vigilance:"
//                 name="vigilance"
//                 control={control}
//               />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField label="Abstract:" name="abstract" control={control} />
//               <TextField
//                 label="Privateness:"
//                 name="privateness"
//                 control={control}
//               />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Apprehension:"
//                 name="apprehension"
//                 control={control}
//               />
//               <TextField label="Openness:" name="openness" control={control} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <TextField
//                 label="Self Reliance:"
//                 name="self_reliance"
//                 control={control}
//               />
//               <TextField
//                 label="Pefectionism:"
//                 name="perfectionism"
//                 control={control}
//               />
//               <TextField label="Tension:" name="tension" control={control} />
//             </Stack>
//           </Stack>

//           {/* Submit Button */}
//           <Box
//             sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit(onSubmit)}
//               sx={{ marginTop: "10px" }}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Paper>
//       </CardContent>
//     </Card>
//     </form>
//   );
// };

// export default Grade11;


import React from "react";
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Stack,
  Button,
  TextField,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios"; // Ensure the AxiosInstance path is correct

const Grade11 = () => {
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    top_1: "",
    top_2: "",
    top_3: "",
    warmth: "",
    reasoning: "",
    emotional:"",
    dominance: "",
    liveliness: "",
    rule_consciousness: "",
    social_boldness: "",
    sensitivity: "",
    vigilance: "",
    abstract: "",
    privateness: "",
    apprehension: "",
    openness: "",
    self_reliance: "",
    perfectionism: "",
    tension: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues,
  });

  // Submit handler
  const submission = (data) => {
    AxiosInstance.post(`/grade_eleven/`, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      section: data.section,
      top_1: data.top_1,
      top_2: data.top_2,
      top_3: data.top_3,
      warmth: data.warmth,
      reasoning: data.reasoning,
      emotional: data.emotional,
      dominance: data.dominance,
      liveliness: data.liveliness,
      rule_consciousness: data.rule_consciousness,
      social_boldness: data.social_boldness,
      sensitivity: data.sensitivity,
      vigilance: data.vigilance,
      abstract: data.abstract,
      privateness: data.privateness,
      apprehension: data.apprehension,
      openness: data.openness,
      self_reliance: data.self_reliance,
      perfectionism: data.perfectionism,
      tension: data.tension,
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
      <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Grade 11
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
            <Stack spacing={3}>
              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Student Name"
                    {...field}
                    sx={{
                      flex: 1,
                      minWidth: "100%",
                      marginBottom: { xs: 2, sm: 0 },
                    }} // Full width
                  />
                )}
              />

              {/* Age, Sex, Grade Level */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Age"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
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
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="gradeLevel"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Grade Level"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              {/* Section, Top 1, Top 2 */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Section"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="top_1"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Top 1"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="top_2"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Top 2"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              {/* Top 3, Warmth, Reasoning */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="top_3"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Top 3"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="warmth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Warmth"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="reasoning"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Reasoning"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              {/* Dominance, Liveliness, Rule Consciousness */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="emotional"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Emotional Stablity"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="dominance"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Dominance"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="liveliness"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Liveliness"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              {/* Social Boldness, Sensitivity, Vigilance */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="rule_consciousness"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Rule-Consciousness"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="social_boldness"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Social Boldness"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="sensitivity"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Sensitivity"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              {/* Abstract, privateness, apprehension, openness, self_reliance, perfectionism, tension */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="vigilance"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="vigilance"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="abstractedness"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Abstractedness"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="privateness"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Privateness"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >
                <Controller
                  name="apprehension"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Apprehension"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="openess"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Openness to Change"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="selef_reliance"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Self Reliance"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ flexWrap: "wrap" }}
              >

<Controller
                  name="perfectionism"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Perfectionism"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
                <Controller
                  name="tension"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Tension"
                      {...field}
                      sx={{
                        flex: 1,
                        minWidth: "200px",
                        marginBottom: { xs: 2, sm: 0 },
                      }}
                    />
                  )}
                />
              </Stack>

              {/* Submit Button */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
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
            </Stack>
          </Paper>
        </CardContent>
      </Card>
    </form>
  );
};

export default Grade11;
