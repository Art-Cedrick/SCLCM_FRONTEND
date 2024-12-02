import React from "react";
import { Box, Typography, Paper, TextField } from "@mui/material";
import TextFields from "./Forms/TextFields";
import DatePicker from "./Forms/DatePicker";
import CheckboxLabels from "./Forms/CheckboxLabels";
import MultilineTextFields from "./Forms/MultilineTextField";
import { useForm } from "react-hook-form";

const CounselingReportForm = () => {
  const { control } = useForm(); // Only destructure control since we are not using form submission

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        maxWidth: "800px", // Restrict the maximum width
        padding: 4,
        backgroundColor: "#fafafa", // Light gray background
        borderRadius: 2, // Rounded corners
        margin: "auto", // Center the form horizontally
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#3f3f3f",
          marginBottom: 2,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Counseling Report
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
        }}
      >
        <TextFields
          label="Name of Student"
          name="name"
          control={control}
          placeholder="Enter name"
          sx={{
            flex: 1,
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        />
        <DatePicker
          label="Date"
          name="date"
          control={control}
          sx={{
            flex: "0 0 auto",
            width: "150px",
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        />
      </Box>

      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <TextFields
          label="Grade & Section"
          name="section"
          control={control}
          placeholder="Enter grade and section"
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: "#3f3f3f",
            marginTop: 2,
            fontWeight: "medium",
            textAlign: "left",
          }}
        >
          Reason for Referral:
        </Typography>

        {/* Adding checkboxes and text field here */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center", // Align items vertically centered
            gap: 2,
            mt: 1,
          }}
        >
          <CheckboxLabels control={control} name="academic" label="Academic" />
          <CheckboxLabels
            control={control}
            name="behavioral"
            label="Behavioral"
          />
          <Box sx={{ display: "flex" }}>
            <CheckboxLabels control={control} name="others" label="Others:" />
            <TextField
              label=""
              name="otherDetails"
              variant="standard"
              sx={{
                width: "200px",
                "& .MuiInputBase-input": {
                  fontSize: "16px",
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Add the Counselor's Note field here with expanded width */}
      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <MultilineTextFields
          label="Counselor's Note"
          name="counselorsNote"
          control={control}
          sx={{
            width: "100%", // Ensures the field takes up the full width of the container
          }}
        />
      </Box>

      {/* Add the Recommendations field here */}
      <Box
        sx={{
          width: "100%",
          mb: 2,
        }}
      >
        <MultilineTextFields
          label="Recommendations"
          name="recommendations"
          control={control}
          sx={{
            width: "100%", // Ensures the field takes up the full width of the container
          }}
        />
      </Box>

      {/* Add Guidance Counselor label and text field */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center", // Align items vertically centered
          mb: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#3f3f3f",
            fontWeight: "medium",
            width: "200px", // Fixed width for the label
          }}
        >
          Guidance Counselor:
        </Typography>
        <TextField
          name="guidanceCounselor"
          variant="standard"
          sx={{
            "& .MuiInputBase-input": {
              fontSize: "16px",
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default CounselingReportForm;
