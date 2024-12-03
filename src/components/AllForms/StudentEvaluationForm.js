import React from "react";
import { Box, Typography, Paper, RadioGroup, FormControlLabel, Radio, FormControl } from "@mui/material";
import MultilineTextFields from "./Forms/MultilineTextField"; // Assuming this is a multiline text field component
import TextFields from "./Forms/TextFields"; // Import your TextFields component
import { useForm, Controller } from "react-hook-form";

const StudentEvaluationForm = () => {
  const { control } = useForm(); // Initialize useForm but without handleSubmit

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "800px",
        padding: 4,
        backgroundColor: "#fafafa",
        borderRadius: 2,
        margin: "auto",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#000000",
          marginBottom: 2,
          marginTop: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        STUDENT'S EVALUATION FORM
      </Typography>

      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "#000000",
            marginTop: 2,
            marginBottom: 2,
            fontSize: "16px",
            textAlign: "left",
          }}
        >
          Directions: Please evaluate the homeroom module using the rating scale
          below:
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 2 }}>
  
          <Controller
            name="rating"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <RadioGroup
                {...field}
                row
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                 
                }}
              >
                <FormControlLabel value="1" control={<Radio />} label="1. To limited extent" />
                <FormControlLabel value="2" control={<Radio />} label="2. To a considerable extent" />
                <FormControlLabel value="3" control={<Radio />} label="3. To moderate extent" />
                <FormControlLabel value="4" control={<Radio />} label="4. To a great extent" />
                <FormControlLabel value="5" control={<Radio />} label="5. To a very great extent" />
              </RadioGroup>
            )}
          />
        </FormControl>

        <TextFields
          label="Topic:"
          name="topic"
          control={control}
          sx={{ mb: 2 }}
        />
       
        <MultilineTextFields
          label="Comments and Suggestions:"
          name="comments and suggestions"
          control={control}
          sx={{ mb: 2 }}
        />
      </Box>
    </Paper>
  );
};

export default StudentEvaluationForm;
