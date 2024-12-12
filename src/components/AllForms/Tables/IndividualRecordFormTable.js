import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import { Visibility, Delete } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Input,
  TextField,
  Paper
} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import AxiosInstance from "../Axios";
import IndividualRecordForm from "../IndividualRecordForm";
import { FilePlus2 } from "lucide-react";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/individual_record_form/`);
  console.log(response.data);
  return response.data;
};

const IndividualRecordFormTable = () => {

  const queryClient = useQueryClient();

  const { data, isLoading, error, isFetching } = useQuery(
    "IRFData",
    fetchData
  );

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

  const handleOpenForm = () => {
    setEdit(null);
    setOpen(true);
  }

  const handleClose = () => {
    setEdit(null);
    setOpen(false);
  };

  const handleDelete = async (row) => {
    try {
      await AxiosInstance.delete(`/individual_record_form/${row.original.id}/`);
      queryClient.invalidateQueries("IRFData");
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  useEffect(() => {
    console.log("Fetching data for Individual Record...");
  }, [data]);

  const columns = useMemo(
    () => [
      { accessorKey: "sr_code", header: "Student Number", size: 150 },
      { accessorKey: "lastname", header: "Last Name", size: 150 },
      { accessorKey: "firstname", header: "First Name", size: 150 },
      { accessorKey: "middlename", header: "Middle Name", size: 150 },
      { accessorKey: "year", header: "Year", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
    ],
    []
  );

  if (isLoading) return <p>Loading...</p>;
  if (isFetching) return <p>Fetching data...</p>;
  if (error) {
    console.dir(error);

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
        <Button variant="contained"  color="primary" size="small" type="submit" onClick={handleOpenForm}> <FilePlus2 size={14} style={{ marginRight: '6px' }} /> Add NEW</Button>
      </div>

      <MaterialReactTable
        columns={columns}
        data={data}
        component={{
          Container: props => <Paper {...props} elevation={0} />
        }}
        enableRowActions
        renderRowActionMenuItems={({ row, table }) => [
          <MRT_ActionMenuItem
            icon={
              <IconButton>
                <Visibility />
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
        <DialogTitle style={{
          fontWeight: "bold",
        }}>
          {editData ? "Edit Individual Record" : "New Individual Record"}
        </DialogTitle>
        <DialogContent>
          <IndividualRecordForm
            initialData={editData}
            onClose={handleClose}
          />
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
  );
};

export default IndividualRecordFormTable;
