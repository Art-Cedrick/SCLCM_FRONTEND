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

// const Grade3 = () => {

//   const defaultValues = {
//     name: '',
//     age: '',
//     sex: '',
//     gradeLevel: '',
//     section: '',
//     raw_score: '',
//     percentile: '',
//     stanine: '',
//     verbal_interpretation: '',
//   }

//   const { control, handleSubmit, reset, setValue } = useForm({defaultValues:defaultValues});

//   const submission = (data) => {
//     AxiosInstance.post(`/grade_three/`, {
//       name: data.name,
//       age: data.age,
//       sex: data.sex,
//       gradeLevel: data.gradeLevel,
//       section: data.section,
//       raw_score: data.raw_score,
//       percentile: data.percentile,
//       stanine: data.stanine,
//       verbal_interpretation: data.verbal_interpretation,
//     }).then(response => {
//       console.log("Data submitted successfully:", response.data);
//       reset(); // Reset form after successful submission
//     })
//     .catch(error => {
//       console.error("Error submitting data:", error);
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(submission)}>
//     <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom align="center">
//           Grade 3
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
//                 label="Student Name:"
//                 {...field}
//               />
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
//               <SingleSelect
//                 label="Section:"
//                 {...field}
//                 options={[
//                   "Gabriel",
//                   "Michael",
//                   "Judiel",
//                   "Raphael",
//                   "Sealtiel",
//                   "Uriel",
//                 ]}
//               />
//                 )}
//                 />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="raw_score"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Raw Score:"
//                 {...field}
//               />
//                 )}
//                 />
//               <Controller
//                 name="percentile"
//                 control={control}
//                 render={({field}) => (  
//               <TextField
//                 label="Percentile:"
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
//                 name="verbal_interpretation"
//                 control={control}
//                 render={({field}) => (  
//               <SingleSelect
//                 label="Verbal Interpretation:"
//                 {...field}
//                 options={[
//                   "Superior",
//                   "Above Average",
//                   "Average",
//                   "Below Average",
//                   "Low",
//                   "Poor",
//                 ]}
//               />
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

// export default Grade3;

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
import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct
import AxiosInstance from "./Axios";

const Grade3 = () => {
  const defaultValues = {
    name: '',
    age: '',
    sex: '',
    gradeLevel: '',
    section: '',
    raw_score: '',
    percentile: '',
    stanine: '',
    verbal_interpretation: '',
  };

  const { control, handleSubmit, reset, setValue } = useForm({ defaultValues:defaultValues });

  const submission = (data) => {
    AxiosInstance.post(`/grade_three/`, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      section: data.section,
      raw_score: data.raw_score,
      percentile: data.percentile,
      stanine: data.stanine,
      verbal_interpretation: data.verbal_interpretation,
    }).then(response => {
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
            Grade 3
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
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    label="Student Name"
                    {...field}
                    sx={{ flex: 1, minWidth: "100%", marginBottom: { xs: 2, sm: 0 } }} // Full width
                  />
                )}
              />

              {/* All other fields in three columns */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Age"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
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
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
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
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
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
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
                    />
                  )}
                />
                <Controller
                  name="raw_score"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Raw Score"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
                    />
                  )}
                />
                <Controller
                  name="percentile"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Percentile"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="stanine"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Stanine"
                      {...field}
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
                    />
                  )}
                />
                <Controller
                  name="verbal_interpretation"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Verbal Interpretation"
                      {...field}
                      options={[
                        "Superior",
                        "Above Average",
                        "Average",
                        "Below Average",
                        "Low",
                        "Poor",
                      ]}
                      sx={{ flex: 1, minWidth: "200px", marginBottom: { xs: 2, sm: 0 } }}
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

export default Grade3;
