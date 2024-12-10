import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import Grade4 from '../Grade4';

const fetchData = async () => {
  const response = await AxiosInstance.get(`/grade_four/`);
  console.log(response.data)
  return response.data;
};

const Grade4Table = () => {

  const queryClient = useQueryClient();

  const { data: myData = [], isLoading, error, isFetching } = useQuery('grade_fourData', fetchData);

  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, row: null })

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
      await AxiosInstance.delete(`/grade_four/${row.original.id}/`);
      queryClient.invalidateQueries('grade_fourData');
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  }

  useEffect(() => {
    console.log('Fetching data for Grade Four...');
  }, [myData]);

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student Name", size: 150 },
      { accessorKey: "age", header: "Age", size: 150 },
      { accessorKey: "sex", header: "Sex", size: 200 },
      { accessorKey: "gradeLevel", header: "Grade Level", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
      { accessorKey: "conduct", header: "Conduct", size: 150 },
      { accessorKey: "self_image", header: "Self Image", size: 200 },
      { accessorKey: "worry", header: "Worry", size: 200 },
      { accessorKey: "neg_perl_rel", header: "Neg.Perl.Rel", size: 200 },
      { accessorKey: "antisocial", header: "AntiSocial", size: 200 },
      { accessorKey: "lie", header: "Lie", size: 200 },
      { accessorKey: "problem_index", header: "Problem Index", size: 200 },
      { accessorKey: "c", header: "C", size: 200 },
      { accessorKey: "si", header: "SI", size: 200 },
      { accessorKey: "w", header: "W", size: 200 },
      { accessorKey: "npr", header: "NPR", size: 200 },
      { accessorKey: "a_s", header: "AS", size: 200 },
      { accessorKey: "l", header: "L", size: 200 },
      { accessorKey: "pi", header: "PI", size: 200 },
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
            onClick={() => setConfirmDelete({ open: true, row })}
            table={table}
          />,
        ]}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Grade Four Form</DialogTitle>
        <DialogContent>
          <Grade4 initialData={editData} onClose={handleClose} />
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
    </>
  );
};

export default Grade4Table;
