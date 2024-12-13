import React, { useEffect, useMemo, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import Dayjs from "dayjs";
import { Visibility, Delete } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import AxiosInstance from "../Axios";
import { useQuery, useQueryClient } from "react-query";
import RoutineInterview from "../RoutineInterview";
import { FilePlus2 } from "lucide-react";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/routine_interview/`);
  console.log(response.data);
  return response.data;
};

const RoutineInterviewTable = () => {
  const queryClient = useQueryClient();

  const {
    data: myData = [],
    isLoading,
    error,
    isFetching,
  } = useQuery("routineData", fetchData);

  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    row: null,
  });

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
  };

  const handleDelete = async (row) => {
    try {
      await AxiosInstance.delete(`/routine_interview/${row.original.id}/`);
      queryClient.invalidateQueries("routineData");
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data for Routine Interview...");
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "grade", header: "Grade", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
      {
        accessorFn: (row) => Dayjs(row.date).format("MM-DD-YYYY"),
        header: "Date",
        size: 150,
      },
    ],
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching data...</p>;
  if (error) {
    console.log(error);

    return <p>Error loading data</p>;
  }

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
          <DialogTitle style={{
          fontWeight: "bold",
        }}>
          {editData ? "Routine Interview" : "New Routine Interview"}
        </DialogTitle>
              <DialogContent>
                <RoutineInterview initialData={editData} onClose={handleClose}/>
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

export default RoutineInterviewTable;
