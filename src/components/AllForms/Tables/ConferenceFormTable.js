import React, { useMemo, useState, useEffect } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import Dayjs from "dayjs";
import { useQuery, useQueryClient } from "react-query";
import ConferenceForm from "../ConferenceForm";
import { FilePlus2 } from "lucide-react";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/conferenceform/`);
  console.log(response.data)
  return response.data;
};

const ConferenceTable = () => {

  const queryClient = useQueryClient();

  const { data: myData = [], isLoading, error, isFetching } = useQuery('conferenceData', fetchData);

  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, row: null });


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
      await AxiosInstance.delete(`/conferenceform/${row.original.id}/`);
      queryClient.invalidateQueries('conferenceData');
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  }

  useEffect(() => {
    console.log('Fetching data for Conference Form...')
  }, [myData]);

  const columns = useMemo(


    () => [
      { accessorKey: "type", header: "Type of Conference", size: 150 },
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorFn: (row) => Dayjs(row.date).format('MM-DD-YYYY'), header: "Date", size: 150 },
      { accessorKey: "grade", header: "Grade", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
      { accessorKey: "teachers", header: "Name of Teacher/s or Parent/s", size: 150 },
      { accessorKey: "purpose", header: "Purpose of Conference", size: 150 },
      { accessorKey: "others", header: "Others", size: 150 },
      { accessorKey: "note", header: "Counselor's Note", size: 150 },
      { accessorKey: "recommendations", header: "Recommendations", size: 150 },
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
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={
              <IconButton>
                <Edit />
              </IconButton>
            }
            key="edit"
            label="Edit"
            table={table}
            onClick={() => handleEdit(row)}
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
        }}>{editData ? "Edit Conference" : "New Conference"}</DialogTitle>
        <DialogContent>
          <ConferenceForm initialData={editData} onClose={handleClose} />
        </DialogContent>
      </Dialog>

      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, row: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this record?</p>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
            <Button variant="outlined" onClick={() => setConfirmDelete({ open: false, row: null })}>
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

export default ConferenceTable;
