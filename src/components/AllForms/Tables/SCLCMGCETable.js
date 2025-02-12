import React, { useMemo,useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import SCLCMGUIDANCECLASSEVALUATION from '../SCLCMGUIDANCECLASSEVALUATION';

const fetchData = async () => {
  const response = await AxiosInstance.get(`/guidance_class_evaluation/`);
  console.log(response.data)
  return response.data;
};

const MSCounselingServiceTable = () => {

    const queryClient = useQueryClient();

    const { data: myData = [], isLoading, error, isFetching } = useQuery('guidance_class_evaluationData', fetchData);
  
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
        await AxiosInstance.delete(`/guidance_class_evaluation/${row.original.id}/`);
        queryClient.invalidateQueries('guidance_class_evaluationData');
        setConfirmDelete({open: false, row: null});
        console.log("Deleted Successfully");
      } catch (error) {
        console.log("Error deleting", error);
      }
    }
  
    useEffect(() => {
      console.log('Fetching data for Guidance Class Evaluation...');
    }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: " Name", size: 150 },
      { accessorKey: "grade", header: " Grade", size: 150 },
      { accessorKey: "section", header: "Section", size: 200 },
      { accessorKey: "question_1", header: "Q1", size: 150 },
      { accessorKey: "question_2", header: "Q2", size: 150 },
      { accessorKey: "question_3", header: "Q3", size: 150 },
      {
        accessorKey: "question_4",
        header: "Q4",
        size: 200,
      },
      {
        accessorKey: "question_5",
        header: "Q5",
        size: 200,
      },
      { accessorKey: "question_6", header: "Q6", size: 150 },
      { accessorKey: "question_7", header: " Q7", size: 150 },
      { accessorKey: "question_8", header: "Q8", size: 200 },
      { accessorKey: "question_9", header: "Q9", size: 150 },
      
    ],
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching data...</p>;
  if (error) return <p>Error loading data</p>;


  return (
    <>
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
            <DialogTitle>Edit Guidance Class Evaluation Form</DialogTitle>
            <DialogContent>
              <SCLCMGUIDANCECLASSEVALUATION initialData={editData} onClose={handleClose}/>
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
    </>
  );
};

export default MSCounselingServiceTable;
