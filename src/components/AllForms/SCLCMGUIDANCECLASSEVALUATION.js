// import React from "react";
// import {
//   Typography,
//   Paper,
//   Card,
//   CardContent,
//   Stack,
//   TextField,
//   Divider,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Button,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import SingleSelect from "./AllForms/Forms/SingleSelect";
// import AxiosInstance from "./AllForms/Axios";

// const SCLCMGUIDANCECLASSEVALUATION = () => {
//   const defaultValues = {
//     name: "",
//     grade: "",
//     section: "",
//     question_1: "",
//     question_2: "",
//     question_3: "",
//     question_4: "",
//     question_5: "",
//     question_6: "",
//     question_7: "",
//     question_8: "",
//     question_9: "",
//   };

//   const { control, handleSubmit, reset, setValue } = useForm({
//     defaultValues: defaultValues,
//   });

//   const submission = (data) => {
//     AxiosInstance.post(`/sclcm_guidance_class/`, {
//       name: data.name,
//       grade: data.grade,
//       section: data.section,
//       question_1: data.question_1,
//       question_2: data.question_2,
//       question_3: data.question_3,
//       question_4: data.question_4,
//       question_5: data.question_5,
//       question_6: data.question_6,
//       question_7: data.question_7,
//       question_8: data.question_8,
//       question_9: data.question_9,
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
//       <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom align="center">
//             WHAT DO YOU THINK OF WHAT WE DID TODAY?
//           </Typography>
//           <Paper
//             elevation={3}
//             sx={{
//               padding: "40px",
//               borderRadius: "8px",
//               backgroundColor: "#f7f9fc",
//               minHeight: "60vh",
//             }}
//           >
//             <Stack spacing={2}>
//               {/* First Row: Name, Grade, Section, and Date */}
//               <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
//                 <Controller
//                   name="name"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField
//                       {...field}
//                       label="Name"
//                       placeholder=""
//                       sx={{ flex: 1 }}
//                     />
//                   )}
//                 />
//                 <Controller
//                   name="grade"
//                   control={control}
//                   render={({ field }) => (
//                     <SingleSelect
//                       label="Grade Level"
//                       options={["Grade 6", "Grade 7", "Grade 8"]}
//                       {...field}
//                       sx={{ flex: 1 }}
//                     />
//                   )}
//                 />
//                 <Controller
//                   name="section"
//                   control={control}
//                   render={({ field }) => (
//                     <SingleSelect
//                       label="Section"
//                       options={[
//                         "St. Gregory",
//                         "St. Alexander",
//                         "St. Barachiel",
//                         "St. Gabriel",
//                         "St. Sealtiel",
//                         "St. Raphael",
//                         "St. Michael",
//                         "St. Uriel",
//                         "St. Judiel",
//                         "St. Sebastian",
//                         "St. Charles",
//                         "St. Christopher",
//                         "St. Vincent",
//                         "St. Francis",
//                         "St. Benedict",
//                         "St. Martin",
//                       ]}
//                       {...field}
//                       sx={{ flex: 1 }}
//                     />
//                   )}
//                 />
//               </Stack>

//               <Divider sx={{ marginY: 2 }} />

//               {/* Question Section */}
//               <Typography variant="h7" gutterBottom align="left">
//                 1. How much of the Guidance Class content was new to you?
//               </Typography>
//               <Controller
//                 name="question_1"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup {...field} sx={{ display: "flex", flexDirection: "column" }}>
//                     <FormControlLabel value="none" control={<Radio />} label="None was new to me" />
//                     <FormControlLabel value="some" control={<Radio />} label="Some were new to me" />
//                     <FormControlLabel value="almostAll" control={<Radio />} label="Almost all was new to me" />
//                     <FormControlLabel value="everything" control={<Radio />} label="Everything was new to me" />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 2. Is the Guidance Class important to you?
//               </Typography>
//               <Controller
//                 name="question_2"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup {...field} sx={{ display: "flex", flexDirection: "column" }}>
//                     <FormControlLabel value="not" control={<Radio />} label="Not at all relevant" />
//                     <FormControlLabel value="some" control={<Radio />} label="Somewhat relevant" />
//                     <FormControlLabel value="very" control={<Radio />} label="Very relevant" />
//                     <FormControlLabel value="extremely" control={<Radio />} label="Extremely relevant" />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 3. How easy were the written materials to understand?
//               </Typography>
//               <Controller
//                 name="question_3"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup {...field} sx={{ display: "flex", flexDirection: "column" }}>
//                     <FormControlLabel value="not" control={<Radio />} label="Not at all easy" />
//                     <FormControlLabel value="some" control={<Radio />} label="Some were easy" />
//                     <FormControlLabel value="most" control={<Radio />} label="Most of it was easy" />
//                     <FormControlLabel value="everything" control={<Radio />} label="Everything was easy" />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 4. How effective was the counselor?
//               </Typography>
//               <Controller
//                 name="question_4"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup {...field} sx={{ display: "flex", flexDirection: "column" }}>
//                     <FormControlLabel value="not" control={<Radio />} label="Not at all effective" />
//                     <FormControlLabel value="some" control={<Radio />} label="Somewhat effective" />
//                     <FormControlLabel value="very" control={<Radio />} label="Very effective" />
//                     <FormControlLabel value="extremely" control={<Radio />} label="Extremely effective" />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 5. How efficient do you feel about your ability to put what you have learned into practice?
//               </Typography>
//               <Controller
//                 name="question_5"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup {...field} sx={{ display: "flex", flexDirection: "column" }}>
//                     <FormControlLabel value="not" control={<Radio />} label="Not at all confident" />
//                     <FormControlLabel value="some" control={<Radio />} label="Somewhat confident" />
//                     <FormControlLabel value="confident" control={<Radio />} label="Confident" />
//                     <FormControlLabel value="very" control={<Radio />} label="Very Confident" />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 6. What is your overall assessment of the Guidance Class?
//               </Typography>
//               <Controller
//                 name="question_6"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup {...field} sx={{ display: "flex", flexDirection: "column" }}>
//                     <FormControlLabel value="poor" control={<Radio />} label="Poor" />
//                     <FormControlLabel value="satisfactory" control={<Radio />} label="Satisfactory" />
//                     <FormControlLabel value="good" control={<Radio />} label="Good" />
//                     <FormControlLabel value="excellent" control={<Radio />} label="Excellent" />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 7. What were the two best things about our guidance class today?
//               </Typography>
//               <Controller
//                 name="question_7"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField {...field} placeholder="" multiline rows={2} sx={{ flex: 1 }} />
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 8. What were the two worst things about our guidance class today?
//               </Typography>
//               <Controller
//                 name="question_8"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField {...field} placeholder="" multiline rows={2} sx={{ flex: 1 }} />
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />
//               <Typography variant="h7" gutterBottom align="left">
//                 9. What would make it better?
//               </Typography>
//               <Controller
//                 name="question_9"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField {...field} placeholder="" multiline rows={2} sx={{ flex: 1 }} />
//                 )}
//               />

//               {/* Submit Button */}
//               <Stack direction="row" justifyContent="flex-end" sx={{ marginTop: 2 }}>
//                 <Button variant="contained" onClick={handleSubmit(submission)}>
//                   Submit
//                 </Button>
//               </Stack>
//             </Stack>
//           </Paper>
//         </CardContent>
//       </Card>
//     </form>
//   );
// };

// export default SCLCMGUIDANCECLASSEVALUATION;

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
    AxiosInstance.post(`/guidance_class_evaluation/`, {
      name: data.name,
      grade: data.grade,
      section: data.section,
      question_1: data.question_1,
      question_2: data.question_2,
      question_3: data.question_3,
      question_4: data.question_4,
      question_5: data.question_5,
      question_6: data.question_6,
      question_7: data.question_7,
      question_8: data.question_8,
      question_9: data.question_9,
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
              {/* First Row: Name, Grade, Section */}
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      placeholder=""
                      sx={{ flex: 1 }}
                    />
                  )}
                />
                <Controller
                  name="grade"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Grade Level"
                      options={["Grade 6", "Grade 7", "Grade 8"]}
                      {...field}
                      sx={{ width: "250px" }} // Set width to 250px
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
                      sx={{ width: "250px" }} // Set width to 250px
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
                    label="Question1"
                    options={[
                      "None was new to me",
                      "Some were new to me",
                      "Almost all was new to me",
                      "Everything was new to me",
                    ]}
                    sx={{ width: "50%"  }} // Set width to 250px
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
                    label="Question2"
                    options={[
                      "Not at all relevant",
                      "Somewhat relevant",
                      "Very relevant",
                      "Extremely relevant",
                    ]}
                    sx={{ width: "50%"  }} // Set width to 250px
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
                    label="Question3"
                    options={[
                      "Not at all easy",
                      "Some were easy",
                      "Most of it was easy",
                      "Everything was easy",
                    ]}
                    sx={{ width: "50%" }} // Set width to 250px
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
                    label="Question4"
                    options={[
                      "Not at all effective",
                      "Somewhat effective",
                      "Very effective",
                      "Extremely effective",
                    ]}
                    sx={{ width: "50%"  }} // Set width to 250px
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
                    label="Question5"
                    options={[
                      "Not at all confident",
                      "Somewhat confident",
                      "Confident",
                      "Very Confident",
                    ]}
                    sx={{ width: "50%" }} // Set width to 250px
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
                    label="Question6"
                    options={["Poor", "Satisfactory", "Good", "Excellent"]}
                    sx={{ width: "50%"  }} // Set width to 250px
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
                    label="Question7"
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
                    label="Question8"
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
                    label="Question9"
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
