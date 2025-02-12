import React, { useMemo,useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import MSCounselingServiceEvaluation from '../MSCounselingServiceEvaluation';
import { View } from "lucide-react";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/mscounselingservice/`);
  console.log(response.data)
  return response.data;
};

const MSCounselingServiceTable = () => {

  const queryClient = useQueryClient();

  const { data: myData = [], isLoading, error, isFetching } = useQuery('ms_counselingserviceevaluationData', fetchData);

  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({open: false, row: null})

  const handleEdit = (row) => {
    setEdit(row.original);
    console.log(row.original);
    setOpen(true);
  };

  const handleClose = () => {
    setEdit(null);
    setOpen(false);
  }

  const handleDelete = async (row) => {
    try {
      await AxiosInstance.delete(`/ms_counselingserviceevaluation/${row.original.id}/`);
      queryClient.invalidateQueries('ms_counselingserviceevaluationData');
      setConfirmDelete({open: false, row: null});
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  }

  useEffect(() => {
    console.log('Fetching data for Counseling Service Evaluation...');
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: " Name", size: 150 },
      { accessorKey: "gradelevel", header: " Grade Level", size: 150 },
      { accessorKey: "section", header: "Section", size: 200 },
      { accessorKey: "question_one", header: "Q1", size: 150 },
      { accessorKey: "question_two", header: "Q2", size: 150 },
      { accessorKey: "question_three", header: "Q3", size: 150 },
      {
        accessorKey: "question_four",
        header: "Q4",
        size: 200,
      },
      {
        accessorKey: "question_five",
        header: "Q5",
        size: 200,
      },
      { accessorKey: "question_six", header: "Q6", size: 150 },
      { accessorKey: "question_seven", header: " Q7", size: 150 },
      { accessorKey: "question_eight", header: "Q8", size: 200 },
      { accessorKey: "question_nine", header: "Q9", size: 150 },
      { accessorKey: "question_ten", header: "Q10", size: 150 },
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
              <View />
              </IconButton>
            }
              key="edit"
              label="View"
              onClick={() => handleEdit(row)}
              table={table}
            />,
            // <MRT_ActionMenuItem
            //   icon={
            //     <IconButton>
            //     <Delete />
            //     </IconButton>
            //   }
            //   key="delete"
            //   label="Delete"
            //   onClick={() => setConfirmDelete({open: true, row})}
            //   table={table}
            // />,
          ]}
            />
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
              <DialogTitle>View Counseling Service Evaluation Form</DialogTitle>
              <DialogContent>
                <MSCounselingServiceEvaluation initialData={editData} onClose={handleClose}/>
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
