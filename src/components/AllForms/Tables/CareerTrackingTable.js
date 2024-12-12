import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import CareerTracking from "../CareerTracking";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/careertracking/`);
  console.log(response.data)
  return response.data;
};

const CareerTrackingTable = () => {

  const queryClient = useQueryClient();

  const { data: myData = [], isLoading, error, isFetching } = useQuery('careertrackingData', fetchData);

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
      await AxiosInstance.delete(`/careertracking/${row.original.id}/`);
      queryClient.invalidateQueries('careertrackingData');
      setConfirmDelete({open: false, row: null});
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  }

  useEffect(() => {
    console.log('Fetching data for Career Tracking...');
  }, [myData]);
  

  const columns = useMemo(

    () => [

      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "grade", header: "Grade", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
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
        overflowX: "auto",
      }}
    >
      <div style={{ width: "1200px", height: "600px" }}>
        <MaterialReactTable 
          columns={columns} 
          data={myData} 
          
          enableRowActions
          renderRowActionMenuItems={({ row, table }) => [
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={
              <IconButton>
              <Visibility />
              </IconButton>
            }
              key="view"
              label="View"
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
              <DialogTitle>Career Tracking Form</DialogTitle>
              <DialogContent>
                <CareerTracking initialData={editData} onClose={handleClose}/>
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

export default CareerTrackingTable;
