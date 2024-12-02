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
import SecondYear from "../SecondYear";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/second_year/`);
  console.log(response.data);
  return response.data;
};

const SecondYearTable = () => {
  const queryClient = useQueryClient();

  const {
    data: myData = [],
    isLoading,
    error,
    isFetching,
  } = useQuery("second_yearData", fetchData);

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
      await AxiosInstance.delete(`/second_year/${row.original.id}/`);
      queryClient.invalidateQueries("second_yearData");
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data for Second Year...");
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student Name", size: 150 },
      { accessorKey: "age", header: "Age", size: 150 },
      { accessorKey: "sex", header: "Sex", size: 200 },
      { accessorKey: "yearLevel", header: "Grade Level", size: 150 },
      { accessorKey: "course", header: "Course", size: 150 },
      { accessorKey: "inc", header: "INC", size: 150 },
      {
        accessorKey: "intrapersonal",
        header: "Intrapersonal Scale",
        size: 200,
      },
      {
        accessorKey: "stress_management",
        header: "Stress Managemnet Scale",
        size: 200,
      },
      { accessorKey: "adpatibility", header: "Adaptability", size: 200 },
      { accessorKey: "general_mood", header: "General Mood Scale", size: 200 },
      { accessorKey: "total_eq", header: "Total EQ", size: 200 },
      {
        accessorKey: "positive_impression",
        header: "Positive Impression",
        size: 200,
      },
      { accessorKey: "a_vi", header: "A (VI)", size: 200 },
      { accessorKey: "b_vi", header: "B (VI)", size: 200 },
      { accessorKey: "c_vi", header: "C (VI)", size: 200 },
      { accessorKey: "d_vi", header: "D (VI)", size: 200 },
      { accessorKey: "e_vi", header: "E (VI)", size: 200 },
      { accessorKey: "f_vi", header: "F (VI)", size: 200 },
      { accessorKey: "g_vi", header: "G (VI)", size: 200 },
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
          <DialogTitle>Edit Second Year Form</DialogTitle>
          <DialogContent>
            <SecondYear initialData={editData} onClose={handleClose} />
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
export default SecondYearTable;
