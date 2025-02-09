// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   Paper,
//   Stack,
//   IconButton,
//   TextField,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   Button,
//   Divider,
//   Card,
// } from "@mui/material";
// import { ArrowBack, ArrowForward } from "@mui/icons-material";
// import SingleSelect from "./AllForms/Forms/SingleSelect";
// import { useForm, Controller } from "react-hook-form";
// import AxiosInstance from "./AllForms/Axios";
// import { useMutation, useQueryClient } from "react-query";

// const PageOne = ({ control }) => (
//   <Box>
//     <Stack spacing={6}>
//       {/* First row - Name */}
//       <Stack spacing={6}>
//         <Controller
//           name="name"
//           control={control}
//           render={({ field }) => (
//             <TextField
//               {...field}
//               label="Name"
//               variant="outlined"
//               sx={{ width: "100%" }}
//             />
//           )}
//         />
//       </Stack>

//       {/* Second row - Section and Grade Level */}
//       <Stack direction="row" spacing={3}>
//         <Stack spacing={6} sx={{ flex: 1 }}>
//           <Controller
//             name="section"
//             control={control}
//             render={({ field }) => (
//               <SingleSelect
//                 label="Section"
//                 {...field}
//                 options={[
//                   "St. Gregory",
//                   "St. Alexander",
//                   "St. Barachiel",
//                   "St. Gabriel",
//                   "St. Sealtiel",
//                   "St. Raphael",
//                   "St. Michael",
//                   "St. Uriel",
//                   "St. Judiel",
//                   "St. Sebastian",
//                   "St. Charles",
//                   "St. Christopher",
//                   "St. Vincent",
//                   "St. Francis",
//                   "St. Benedict",
//                   "St. Martin",
//                 ]}
//                 sx={{ width: "100%" }}
//               />
//             )}
//           />
//         </Stack>
//         <Stack spacing={6} sx={{ flex: 1 }}>
//           <Controller
//             name="gradelevel"
//             control={control}
//             render={({ field }) => (
//               <SingleSelect
//                 label="Grade Level"
//                 {...field}
//                 options={["Grade 6", "Grade 7", "Grade 8"]}
//                 sx={{ width: "100%" }}
//               />
//             )}
//           />
//         </Stack>
//       </Stack>
//     </Stack>
//   </Box>
// );

// const PageTwo = ({ control }) => (
//   <Box>
//     <Stack spacing={3}>
//       <Typography
//         variant="h7"
//         sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
//       >
//         IMPACT OF COMPREHENSIVE GUIDANCE AND COUNSELING PROGRAM
//       </Typography>

//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 1 */}
//       <Typography variant="h7" gutterBottom align="left">
//         1. My grades improved.
//       </Typography>
//       <Controller
//         name="improved"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How much did your grades improve?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 2 */}
//       <Typography variant="h7" gutterBottom align="left">
//         2. I can easily identify my interest, strength and weaknesses.
//       </Typography>
//       <Controller
//         name="interests"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How easily can you identify your strengths and weaknesses?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 3 */}
//       <Typography variant="h7" gutterBottom align="left">
//         3. I became aware of the world of work.
//       </Typography>
//       <Controller
//         name="work"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How aware are you of the world of work?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 4 */}
//       <Typography variant="h7" gutterBottom align="left">
//         4. I finish my school work on time.
//       </Typography>
//       <Controller
//         name="ontime"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How well do you finish your school work on time?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 5 */}
//       <Typography variant="h7" gutterBottom align="left">
//         5. I now have a clear career plan.
//       </Typography>
//       <Controller
//         name="careerplan"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How clear is your career plan?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 6 */}
//       <Typography variant="h7" gutterBottom align="left">
//         6. I become more respectful of other people.
//       </Typography>
//       <Controller
//         name="respectful"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How respectful are you towards others?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 7 */}
//       <Typography variant="h7" gutterBottom align="left">
//         7. I become more responsible student.
//       </Typography>
//       <Controller
//         name="responsible"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How responsible are you as a student?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 8 */}
//       <Typography variant="h7" gutterBottom align="left">
//         8. I developed study habits.
//       </Typography>
//       <Controller
//         name="studyhabits"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How developed are your study habits?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 9 */}
//       <Typography variant="h7" gutterBottom align="left">
//         9. I now cooperate with others well.
//       </Typography>
//       <Controller
//         name="cooperate"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How well do you cooperate with others?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 10 */}
//       <Typography variant="h7" gutterBottom align="left">
//         10. I have decided on the field of work that I want to go to.
//       </Typography>
//       <Controller
//         name="decided"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How decided are you on your career field?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 11 */}
//       <Typography variant="h7" gutterBottom align="left">
//         11. I have realistic career goals.
//       </Typography>
//       <Controller
//         name="careergoals"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How realistic are your career goals?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 12 */}
//       <Typography variant="h7" gutterBottom align="left">
//         12. I have been influenced by the counselor’s advice on career planning.
//       </Typography>
//       <Controller
//         name="influenced"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How influenced were you by the counselor's advice?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 13 */}
//       <Typography variant="h7" gutterBottom align="left">
//         13. I have learned how to balance school work and personal life.
//       </Typography>
//       <Controller
//         name="schoolandlife"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How well do you balance school work and personal life?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 14 */}
//       <Typography variant="h7" gutterBottom align="left">
//         14. I have developed self-confidence.
//       </Typography>
//       <Controller
//         name="selfconfidence"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How much have you developed self-confidence?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 15 */}
//       <Typography variant="h7" gutterBottom align="left">
//         15. I am better at managing my time effectively.
//       </Typography>
//       <Controller
//         name="timemanagement"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How well do you manage your time?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 16 */}
//       <Typography variant="h7" gutterBottom align="left">
//         16. I am more motivated to pursue my academic and career goals.
//       </Typography>
//       <Controller
//         name="motivated"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How motivated are you to pursue your goals?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question 17 */}
//       <Typography variant="h7" gutterBottom align="left">
//         17. I feel more confident about my future.
//       </Typography>
//       <Controller
//         name="futureconfidence"
//         control={control}
//         render={({ field }) => (
//           <SingleSelect
//             label="How confident are you about your future?"
//             {...field}
//             options={["Great", "Considerable", "Slight", "Not at All"]}
//             sx={{ width: "100%" }}
//           />
//         )}
//       />
//     </Stack>
//   </Box>
// );

// const PageThree = ({ control }) => (
//   <Box>
//     <Stack spacing={3}>
//       <Typography
//         variant="h7"
//         sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
//       >
//         CLOSING THOUGHTS
//       </Typography>
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question A */}
//       <Typography variant="h7" gutterBottom align="left">
//         A. What was the one service or topic of discussion in SCLCM that was
//         most beneficial or helpful to you?
//       </Typography>
//       <Controller
//         name="helpful"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label=""
//             placeholder="Describe the most helpful service or topic"
//             multiline
//             rows={2}
//             sx={{ flex: 1 }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question B */}
//       <Typography variant="h7" gutterBottom align="left">
//         B. Overall, is the SCLCM Program meeting your needs?
//       </Typography>
//       <Controller
//         name="meetingneeds"
//         control={control}
//         render={({ field }) => (
//           <RadioGroup
//             sx={{ display: "flex", flexDirection: "column" }}
//             {...field}
//           >
//             <FormControlLabel value="yes" control={<Radio />} label="Yes" />
//             <FormControlLabel
//               value="unsure"
//               control={<Radio />}
//               label="Unsure"
//             />
//             <FormControlLabel value="no" control={<Radio />} label="No" />
//           </RadioGroup>
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question B1 */}
//       <Typography variant="h7" gutterBottom align="left">
//         B.1. If YES, how satisfied are you?
//       </Typography>
//       <Controller
//         name="satisfaction"
//         control={control}
//         render={({ field }) => (
//           <RadioGroup
//             sx={{ display: "flex", flexDirection: "column" }}
//             {...field}
//           >
//             <FormControlLabel
//               value="verysatisfied"
//               control={<Radio />}
//               label="Very Satisfied"
//             />
//             <FormControlLabel
//               value="satisfied"
//               control={<Radio />}
//               label="Satisfied"
//             />
//             <FormControlLabel
//               value="somewhatsatisfied"
//               control={<Radio />}
//               label="Somewhat Satisfied"
//             />
//           </RadioGroup>
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question B2 */}
//       <Typography variant="h7" gutterBottom align="left">
//         B.2. If UNSURE or NO, state your reason
//       </Typography>
//       <Controller
//         name="unsureno"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label=""
//             placeholder="State the reason"
//             multiline
//             rows={2}
//             sx={{ flex: 1 }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question C */}
//       <Typography variant="h7" gutterBottom align="left">
//         C. What other activities would you suggest to help improve yourself
//         better? (For: Personal/Social, Educational/Academic)
//       </Typography>
//       <Controller
//         name="activities"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label=""
//             placeholder="Describe the activities"
//             multiline
//             rows={2}
//             sx={{ flex: 1 }}
//           />
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Question D */}
//       <Typography variant="h7" gutterBottom align="left">
//         D. What can you recommend to SCLCM to improve its service offered to the
//         students?
//       </Typography>
//       <Controller
//         name="recommendations"
//         control={control}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label=""
//             placeholder="Provide recommendations"
//             multiline
//             rows={2}
//             sx={{ flex: 1 }}
//           />
//         )}
//       />
//     </Stack>
//   </Box>
// );

// const PageFour = ({ control }) => (
//   <Box>
//     <Stack spacing={3}>
//       <Typography
//         variant="h7"
//         sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
//       >
//         A. Experience with the School Counselor
//       </Typography>
//       <Divider sx={{ marginY: 2 }} />

//       {/* Radio group questions */}
//       <Typography variant="h7" gutterBottom align="left">
//         1. Which of the following describe how well you are acquainted with your
//         counselor?
//       </Typography>
//       <Controller
//         name="acquainted"
//         control={control}
//         render={({ field }) => (
//           <RadioGroup
//             {...field}
//             sx={{ display: "flex", flexDirection: "column" }}
//           >
//             <FormControlLabel
//               value="idk"
//               control={<Radio />}
//               label="I don't know his name"
//             />
//             <FormControlLabel
//               value="ik"
//               control={<Radio />}
//               label="I know his name, but we've never met and talked"
//             />
//             <FormControlLabel
//               value="I've talked"
//               control={<Radio />}
//               label="I've talked with him about minor matters"
//             />
//             <FormControlLabel
//               value="I've talked 2"
//               control={<Radio />}
//               label="I've talked to him about some major concerns"
//             />
//           </RadioGroup>
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       <Typography variant="h7" gutterBottom align="left">
//         2. How easy was it to arrange a time to see your counselor?
//       </Typography>
//       <Controller
//         name="timeToSee"
//         control={control}
//         render={({ field }) => (
//           <RadioGroup
//             {...field}
//             sx={{ display: "flex", flexDirection: "column" }}
//           >
//             <FormControlLabel
//               value="veryeasy"
//               control={<Radio />}
//               label="Very Easy"
//             />
//             <FormControlLabel
//               value="prettyeasy"
//               control={<Radio />}
//               label="Pretty Easy"
//             />
//             <FormControlLabel
//               value="aslightstruggle"
//               control={<Radio />}
//               label="A slight struggle"
//             />
//             <FormControlLabel
//               value="difficult"
//               control={<Radio />}
//               label="Difficult"
//             />
//           </RadioGroup>
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       <Typography variant="h7" gutterBottom align="left">
//         3. How helpful was the counselor in your conversation with him?
//       </Typography>
//       <Controller
//         name="helpfulness"
//         control={control}
//         render={({ field }) => (
//           <RadioGroup
//             {...field}
//             sx={{ display: "flex", flexDirection: "column" }}
//           >
//             <FormControlLabel
//               value="veryhelpful"
//               control={<Radio />}
//               label="Very helpful"
//             />
//             <FormControlLabel
//               value="helpful"
//               control={<Radio />}
//               label="Helpful"
//             />
//             <FormControlLabel
//               value="somewhat helpful"
//               control={<Radio />}
//               label="Somewhat helpful"
//             />
//             <FormControlLabel
//               value="nothelpful"
//               control={<Radio />}
//               label="Not helpful"
//             />
//           </RadioGroup>
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       <Typography variant="h7" gutterBottom align="left">
//         4. How comfortable are you talking with your counselor?
//       </Typography>
//       <Controller
//         name="comfort"
//         control={control}
//         render={({ field }) => (
//           <RadioGroup
//             {...field}
//             sx={{ display: "flex", flexDirection: "column" }}
//           >
//             <FormControlLabel
//               value="verycomfortable"
//               control={<Radio />}
//               label="Very Comfortable"
//             />
//             <FormControlLabel
//               value="comfortable"
//               control={<Radio />}
//               label="Comfortable"
//             />
//             <FormControlLabel
//               value="somewhatcomfortable"
//               control={<Radio />}
//               label="Somewhat comfortable"
//             />
//             <FormControlLabel
//               value="veryuncomfortable"
//               control={<Radio />}
//               label="Very uncomfortable"
//             />
//           </RadioGroup>
//         )}
//       />
//       <Divider sx={{ marginY: 2 }} />

//       {/* Submit button */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-end",
//           marginTop: 2,
//         }}
//       >
//         <Button variant="contained" type="submit" color="primary">
//           Submit
//         </Button>
//       </Box>
//     </Stack>
//   </Box>
// );

// const MS_ImpactEvaluation = ({ initialData, onClose }) => {
//   const queryClient = useQueryClient();

//   const defaultValues = {
//     name: "",
//     section: "",
//     gradelevel: "",
//     improved: "",
//     interests: "",
//     work: "",
//     ontime: "",
//     careerplan: "",
//     respectful: "",
//     responsible: "",
//     studyhabits: "",
//     cooperate: "",
//     decided: "",
//     careergoals: "",
//     influence: "",
//     schoolandlife: "",
//     selfconfidence: "",
//     timemanagement: "",
//     betterdecisions: "",
//     matchcareer: "",
//     helpful: "",
//     meetingneeds: "",
//     satisfaction: "",
//     unsureno: "",
//     activities: "",
//     recommendations: "",
//     acquainted: "",
//     timetosee: "",
//     helpfulness: "",
//     comfort: "",
//   };

//   const { handleSubmit, reset, control } = useForm({
//     defaultValues: initialData || defaultValues,
//   });

//   useEffect(() => {
//     if (initialData) reset(initialData);
//   }, [initialData, reset]);

//   const mutation = useMutation(
//     (data) =>
//       initialData
//         ? AxiosInstance.put(`/ms_impactevaluation/${initialData.id}/`, {
//             name: data.name,
//             section: data.section,
//             gradelevel: data.gradelevel,
//             improved: data.improved,
//             interests: data.interests,
//             work: data.work,
//             ontime: data.ontime,
//             careerplan: data.careerplan,
//             respectful: data.respectful,
//             responsible: data.responsible,
//             studyhabits: data.studyhabits,
//             cooperate: data.cooperate,
//             decided: data.decided,
//             careergoals: data.careergoals,
//             influence: data.influence,
//             schoolandlife: data.schoolandlife,
//             selfconfidence: data.selfconfidence,
//             timemanagement: data.timemanagement,
//             betterdecisions: data.betterdecisions,
//             matchcareer: data.matchcareer,
//             helpful: data.helpful,
//             meetingneeds: data.meetingneeds,
//             satisfaction: data.satisfaction,
//             unsureno: data.unsureno,
//             activities: data.activities,
//             recommendations: data.recommendations,
//             acquainted: data.acquainted,
//             timetosee: data.timetosee,
//             helpfulness: data.helpful,
//             comfort: data.comfort,
//           })
//         : AxiosInstance.post(`/ms_impactevaluation/`, {
//             name: data.name,
//             section: data.section,
//             gradelevel: data.gradelevel,
//             improved: data.improved,
//             interests: data.interests,
//             work: data.work,
//             ontime: data.ontime,
//             careerplan: data.careerplan,
//             respectful: data.respectful,
//             responsible: data.responsible,
//             studyhabits: data.studyhabits,
//             cooperate: data.cooperate,
//             decided: data.decided,
//             careergoals: data.careergoals,
//             influence: data.influence,
//             schoolandlife: data.schoolandlife,
//             selfconfidence: data.selfconfidence,
//             timemanagement: data.timemanagement,
//             betterdecisions: data.betterdecisions,
//             matchcareer: data.matchcareer,
//             helpful: data.helpful,
//             meetingneeds: data.meetingneeds,
//             satisfaction: data.satisfaction,
//             unsureno: data.unsureno,
//             activities: data.activities,
//             recommendations: data.recommendations,
//             acquainted: data.acquainted,
//             timetosee: data.timetosee,
//             helpfulness: data.helpful,
//             comfort: data.comfort,
//           }),
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries("ms_impactevaluationData");
//         console.log("Data invalidated");
//         queryClient.refetchQueries("ms_impactevaluationData");
//         console.log("Data refetched");
//         reset();
//         onClose();
//         console.log("Data submitted and table refreshed");
//       },
//       onError: (error) => {
//         console.error("Error submitting data", error);
//       },
//     }
//   );

//   const submission = (data) => mutation.mutate(data);

//   const [page, setPage] = useState(1);

//   const handleNext = () => {
//     setPage((prevPage) => Math.min(prevPage + 1, 4)); // Adjusted max page to 4
//   };

//   const handleBack = () => {
//     setPage((prevPage) => Math.max(prevPage - 1, 1));
//   };

//   return (
//     <Card
//       elevation={3}
//       sx={{ padding: 2, maxWidth: "900px", margin: "20px auto" }}
//     >
//       <form onSubmit={handleSubmit(submission)}>
//         <Typography variant="h5" gutterBottom align="center">
//           MS IMPACT EVALUATION
//         </Typography>
//         <Paper
//           elevation={3}
//           sx={{
//             width: "100%",
//             padding: 4,
//             backgroundColor: "#f7f9fc",
//             borderRadius: 2,
//           }}
//         >
//           {page === 1 && <PageOne control={control} />}
//           {page === 2 && <PageTwo control={control} />}
//           {page === 3 && <PageThree control={control} />}
//           {page === 4 && <PageFour control={control} />}

//           <Stack
//             direction="row"
//             spacing={2}
//             justifyContent="center"
//             sx={{ marginTop: 4 }}
//           >
//             <IconButton onClick={handleBack} disabled={page === 1}>
//               <ArrowBack />
//             </IconButton>
//             <IconButton onClick={handleNext} disabled={page === 4}>
//               <ArrowForward />
//             </IconButton>
//           </Stack>
//         </Paper>
//       </form>
//     </Card>
//   );
// };

// export default MS_ImpactEvaluation;

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  TextField,
  Button,
  Divider,
  Card,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SingleSelect from "./Forms/SingleSelect";
import { useForm, Controller } from "react-hook-form";
import AxiosInstance from "./Axios";
import { useMutation, useQueryClient } from "react-query";

const PageOne = ({ control }) => (
  <Box>
    <Stack spacing={6}>
      {/* First row - Name */}
      <Stack spacing={6}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Name"
              variant="outlined"
              sx={{ width: "100%" }}
            />
          )}
        />
      </Stack>

      {/* Second row - Section and Grade Level */}
      <Stack direction="row" spacing={3}>
        <Stack spacing={6} sx={{ flex: 1 }}>
          <Controller
            name="section"
            control={control}
            render={({ field }) => (
              <SingleSelect
                label="Section"
                {...field}
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
                sx={{ width: "100%" }}
              />
            )}
          />
        </Stack>
        <Stack spacing={6} sx={{ flex: 1 }}>
          <Controller
            name="gradelevel"
            control={control}
            render={({ field }) => (
              <SingleSelect
                label="Grade Level"
                {...field}
                options={["Grade 6", "Grade 7", "Grade 8"]}
                sx={{ width: "100%" }}
              />
            )}
          />
        </Stack>
      </Stack>
    </Stack>
  </Box>
);

const PageTwo = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
      >
        IMPACT OF COMPREHENSIVE GUIDANCE AND COUNSELING PROGRAM
      </Typography>

      <Divider sx={{ marginY: 2 }} />

      {/* Question 1 */}
      <Typography variant="h7" gutterBottom align="left">
        1. My grades improved.
      </Typography>
      <Controller
        name="improved"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How much did your grades improve?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 2 */}
      <Typography variant="h7" gutterBottom align="left">
        2. I can easily identify my interest, strength and weaknesses.
      </Typography>
      <Controller
        name="interests"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How easily can you identify your strengths and weaknesses?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 3 */}
      <Typography variant="h7" gutterBottom align="left">
        3. I became aware of the world of work.
      </Typography>
      <Controller
        name="work"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How aware are you of the world of work?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 4 */}
      <Typography variant="h7" gutterBottom align="left">
        4. I finish my school work on time.
      </Typography>
      <Controller
        name="ontime"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How well do you finish your school work on time?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 5 */}
      <Typography variant="h7" gutterBottom align="left">
        5. I now have a clear career plan.
      </Typography>
      <Controller
        name="careerplan"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How clear is your career plan?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 6 */}
      <Typography variant="h7" gutterBottom align="left">
        6. I become more respectful of other people.
      </Typography>
      <Controller
        name="respectful"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How respectful are you towards others?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 7 */}
      <Typography variant="h7" gutterBottom align="left">
        7. I become more responsible student.
      </Typography>
      <Controller
        name="responsible"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How responsible are you as a student?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 8 */}
      <Typography variant="h7" gutterBottom align="left">
        8. I developed study habits.
      </Typography>
      <Controller
        name="studyhabits"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How developed are your study habits?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 9 */}
      <Typography variant="h7" gutterBottom align="left">
        9. I now cooperate with others well.
      </Typography>
      <Controller
        name="cooperate"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How well do you cooperate with others?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 10 */}
      <Typography variant="h7" gutterBottom align="left">
        10. I have decided on the field of work that I want to go to.
      </Typography>
      <Controller
        name="decided"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How decided are you on your career field?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 11 */}
      <Typography variant="h7" gutterBottom align="left">
        11. I have realistic career goals.
      </Typography>
      <Controller
        name="careergoals"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How realistic are your career goals?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 12 */}
      <Typography variant="h7" gutterBottom align="left">
        12. I prioritize my studies over other activities.
      </Typography>
      <Controller
        name="prioritize"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How you prioritize your studies over other activities?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 13 */}
      <Typography variant="h7" gutterBottom align="left">
        13. I can now maintain a good positive relation with others.
      </Typography>
      <Controller
        name="positive"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How you maintain a good positive relation with others?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 14 */}
      <Typography variant="h7" gutterBottom align="left">
        14. I am now adjusted and able to cope with school life.
      </Typography>
      <Controller
        name="cope"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How you adjusted and able to cope with school life?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 15 */}
      <Typography variant="h7" gutterBottom align="left">
        15. I became more attentive to my teachers.
      </Typography>
      <Controller
        name="attentive"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How you became more attentive to your teacher ?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 16 */}
      <Typography variant="h7" gutterBottom align="left">
        16. I understand the need for self-control and how to practice it.
      </Typography>
      <Controller
        name="selfcontrol"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How you understand the need of self-control?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question 17 */}
      <Typography variant="h7" gutterBottom align="left">
        17. I become aware of my skills and abilities that match with my career choice.
      </Typography>
      <Controller
        name="aware"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How you become aware in your skills and abilities?"
            {...field}
            options={["Great", "Considerable", "Slight", "Not at All"]}
            sx={{ width: "50%" }}
          />
        )}
      />
    </Stack>
  </Box>
);

const PageThree = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
      >
        CLOSING THOUGHTS
      </Typography>
      <Divider sx={{ marginY: 2 }} />

      {/* Question A */}
      <Typography variant="h7" gutterBottom align="left">
        A. What was the one service or topic of discussion in SCLCM that was
        most beneficial or helpful to you?
      </Typography>
      <Controller
        name="helpful"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label=""
            placeholder="Describe the most helpful service or topic"
            multiline
            rows={2}
            sx={{ flex: 1 }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question B */}
      <Typography variant="h7" gutterBottom align="left">
        B. Overall, is the SCLCM Program meeting your needs?
      </Typography>
      <Controller
        name="meetingneeds"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="Is the program meeting your needs?"
            {...field}
            options={["Yes", "Unsure", "No"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question B1 */}
      <Typography variant="h7" gutterBottom align="left">
        B.1. If YES, how satisfied are you?
      </Typography>
      <Controller
        name="satisfaction"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How satisfied are you?"
            {...field}
            options={["Very Satisfied", "Satisfied", "Somewhat Satisfied"]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question B2 */}
      <Typography variant="h7" gutterBottom align="left">
        B.2. If UNSURE or NO, state your reason
      </Typography>
      <Controller
        name="unsureno"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label=""
            placeholder="State the reason"
            multiline
            rows={2}
            sx={{ flex: 1 }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question C */}
      <Typography variant="h7" gutterBottom align="left">
        C. What other activities would you suggest to help improve yourself
        better? (For: Personal/Social, Educational/Academic)
      </Typography>
      <Controller
        name="activities"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label=""
            placeholder="Describe the activities"
            multiline
            rows={2}
            sx={{ flex: 1 }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Question D */}
      <Typography variant="h7" gutterBottom align="left">
        D. What can you recommend to SCLCM to improve its service offered to the
        students?
      </Typography>
      <Controller
        name="recommendations"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label=""
            placeholder="Provide recommendations"
            multiline
            rows={2}
            sx={{ flex: 1 }}
          />
        )}
      />
    </Stack>
  </Box>
);

const PageFour = ({ control }) => (
  <Box>
    <Stack spacing={3}>
      <Typography
        variant="h7"
        sx={{ color: "#3f3f3f", marginBottom: 2, fontWeight: "bold" }}
      >
        A. Experience with the School Counselor
      </Typography>
      <Divider sx={{ marginY: 2 }} />

      {/* SingleSelect for Question 1 */}
      <Typography variant="h7" gutterBottom align="left">
        1. Which of the following describe how well you are acquainted with your
        counselor?
      </Typography>
      <Controller
        name="acquainted"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How well are you acquainted with your counselor?"
            {...field}
            options={[
              "I don't know his name",
              "I know his name, but we've never met and talked",
              "I've talked with him about minor matters",
              "I've talked to him about some major concerns",
            ]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* SingleSelect for Question 2 */}
      <Typography variant="h7" gutterBottom align="left">
        2. How easy was it to arrange a time to see your counselor?
      </Typography>
      <Controller
        name="timetosee"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How easy was it to arrange a time?"
            {...field}
            options={[
              "Very Easy",
              "Pretty Easy",
              "A slight struggle",
              "Difficult",
            ]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* SingleSelect for Question 3 */}
      <Typography variant="h7" gutterBottom align="left">
        3. How helpful was the counselor in your conversation with him?
      </Typography>
      <Controller
        name="helpfulness"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How helpful was the counselor?"
            {...field}
            options={[
              "Very helpful",
              "Helpful",
              "Somewhat helpful",
              "Not helpful",
            ]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* SingleSelect for Question 4 */}
      <Typography variant="h7" gutterBottom align="left">
        4. How comfortable are you talking with your counselor?
      </Typography>
      <Controller
        name="comfort"
        control={control}
        render={({ field }) => (
          <SingleSelect
            label="How comfortable are you?"
            {...field}
            options={[
              "Very Comfortable",
              "Comfortable",
              "Somewhat comfortable",
              "Very uncomfortable",
            ]}
            sx={{ width: "50%" }}
          />
        )}
      />
      <Divider sx={{ marginY: 2 }} />

      {/* Submit button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 2,
        }}
      >
        <Button variant="contained" type="submit" color="primary">
          Submit
        </Button>
      </Box>
    </Stack>
  </Box>
);

const MS_ImpactEvaluation = ({ initialData, onClose }) => {
  const queryClient = useQueryClient();

  const defaultValues = {
    name: localStorage.getItem("lastname") + ", " + localStorage.getItem("firstname") + ", " + localStorage.getItem("middlename"),
    section: localStorage.getItem("section"),
    gradelevel: localStorage.getItem("year"),
    improved: "",
    interests: "",
    work: "",
    ontime: "",
    careerplan: "",
    respectful: "",
    responsible: "",
    studyhabits: "",
    cooperate: "",
    decided: "",
    careergoals: "",
    prioritize: "",
    positive: "",
    cope: "",
    attentive: "",
    selfcontrol: "",
    aware: "",
    helpful: "",
    meetingneeds: "",
    satisfaction: "",
    unsureno: "",
    activities: "",
    recommendations: "",
    acquainted: "",
    timetosee: "",
    helpfulness: "",
    comfort: "",
  };

  const { handleSubmit, reset, control } = useForm({
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const mutation = useMutation(
    (data) =>
      initialData
        ? AxiosInstance.put(`/ms_impactevaluation/${initialData.id}/`, {
            name: localStorage.getItem("lastname") + ", " + localStorage.getItem("firstname") + ", " + localStorage.getItem("middlename"),
            section: localStorage.getItem("section"),
            gradelevel: localStorage.getItem("year"),
            improved: data.improved,
            interests: data.interests,
            work: data.work,
            ontime: data.ontime,
            careerplan: data.careerplan,
            respectful: data.respectful,
            responsible: data.responsible,
            studyhabits: data.studyhabits,
            cooperate: data.cooperate,
            decided: data.decided,
            careergoals: data.careergoals,
            priorotize: data.prioritize,
            positive: data.positive,
            cope: data.cope,
            attentive: data.attentive,
            selfcontrol: data.selfcontrol,
            aware: data.aware,
            helpful: data.helpful,
            meetingneeds: data.meetingneeds,
            satisfaction: data.satisfaction,
            unsureno: data.unsureno,
            activities: data.activities,
            recommendations: data.recommendations,
            acquainted: data.acquainted,
            timetosee: data.timetosee,
            helpfulness: data.helpful,
            comfort: data.comfort,
          })
        : AxiosInstance.post(`/ms_impactevaluation/`, {
            name: localStorage.getItem("username"),
            section: localStorage.getItem("section"), 
            gradelevel: localStorage.getItem("year"),
            improved: data.improved,
            interests: data.interests,
            work: data.work,
            ontime: data.ontime,
            careerplan: data.careerplan,
            respectful: data.respectful,
            responsible: data.responsible,
            studyhabits: data.studyhabits,
            cooperate: data.cooperate,
            decided: data.decided,
            careergoals: data.careergoals,
            priorotize: data.prioritize,
            positive: data.positive,
            cope: data.cope,
            attentive: data.attentive,
            selfcontrol: data.selfcontrol,
            aware: data.aware,
            helpful: data.helpful,
            meetingneeds: data.meetingneeds,
            satisfaction: data.satisfaction,
            unsureno: data.unsureno,
            activities: data.activities,
            recommendations: data.recommendations,
            acquainted: data.acquainted,
            timetosee: data.timetosee,
            helpfulness: data.helpful,
            comfort: data.comfort,
          }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("ms_impactevaluationData");
        console.log("Data invalidated");
        queryClient.refetchQueries("ms_impactevaluationData");
        console.log("Data refetched");
        reset();
        onClose();
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
    setPage((prevPage) => Math.min(prevPage + 1, 4)); // Adjusted max page to 4
  };

  const handleBack = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Card
      elevation={3}
      sx={{ padding: 2, maxWidth: "900px", margin: "20px auto" }}
    >
      <form onSubmit={handleSubmit(submission)}>
        <Typography variant="h5" gutterBottom align="center">
          MS IMPACT EVALUATION
        </Typography>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            padding: 4,
            backgroundColor: "#f7f9fc",
            borderRadius: 2,
          }}
        >
          {page === 1 && <PageOne control={control} />}
          {page === 2 && <PageTwo control={control} />}
          {page === 3 && <PageThree control={control} />}
          {page === 4 && <PageFour control={control} />}

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 4 }}
          >
            <IconButton onClick={handleBack} disabled={page === 1}>
              <ArrowBack />
            </IconButton>
            <IconButton onClick={handleNext} disabled={page === 4}>
              <ArrowForward />
            </IconButton>
          </Stack>
        </Paper>
      </form>
    </Card>
  );
};

export default MS_ImpactEvaluation;
