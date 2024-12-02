import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import TextFields from "./Forms/TextFields";
import DatePicker from "./Forms/DatePicker";
import { useForm } from "react-hook-form";
import { DataGrid } from "@mui/x-data-grid";

const BehaviorMonitoring = () => {
  const { control } = useForm();

  // Sample data for the DataGrid
  const rows = [
    // Add sample data here if needed
  ];

  // Columns for the DataGrid
  const columns = [
    {
      field: "subject",
      headerName: "SUBJECT",
      width: 200,
      headerAlign: "center",
    },
    {
      field: "teachers Note",
      headerName: "TEACHERS NOTE",
      width: 300,
      headerAlign: "center",
    },
    {
      field: "teacherSignature",
      headerName: "TEACHER SIGNATURE",
      width: 200,
      headerAlign: "center",
    },
  ];

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
          color: "#3f3f3f",
          marginBottom: 2,
          marginTop: 2, // Added margin-top here
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Behavior Monitoring Sheet
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
          variant="body2"
          sx={{
            color: "#6c757d",
            marginTop: 2, // Adjusted margin-top here
            marginBottom: 2,
            fontSize: "14px",
            textAlign: "left",
          }}
        >
          Please give a short description of the student’s behavior during your
          class.
        </Typography>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#e0e0e0",
              },
              "& .MuiDataGrid-columnHeaderTitle": {
                textAlign: "center", // Center text in header cells
                fontSize: "16px",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "16px",
              },
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

export default BehaviorMonitoring;
