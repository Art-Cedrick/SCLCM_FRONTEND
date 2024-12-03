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
// import { useForm, Controller } from "react-hook-form";
// import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
// import AxiosInstance from "./Axios";

// const Grade2 = () => {

//   const defaultValues = {
//     name: '',
//     age: '',
//     sex: '',
//     gradeLevel: '',
//     section: '',
//     totalEQ: '',
//     verbalInterpretation: '',
//     stanine: '',
//     sa: '',
//     mme: '',
//     sm: '',
//     e: '',
//     hr: '',
//   }

//   const { control, handleSubmit, reset, setValue } = useForm({defaultValues:defaultValues});

//   // Submit handler
//   const submission = (data) => {
//     AxiosInstance.post(`/grade_two/`, {
//       name: data.name,
//       age: data.age,
//       sex: data.sex,
//       gradeLevel: data.gradeLevel,
//       section: data.section,
//       totalEQ: data.totalEQ,
//       verbalInterpretation: data.verbalInterpretation,
//       stanine: data.stanine,
//       sa: data.sa,
//       mme: data.mme,
//       sm: data.sm,
//       e: data.e,
//       hr: data.hr,
//     }).then(response => {
//       console.log("Data submitted successfully:", response.data);
//       reset(); // Reset form after successful submission
//     })
//     .catch(error => {
//       console.error("Error submitting data:", error);
//     });
//   }

//   return (
//     <form onSubmit={handleSubmit(submission)}>
//     <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom align="center">
//           Grade 2
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
//               <Controller
//                 name="name"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Name:"
//                 {...field}
//                 placeholder=""
//                 />
//                 )}
//                 />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="age"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Age:"
//                 {...field}
//                 placeholder=""
//                 />
//                 )}
//                 />
//               <Controller
//                 name="sex"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Sex:"
//                 {...field}
//                 options={["M", "F"]}
//                 sx={{width: "100px" }}
//               />
//                 )}
//                 />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="gradeLevel"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Grade Level:"
//                 {...field}
//               />
//                 )}
//                 />
//               <Controller
//                 name="section"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Section:"
//                 {...field}
//               />
//                 )}
//                 />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="totalEQ"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Total EQ:"
//                 {...field}
//                />
//                 )}
//                 />
//               <Controller
//                 name="verbalInterpretation"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Verbal Interpretation:"
//                 {...field}
//               />
//                 )}
//                 />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="stanine"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Stanine:"
//                 {...field}
//                 />
//                 )}
//                 />
//               <Controller
//                 name="sa"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="SA:"
//                  {...field}
//                 />
//                 )}
//                 />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="mme"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//               label="MME:"
//                {...field}
//               />
//                 )}
//                 />
//               <Controller
//                 name="sm"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="SM:"
//                 {...field}
//                 />
//                 )}
//                 />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="e"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="E:"
//                  {...field}
//                 />
//                 )}
//                 />
//               <Controller
//                 name="hr"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="HR:"
//                 {...field}
//                 />
//                 )}
//                 />
//             </Stack>
//           </Stack>

//           {/* Submit Button */}
//           <Box
//             sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
//           >
//             <Button
//               variant="contained"
//               color="primary"
//               type="submit"
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

// export default Grade2;

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
import AxiosInstance from "./Axios";

const Grade2 = () => {
  const defaultValues = {
    name: "",
    age: "",
    sex: "",
    gradeLevel: "",
    section: "",
    totalEQ: "",
    verbalInterpretation: "",
    stanine: "",
    sa: "",
    mme: "",
    sm: "",
    e: "",
    hr: "",
  };

  const { control, handleSubmit, reset, setValue } = useForm({
    defaultValues: defaultValues
  });

  // Submit handler
  const submission = (data) => {
    AxiosInstance.post(`/grade_two/`, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      section: data.section,
      totalEQ: data.totalEQ,
      verbalInterpretation: data.verbalInterpretation,
      stanine: data.stanine,
      sa: data.sa,
      mme: data.mme,
      sm: data.sm,
      e: data.e,
      hr: data.hr,
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
            Grade 2
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
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Name"
                    {...field}
                    placeholder=""
                    sx={{
                      flex: 1,
                      minWidth: "100%",
                      marginBottom: { xs: 2, sm: 0 },
                    }} // Full width
                  />
                )}
              />

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
                      placeholder=""
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
                  name="totalEQ"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Total EQ"
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
                  name="verbalInterpretation"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Verbal Interpretation"
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
                  name="stanine"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Stanine"
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
                  name="sa"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="SA"
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
                  name="mme"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="MME"
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
                  name="sm"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="SM"
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
                  name="e"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="E"
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
                  name="hr"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="HR"
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

export default Grade2;
