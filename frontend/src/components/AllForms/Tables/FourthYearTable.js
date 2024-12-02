import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import FourthYear from "../FourthYear";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/fourth_year/`);
  console.log(response.data);
  return response.data;
};

const FourthYearTable = () => {
  const queryClient = useQueryClient();

  const {
    data: myData = [],
    isLoading,
    error,
    isFetching,
  } = useQuery("fourth_yearData", fetchData);

  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    row: null,
  });

  const handleEdit = (row) => {
    setEdit(row.original);
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(null);
    setOpen(false);
  };

  const handleDelete = async (row) => {
    try {
      await AxiosInstance.delete(`/fourth_year/${row.original.id}/`);
      queryClient.invalidateQueries("fourth_yearData");
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data for Fourth Year...");
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student Name", size: 150 },
      { accessorKey: "age", header: "Age", size: 200 },
      { accessorKey: "sex", header: "Sex", size: 150 },
      { accessorKey: "gradeLevel", header: "Grade Level", size: 150 },
      { accessorKey: "course_program", header: "Course/Program", size: 150 },
      { accessorKey: "l_raw", header: "L-Raw", size: 200 },
      { accessorKey: "l_s", header: "L-S", size: 200 },
      { accessorKey: "l_vi", header: "L-VI", size: 200 },
      { accessorKey: "q_raw", header: "Q-Raw", size: 200 },
      { accessorKey: "q_percent", header: "Q-%", size: 200 },
      { accessorKey: "q_s", header: "Q-S", size: 200 },
      { accessorKey: "sq_vi", header: "SQ-VI", size: 200 },
      { accessorKey: "t_raw", header: "T-Raw", size: 200 },
      { accessorKey: "t_percent", header: "T-%", size: 200 },
      { accessorKey: "t_s", header: "T-S", size: 200 },
      { accessorKey: "t_vi", header: "T-VI", size: 200 },
      {
        accessorKey: "kiersey",
        header: "Kiersy Temperent Sorter",
        size: 200,
      },
      {
        accessorKey: "negotiating_persuading",
        header: "Negotiating Persuading",
        size: 200,
      },
      {
        accessorKey: "verbal_communication",
        header: "Verbal Communication",
        size: 200,
      },
      { accessorKey: "co_op", header: "Co-op", size: 200 },
      {
        accessorKey: "investigating_analyzing",
        header: "Investigating Analyzing",
        size: 200,
      },
      { accessorKey: "leadership", header: "Leadership", size: 200 },
      {
        accessorKey: "planning_organizing",
        header: "Planning Organizing",
        size: 200,
      },
      { accessorKey: "numeracy", header: "Numeracy", size: 200 },
    ],
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching data...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "60vh",
        overflow: "auto",
        marginTop: "1in",
        marginBottom: "16px",
      }}
    >
      <div style={{ maxWidth: "1000px", width: "100%", height: "100%" }}>
        <MaterialReactTable
          columns={columns}
          data={myData}
          enableRowActions
          renderRowActionMenuItems={({ row, table }) => [
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={
                <IconButton>
                  <Edit />
                </IconButton>
              }
              key="edit"
              label="Edit"
              onClick={() => handleEdit(row)}
              table={table}
            />,
            <MRT_ActionMenuItem
              icon={
                <IconButton>
                  <Delete />
                </IconButton>
              }
              key="delete"
              label="Delete"
              onClick={() => setConfirmDelete({ open: true, row })}
              table={table}
            />,
          ]}
        />
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Edit Fourth Year Form</DialogTitle>
          <DialogContent>
            <FourthYear initialData={editData} onClose={handleClose} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={confirmDelete.open}
          onClose={() => setConfirmDelete({ open: false, row: null })}
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this record?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setConfirmDelete({ open: false, row: null })}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(confirmDelete.row)}
              >
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FourthYearTable;
