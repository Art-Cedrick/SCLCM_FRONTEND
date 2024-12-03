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
// import AxiosInstance from "./Axios";
// import SingleSelect from "./Forms/SingleSelect"; // Ensure this path is correct

// const Grade9 = () => {

//   const defaultValues ={
//     name: '',
//     age: '',
//     sex: '',
//     gradeLevel: '',
//     section: '',
//     top_one: '',
//     top_two: '',
//     top_three: '',
//     self_control: '',
//     mas_fem: '',
//     status: '',
//     infrequency: '',
//     acquiescence: '',
//     r: '',
//     i: '',
//     a: '',
//     s: '',
//     e: '',
//     c: '',
//     se: '',
//     mf: '', 
//     st: '', 
//     inf: '',
//     ac: '',
//   }

//   const { control, handleSubmit, reset, setValue } = useForm({defaultValues:defaultValues});

//   const submission = (data) => {
//     AxiosInstance.post(`/grade_nine/`,{
//       name: data.name,
//       age: data.age,
//       sex: data.sex,
//       gradeLevel: data.gradeLevel,
//       section: data.section,
//       top_one: data.top_one,
//       top_two: data.top_two,
//       top_three: data.top_three,
//       self_control: data.self_control,
//       mas_fem: data.mas_fem,
//       status: data.status,
//       infrequency: data.infrequency,
//       acquiescence: data.acquiescence,
//       r: data.r,
//       i: data.i,
//       a: data.a,
//       s: data.s,
//       e: data.e,
//       c: data.c,
//       se: data.se,
//       mf: data.mf, 
//       st: data.st, 
//       inf: data.inf,
//       ac: data.ac,
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
//           Grade 9
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
//               /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="age" control={control}
//                 render={({field}) => (
//               <TextField label="Age:" {...field} /> )} />
//               <Controller
//                 name="sex"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Sex:"
//                 {...field}
//                 options={["M", "F"]}
//               /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="gradeLevel"
//                 control={control}
//                 render={({field}) => (
//               <TextField
//                 label="Grade Level:"
//                 {...field}
//               /> )} />
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
//               /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="top_one"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Top 1:"
//                 {...field}
//                 options={[
//                   "Realistic",
//                   "Investigative",
//                   "Artistic",
//                   "Social",
//                   "Enterprising",
//                   "Conventional",
//                 ]}
//               /> )} />
//               <Controller 
//                 name="top_two"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Top 2:"
//                 {...field}
//                 options={[
//                   "Realistic",
//                   "Investigative",
//                   "Artistic",
//                   "Social",
//                   "Enterprising",
//                   "Conventional",
//                 ]}
//               /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="top_three"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Top 3:"
//                 {...field}
//                 options={[
//                   "Realistic",
//                   "Investigative",
//                   "Artistic",
//                   "Social",
//                   "Enterprising",
//                   "Conventional",
//                 ]}
//               /> )} />
//               <Controller
//                 name="self_control"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Self Control:"
//                 {...field}
//                 options={["High", "Low"]}
//               /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="mas_fem"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Masculinity-Femininity:"
//                 {...field}
//                 options={["High", "Low"]}
//               /> )} />
//               <Controller
//                 name="status"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Status:"
//                 {...field}
//                 options={["1 ", " 2", " 3"]}
//               /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="infrequency"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Infrequency:"
//                 {...field}
//                 options={["High", "Low"]}
//               /> )} />
//               <Controller
//                 name="acquiescence"
//                 control={control}
//                 render={({field}) => (
//               <SingleSelect
//                 label="Acquiescence:"
//                 {...field}
//                 options={["High", "Low"]}
//               /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="r" control={control}
//                 render={({field}) => (
//               <TextField label="R:" {...field} /> )} />
//               <Controller
//                 name="i" control={control}
//                 render={({field}) => (
//               <TextField label="I:" {...field} /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="a" control={control}
//                 render={({field}) => (
//               <TextField label="A:" {...field} /> )} />
//               <Controller
//                 name="s" control={control}
//                 render={({field}) => (
//               <TextField label="S:" {...field} /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="e" control={control}
//                 render={({field}) => (
//               <TextField label="E:" {...field} /> )} />
//               <Controller
//                 name="c" control={control}
//                 render={({field}) => (
//               <TextField label="C:" {...field} /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="se" control={control}
//                 render={({field}) => (
//               <TextField label="Sc:" {...field} /> )} />
//               <Controller
//                 name="mf" control={control}
//                 render={({field}) => (
//               <TextField label="Mf:" {...field} /> )} />
//             </Stack>
//             <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//               <Controller
//                 name="st" control={control}
//                 render={({field}) => (
//               <TextField label="St:" {...field} /> )} />
//               <Controller
//                 name="inf" control={control}
//                 render={({field}) => (
//               <TextField label="Inf:" {...field} /> )} />
//               <Controller
//                 name="ac" control={control}
//                 render={({field}) => (
//               <TextField label="Ac:" {...field} /> )} />
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

// export default Grade9;

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

const Grade9 = () => {
  const defaultValues = {
    name: '',
    age: '',
    sex: '',
    gradeLevel: '',
    section: '',
    top_one: '',
    top_two: '',
    top_three: '',
    self_control: '',
    mas_fem: '',
    status: '',
    infrequency: '',
    acquiescence: '',
    r: '',
    i: '',
    a: '',
    s: '',
    e: '',
    c: '',
    se: '',
    mf: '', 
    st: '', 
    inf: '',
    ac: '',
  };

  const { control, handleSubmit, reset, setValue } = useForm({ defaultValues:defaultValues });

  const submission = (data) => {
    AxiosInstance.post(`/grade_nine/`, {
      name: data.name,
      age: data.age,
      sex: data.sex,
      gradeLevel: data.gradeLevel,
      section: data.section,
      top_one: data.top_one,
      top_two: data.top_two,
      top_three: data.top_three,
      self_control: data.self_control,
      mas_fem: data.mas_fem,
      status: data.status,
      infrequency: data.infrequency,
      acquiescence: data.acquiescence,
      r: data.r,
      i: data.i,
      a: data.a,
      s: data.s,
      e: data.e,
      c: data.c,
      se: data.se,
      mf: data.mf, 
      st: data.st, 
      inf: data.inf,
      ac: data.ac,
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
            Grade 9
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
                    <TextField label="Student Name:" {...field} fullWidth />
                  )}
                />
              </Stack>

              {/* Subsequent rows with three columns each */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Age:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Sex:"
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
                    <TextField label="Grade Level:" {...field} fullWidth />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="section"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Section:"
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
                  name="top_one"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Top 1:"
                      {...field}
                      options={[
                        "Realistic",
                        "Investigative",
                        "Artistic",
                        "Social",
                        "Enterprising",
                        "Conventional",
                      ]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="top_two"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Top 2:"
                      {...field}
                      options={[
                        "Realistic",
                        "Investigative",
                        "Artistic",
                        "Social",
                        "Enterprising",
                        "Conventional",
                      ]}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="top_three"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Top 3:"
                      {...field}
                      options={[
                        "Realistic",
                        "Investigative",
                        "Artistic",
                        "Social",
                        "Enterprising",
                        "Conventional",
                      ]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="self_control"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Self Control:"
                      {...field}
                      options={["High", "Low"]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="mas_fem"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Masculinity-Femininity:"
                      {...field}
                      options={["High", "Low"]}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Status:"
                      {...field}
                      options={["1", "2", "3"]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="infrequency"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Infrequency:"
                      {...field}
                      options={["High", "Low"]}
                      fullWidth
                    />
                  )}
                />
                <Controller
                  name="acquiescence"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Acquiescence:"
                      {...field}
                      options={["High", "Low"]}
                      fullWidth
                    />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="r"
                  control={control}
                  render={({ field }) => (
                    <TextField label="R:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="i"
                  control={control}
                  render={({ field }) => (
                    <TextField label="I:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="a"
                  control={control}
                  render={({ field }) => (
                    <TextField label="A:" {...field} fullWidth />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="s"
                  control={control}
                  render={({ field }) => (
                    <TextField label="S:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="e"
                  control={control}
                  render={({ field }) => (
                    <TextField label="E:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="c"
                  control={control}
                  render={({ field }) => (
                    <TextField label="C:" {...field} fullWidth />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="se"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Sc:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="mf"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Mf:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="st"
                  control={control}
                  render={({ field }) => (
                    <TextField label="St:" {...field} fullWidth />
                  )}
                />
              </Stack>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="inf"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Inf:" {...field} fullWidth />
                  )}
                />
                <Controller
                  name="ac"
                  control={control}
                  render={({ field }) => (
                    <TextField label="Ac:" {...field} fullWidth />
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

export default Grade9;
