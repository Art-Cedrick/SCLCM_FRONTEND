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

// const MSCounselingServiceEvaluation = () => {
//   const defaultValues = {
//     name: "",
//     gradelevel: "",
//     section: "",
//     question_one: "",
//     question_two: "",
//     question_three: "",
//     question_four: "",
//     question_five: "",
//     question_six: "",
//     question_seven: "",
//     question_eight: "",
//     question_nine: "",
//     question_ten: "",
//   };

//   const { control, handleSubmit, reset } = useForm({
//     defaultValues: defaultValues,
//   });

//   const submission = (data) => {
//     AxiosInstance.post(`/mscounselingservice/`, {
//       name: data.name,
//       gradelevel: data.gradelevel,
//       section: data.section,
//       question_one: data.question_one,
//       question_two: data.question_two,
//       question_three: data.question_three,
//       question_four: data.question_four,
//       question_five: data.question_five,
//       question_six: data.question_six,
//       question_seven: data.question_seven,
//       question_eight: data.question_eight,
//       question_nine: data.question_nine,
//       question_ten: data.question_ten,
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
//               {/* First Row: Name, Grade, Section */}
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
//                   name="gradelevel"
//                   control={control}
//                   render={({ field }) => (
//                     <SingleSelect
//                       label="Grade Level"
//                       options={["Grade 6", "Grade 7", "Grade 8"]}
//                       sx={{ flex: 1 }}
//                       {...field}
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
//                       sx={{ flex: 1 }}
//                       {...field}
//                     />
//                   )}
//                 />
//               </Stack>

//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 1 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 1. The time for counselling session is sufficient.
//               </Typography>
//               <Controller
//                 name="question_one"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 2 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 2. The counseling room is appropriate for the counselling
//                 session.
//               </Typography>
//               <Controller
//                 name="question_two"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 3 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 3. The counselling session helped me widen my perspective in
//                 handling my problems/concerns.
//               </Typography>
//               <Controller
//                 name="question_three"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 4 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 4. The counselling session helped me understand myself better
//                 and my situation.
//               </Typography>
//               <Controller
//                 name="question_four"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 5 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 5. The counselling session enables me to become a better
//                 individual.
//               </Typography>
//               <Controller
//                 name="question_five"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 6 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 6. The counsellor manifests warm acceptance toward me.
//               </Typography>
//               <Controller
//                 name="question_six"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 7 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 7. The counsellor allows me to express my feelings, thoughts,
//                 ideas freely.
//               </Typography>
//               <Controller
//                 name="question_seven"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 8 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 8. The counsellor is a good listener.
//               </Typography>
//               <Controller
//                 name="question_eight"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 9 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 9. The counsellor manifests competence in handling my
//                 concerns/problems.
//               </Typography>
//               <Controller
//                 name="question_nine"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />
//               <Divider sx={{ marginY: 2 }} />

//               {/* Question 10 */}
//               <Typography variant="h7" gutterBottom align="left">
//                 10. The counsellor is trustworthy and ensures confidentiality.
//               </Typography>
//               <Controller
//                 name="question_10"
//                 control={control}
//                 render={({ field }) => (
//                   <RadioGroup
//                     {...field}
//                     sx={{ display: "flex", flexDirection: "column" }}
//                   >
//                     <FormControlLabel
//                       value="four"
//                       control={<Radio />}
//                       label="4 = Strongly Agree"
//                     />
//                     <FormControlLabel
//                       value="three"
//                       control={<Radio />}
//                       label="3 = Agree"
//                     />
//                     <FormControlLabel
//                       value="two"
//                       control={<Radio />}
//                       label="2 = Disagree"
//                     />
//                     <FormControlLabel
//                       value="one"
//                       control={<Radio />}
//                       label="1 = Strongly Disagree"
//                     />
//                   </RadioGroup>
//                 )}
//               />

//               {/* Submit Button */}
//               <Stack
//                 direction="row"
//                 justifyContent="flex-end"
//                 sx={{ marginTop: 2 }}
//               >
//                 <Button variant="contained" type="submit">
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

// export default MSCounselingServiceEvaluation;

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

const MSCounselingServiceEvaluation = () => {
  const defaultValues = {
    name: localStorage.getItem("lastname") + ", " + localStorage.getItem("firstname") + ", " + localStorage.getItem("middlename"),
    gradelevel: localStorage.getItem("section"),
    section: localStorage.getItem("section"),
    question_one: "",
    question_two: "",
    question_three: "",
    question_four: "",
    question_five: "",
    question_six: "",
    question_seven: "",
    question_eight: "",
    question_nine: "",
    question_ten: "",
  };

  const { control, handleSubmit, reset } = useForm({
    defaultValues: defaultValues,
  });

  const submission = (data) => {
    AxiosInstance.post(`/mscounselingservice/`, {
      name: data.name,
      gradelevel: data.gradelevel,
      section: data.section,
      question_one: data.question_one,
      question_two: data.question_two,
      question_three: data.question_three,
      question_four: data.question_four,
      question_five: data.question_five,
      question_six: data.question_six,
      question_seven: data.question_seven,
      question_eight: data.question_eight,
      question_nine: data.question_nine,
      question_ten: data.question_ten,
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
                  name="gradelevel"
                  control={control}
                  render={({ field }) => (
                    <SingleSelect
                      label="Grade Level"
                      options={["Grade 6", "Grade 7", "Grade 8"]}
                      sx={{ flex: 1, maxWidth: "250px" }} // Adjust width here
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
                      sx={{ flex: 1, maxWidth: "250px" }} // Adjust width here
                      {...field}
                    />
                  )}
                />
              </Stack>

              <Divider sx={{ marginY: 2 }} />

              {/* Question 1 */}
              <Typography variant="h7" gutterBottom align="left">
                1. The time for counselling session is sufficient.
              </Typography>
              <Controller
                name="question_one"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question1"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 2 */}
              <Typography variant="h7" gutterBottom align="left">
                2. The counseling room is appropriate for the counselling
                session.
              </Typography>
              <Controller
                name="question_two"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question2"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 3 */}
              <Typography variant="h7" gutterBottom align="left">
                3. The counselling session helped me widen my perspective in
                handling my problems/concerns.
              </Typography>
              <Controller
                name="question_three"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question3"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 4 */}
              <Typography variant="h7" gutterBottom align="left">
                4. The counselling session helped me understand myself better
                and my situation.
              </Typography>
              <Controller
                name="question_four"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question4"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 5 */}
              <Typography variant="h7" gutterBottom align="left">
                5. The counselling session enables me to become a better
                individual.
              </Typography>
              <Controller
                name="question_five"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question5"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 6 */}
              <Typography variant="h7" gutterBottom align="left">
                6. The counsellor manifests warm acceptance toward me.
              </Typography>
              <Controller
                name="question_six"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question6"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 7 */}
              <Typography variant="h7" gutterBottom align="left">
                7. The counsellor allows me to express my feelings, thoughts,
                and ideas freely.
              </Typography>
              <Controller
                name="question_seven"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question7"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 8 */}
              <Typography variant="h7" gutterBottom align="left">
                8. The counsellor is a good listener.
              </Typography>
              <Controller
                name="question_eight"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question8"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 9 */}
              <Typography variant="h7" gutterBottom align="left">
                9. The counsellor manifests competence in handling my
                concerns/problems.
              </Typography>
              <Controller
                name="question_nine"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question9"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Question 10 */}
              <Typography variant="h7" gutterBottom align="left">
                10. I am satisfied with the counselling service.
              </Typography>
              <Controller
                name="question_ten"
                control={control}
                render={({ field }) => (
                  <SingleSelect
                    {...field}
                    label="Question10"
                    options={[
                      "4 = Strongly Agree",
                      "3 = Agree",
                      "2 = Disagree",
                      "1 = Strongly Disagree",
                    ]}
                    sx={{ width: "50%" }} // Adjust width here
                  />
                )}
              />
              <Divider sx={{ marginY: 2 }} />

              {/* Submit Button */}
              <Stack
                direction="row"
                justifyContent="flex-end"
                sx={{ marginTop: 2 }}
              >
                <Button variant="contained" type="submit">
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

export default MSCounselingServiceEvaluation;
