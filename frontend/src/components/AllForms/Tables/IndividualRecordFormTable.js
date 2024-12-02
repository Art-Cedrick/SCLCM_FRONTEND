import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import { Edit, Delete } from "@mui/icons-material";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import AxiosInstance from "../Axios";
import IndividualRecordForm from "../IndividualRecordForm";

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
      { accessorKey: "completeAddress", header: "Complete Address", size: 150 },
      { accessorKey: "fatherName", header: "Father Name", size: 150 },
      {
        accessorKey: "fatherOccupation",
        header: "Father Occupation",
        size: 150,
      },
      {
        accessorKey: "fatherContactNumber",
        header: "Father Contact Number",
        size: 150,
      },
      {
        accessorKey: "fatherEmailAddress",
        header: "Father Email Address",
        size: 150,
      },
      { accessorKey: "motherName", header: "Mother Name", size: 150 },
      {
        accessorKey: "motherOccupation",
        header: "Mother Occupation",
        size: 150,
      },
      {
        accessorKey: "motherContactNumber",
        header: "Mother Contact Number",
        size: 150,
      },
      {
        accessorKey: "motherEmailAddress",
        header: "Mother Email Address",
        size: 150,
      },
      { accessorKey: "parents", header: "Parents", size: 150 },
      { accessorKey: "living_with", header: "Living With", size: 150 },
      { accessorKey: "relationship", header: "Relationship", size: 150 },
      {
        accessorKey: "club",
        header: "Club Membership / Position Handled",
        size: 150,
      },
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
          data={data}
          enableRowActions
          renderRowActionMenuItems={({ row, table }) => [
            <MRT_ActionMenuItem
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
          <DialogTitle>Edit Individual Record Form</DialogTitle>
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
    </div>
  );
};

export default IndividualRecordFormTable;
