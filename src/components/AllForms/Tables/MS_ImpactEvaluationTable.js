import React, { useMemo,useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import MS_ImpactEvaluation from '../MS_ ImpactEvaluation';
import { View } from "lucide-react";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/ms_impactevaluation/`);
  console.log(response.data)
  return response.data;
};

const MS_impactevaluationTable = () => {

  const queryClient = useQueryClient();

  const { data: myData = [], isLoading, error, isFetching } = useQuery('ms_impactevaluationData', fetchData);

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
      await AxiosInstance.delete(`/ms_impactevaluation/${row.original.id}/`);
      queryClient.invalidateQueries('ms_impactevaluationData');
      setConfirmDelete({open: false, row: null});
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  }

  useEffect(() => {
    console.log('Fetching data for Impact Evaluation...');
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "section", header: " Section", size: 150 },
      { accessorKey: "gradelevel", header: "GradeLevel", size: 200 },
      { accessorKey: "improved", header: "Question1", size: 150 },
      { accessorKey: "interests", header: "Question2", size: 150 },
      { accessorKey: "work", header: "Question3", size: 150 },
      {
        accessorKey: "ontime",
        header: "Question4",
        size: 200,
      },
      {
        accessorKey: "careerpaln",
        header: "Question5",
        size: 200,
      },
      { accessorKey: "respectful", header: "Question6", size: 150 },
      { accessorKey: "responsible", header: "Question7", size: 150 },
      { accessorKey: "studyhabits", header: "Question8", size: 200 },
      { accessorKey: "cooperate", header: "Question9", size: 150 },
      { accessorKey: "decided", header: "Question10", size: 150 },
      { accessorKey: "careergoals", header: "Question11", size: 150 },
      {
        accessorKey: "prioritize",
        header: "Question12",
        size: 200,
      },
      { accessorKey: "positive", header: "Question13", size: 150 },
      { accessorKey: "cope", header: "Question14", size: 150 },
      { accessorKey: "attentive", header: "Question15", size: 200 },
      { accessorKey: "selfcontrol", header: "Question16", size: 150 },
      { accessorKey: "aware", header: "Question17", size: 150 },
      { accessorKey: "helpful", header: "Question2.1", size: 150 },
      {
        accessorKey: "meetingneeds",
        header: "Question2.2",
        size: 200,
      },
      { accessorKey: "satisfaction", header: "Question2.3", size: 150 },
      { accessorKey: "unsureno", header: "Question2.4", size: 150 },
      { accessorKey: "activities", header: "Question2.5", size: 150 },
      { accessorKey: "recommendations", header: " Question2,6", size: 150 },
      { accessorKey: "acquainted", header: "Question3.1", size: 200 },
      { accessorKey: "timetosee", header: "Question3.2", size: 150 },
      { accessorKey: "helpfulness", header: "Question3.3", size: 150 },
      { accessorKey: "comfort", header: "Question3.4", size: 150 },
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
              <View />
              </IconButton>
            }
              key="edit"
              label="Edit"
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
              <DialogTitle>View Impact Evaluation Form</DialogTitle>
              <DialogContent>
                <MS_ImpactEvaluation initialData={editData} onClose={handleClose}/>
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


export default MS_impactevaluationTable;
