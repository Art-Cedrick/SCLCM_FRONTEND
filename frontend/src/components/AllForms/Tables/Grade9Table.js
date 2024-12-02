import React, { useMemo,useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import Grade9 from '../Grade9';

const fetchData = async () => {
  const response = await AxiosInstance.get(`/grade_nine/`);
  console.log(response.data)
  return response.data;
};

const Grade9Table = () => {

  const queryClient = useQueryClient();

  const { data: myData = [], isLoading, error, isFetching } = useQuery('grade_nineData', fetchData);

  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({open: false, row: null})

  const handleEdit = (row) => {
    setEdit(row.original);
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(null);
    setOpen(false);
  }

  const handleDelete = async (row) => {
    try {
      await AxiosInstance.delete(`/grade_nine/${row.original.id}/`);
      queryClient.invalidateQueries('grade_nineData');
      setConfirmDelete({open: false, row: null});
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  }

  useEffect(() => {
    console.log('Fetching data for Grade Nine...');
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student Name", size: 150 },
      { accessorKey: "age", header: "Age", size: 150 },
      { accessorKey: "sex", header: "Sex", size: 200 },
      { accessorKey: "gradeLevel", header: "Grade Level", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
      { accessorKey: "top_one", header: "Top 1", size: 150 },
      { accessorKey: "top_two", header: "Top 2", size: 200 },
      { accessorKey: "top_three", header: "Top 3", size: 200 },
      { accessorKey: "self_control", header: "Self Control", size: 200 },
      { accessorKey: "mas_fem", header: "Masculinity-FEminity", size: 200 },
      { accessorKey: "status", header: "Status", size: 200 },
      { accessorKey: "infrequency", header: "Infrequency", size: 200 },
      { accessorKey: "acquiescence", header: "Acquiescence", size: 200 },
      { accessorKey: "r", header: "R", size: 200 },
      { accessorKey: "i", header: "I", size: 200 },
      { accessorKey: "a", header: "A", size: 200 },
      { accessorKey: "s", header: "S", size: 200 },
      { accessorKey: "e", header: "E", size: 200 },
      { accessorKey: "c", header: "C", size: 200 },
      { accessorKey: "se", header: "Se", size: 200 },
      { accessorKey: "mf", header: "Mf", size: 200 },
      { accessorKey: "st", header: "St", size: 200 },
      { accessorKey: "inf", header: "Inf", size: 200 },
      { accessorKey: "ac", header: "Ac", size: 200 },
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
              onClick={() => setConfirmDelete({open: true, row})}
              table={table}
            />,
          ]}
            />
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
              <DialogTitle>Edit Grade Nine Form</DialogTitle>
              <DialogContent>
                <Grade9 initialData={editData} onClose={handleClose}/>
              </DialogContent>
            </Dialog>

            <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({open: false, row: null})}>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogContent>
                <p>Are you sure you want to delete this record?</p>
                <div style={{display: "flex", justifyContent: "flex-end", gap: "10px"}}>
                  <Button variant="outlined" onClick={() => setConfirmDelete({open: false, row: null})}>
                    Cancel
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(confirmDelete.row)}>
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
      </div>
    </div>
  );
};

export default Grade9Table;
