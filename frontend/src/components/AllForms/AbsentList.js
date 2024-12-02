import React from "react";
import {
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Stack,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import TextFields from "./Forms/TextFields"; // Ensure this path is correct

const AbsentList = () => {
  const { control, handleSubmit } = useForm();

  // Submit handler
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission logic here
  };

  return (
    <Card elevation={3} sx={{ maxWidth: "900px", margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          ABSENTEES
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
            {/* Single Column: Name, Grade, Section */}
            <TextFields
              label="Name:"
              name="name"
              control={control}
              placeholder=""
              sx={{ flex: 1 }} // Custom styles to remove any unwanted border
            />
            <TextFields
              label="Grade:"
              name="grade"
              control={control}
              placeholder=""
              sx={{ flex: 1 }} // Custom styles
            />
            <TextFields
              label="Section:"
              name="section"
              control={control}
              placeholder=""
              sx={{ flex: 1 }} // Custom styles
            />

            {/* Submit Button */}
            <Box
              sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
                sx={{ marginTop: "10px" }}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default AbsentList;
