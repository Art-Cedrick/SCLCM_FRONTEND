import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete, Visibility } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import CareerTracking from "../CareerTracking";
import { FilePlus2 } from "lucide-react";

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

  const handleOpenForm = () => {
    setEdit(null);
    setOpen(true);
  }

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
      { accessorKey: "cle", header: "CLE", size: 150 },
      { accessorKey: "english", header: "English", size: 150 },
      { accessorKey: "filipino", header: "Filipino", size: 150 },
      { accessorKey: "ap", header: "AP", size: 150 },
      { accessorKey: "science", header: "Science", size: 150 },
      { accessorKey: "math", header: "Math", size: 150 },
      { accessorKey: "mapeh", header: "MAPEH", size: 150 },
      { accessorKey: "tle", header: "TLE", size: 150 },
      { accessorKey: "computer", header: "Computer", size: 150 },
      { accessorKey: "fl", header: "Foreign Language", size: 150 },
      {
        accessorKey: "academic_track",
        header: "Academic Track",
        size: 150,
      },
      {
        accessorKey: "other_track",
        header: "Other Track",
        size: 150,
      },
      {
        accessorKey: "tech_voc",
        header: "Technical Vocation",
        size: 150,
      },
      { accessorKey: "other_techvoc", header: "Other Technical Vocation", size: 150 },
      {
        accessorKey: "preferredCourse",
        header: "Preferred Course",
        size: 150,
      },
      {
        accessorKey: "medical_records",
        header: "Medical Records",
        size: 150,
      },
      {
        accessorKey: "specify",
        header: "Specify",
        size: 150,
      },
      { accessorKey: "academic_status", header: "Academic Status", size: 150 },
      { accessorKey: "psych_results", header: "Psychological Test Results", size: 150 },
      { accessorKey: "top_one", header: "Career Recommendation 1", size: 150 },
      { accessorKey: "top_two", header: "Career Recommendation 2", size: 150 },
      { accessorKey: "top_three", header: "Career Recommendation 3", size: 150 },
    ],
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching data...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div style={{
      position: "relative",
    }}>
      <div style={{
        position: "absolute",
        left: 8,
        top: 8,
        zIndex: 2,
        display: "flex",
      }}>
        <Button variant="contained" color="primary" size="small" onClick={handleOpenForm} type="submit"> <FilePlus2 size={14} style={{ marginRight: '6px' }} /> Add NEW</Button>
      </div>

        <MaterialReactTable 
          columns={columns} 
          data={myData} 
          
          enableRowActions
          renderRowActionMenuItems={({ row, table }) => [
            <MRT_ActionMenuItem 
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
              <DialogTitle>Edit Career Tracking Form</DialogTitle>
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
  );
};

export default CareerTrackingTable;
