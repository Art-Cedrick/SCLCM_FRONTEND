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
import Grade1 from "../Grade1";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/grade_one/`);
  console.log(response.data);
  return response.data;
};

const Grade1Table = () => {
  const queryClient = useQueryClient();

  const {
    data: myData = [],
    isLoading,
    error,
    isFetching,
  } = useQuery("grade_oneData", fetchData);

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
      await AxiosInstance.delete(`/grade_one/${row.original.id}/`);
      queryClient.invalidateQueries("grade_oneData");
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data for Grade One...");
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student Name", size: 150 },
      { accessorKey: "age", header: " Age", size: 150 },
      { accessorKey: "sex", header: "Sex", size: 200 },
      { accessorKey: "gradeLevel", header: "Grade Level", size: 150 },
      { accessorKey: "test", header: "Test", size: 150 },
      { accessorKey: "rawscore", header: "Raw Score", size: 150 },
      {
        accessorKey: "percentile",
        header: "Percentile",
        size: 200,
      },
      {
        accessorKey: "stanine",
        header: "Stanine",
        size: 200,
      },
      { accessorKey: "rating", header: "Rating", size: 150 },
      { accessorKey: "vocab", header: " Vocab", size: 150 },
      { accessorKey: "letter", header: "Letters", size: 200 },
      { accessorKey: "visual", header: "Visual", size: 150 },
      { accessorKey: "auditory", header: "Auditory", size: 150 },
      { accessorKey: "comp", header: "Comp", size: 150 },
      {
        accessorKey: "number",
        header: "Number",
        size: 200,
      },
      { accessorKey: "writing", header: "Writing", size: 150 },
      { accessorKey: "spelling", header: " Spelling", size: 150 },
      { accessorKey: "q_vocab", header: "(Q)Vocab", size: 200 },
      { accessorKey: "q_letter", header: "(Q)Letters", size: 150 },
      { accessorKey: "q_visual", header: "(Q)Visual", size: 150 },
      { accessorKey: "q_comp", header: "(Q)Comp", size: 150 },
      {
        accessorKey: "q_number",
        header: "(Q)Number",
        size: 200,
      },
      { accessorKey: "q_writing", header: "(Q)Writing", size: 150 },
      { accessorKey: "q_spelling", header: "(Q)Spelling", size: 150 },
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
          <DialogTitle>Edit Grade One Form</DialogTitle>
          <DialogContent>
            <Grade1 initialData={editData} onClose={handleClose} />
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

export default Grade1Table;
