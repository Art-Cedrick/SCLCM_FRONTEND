import React, { useMemo, useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from "@mui/icons-material";
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import Grade3 from "../Grade3";
import { View } from "lucide-react";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/grade_three/`);
  console.log(response.data);
  return response.data;
};

const Grade3Table = () => {
  // Place hooks inside the component
  const queryClient = useQueryClient();
  const { data: myData = [], isLoading, error, isFetching } = useQuery("grade_threeData", fetchData);

  const [editData, setEdit] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, row: null });

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student Name", size: 150 },
      { accessorKey: "age", header: " Age", size: 150 },
      { accessorKey: "sex", header: "Sex", size: 150 },
      { accessorKey: "gradeLevel", header: "Grade Level", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
     
    ],
    []
  );

  // UseEffect for debugging or additional side effects
  useEffect(() => {
    console.log("Fetching data for Grade Three...");
  }, [myData]);

  // Handling the edit action
  const handleEdit = (row) => {
    setEdit(row.original);
    setOpen(true);
  };

  // Closing the dialog
  const handleClose = () => {
    setEdit(null);
    setOpen(false);
  };

  // Handling the delete action
  const handleDelete = async (row) => {
    try {
      await AxiosInstance.delete(`/grade_three/${row.original.id}/`);
      queryClient.invalidateQueries("grade_threeData");
      setConfirmDelete({ open: false, row: null });
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  };

  // Loading and error states
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
          <MRT_ActionMenuItem
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
          //       <Delete />
          //     </IconButton>
          //   }
          //   key="delete"
          //   label="Delete"
          //   onClick={() => setConfirmDelete({ open: true, row })}
          //   table={table}
          // />,
        ]}
      />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Edit Grade Three Form</DialogTitle>
        <DialogContent>
          <Grade3 initialData={editData} onClose={handleClose} />
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
    </>
  );
};

export default Grade3Table;
