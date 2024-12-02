import React, { useMemo,useEffect, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { Edit, Delete } from '@mui/icons-material';
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import Kinder from '../Kinder';

const fetchData = async () => {
  const response = await AxiosInstance.get(`/kinder/`);
  console.log(response.data)
  return response.data;
};


const KinderTable = () => {

  const queryClient = useQueryClient();

  const { data: myData = [], isLoading, error, isFetching } = useQuery('kinderData', fetchData);

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
      await AxiosInstance.delete(`/kinder/${row.original.id}/`);
      queryClient.invalidateQueries('kinderData');
      setConfirmDelete({open: false, row: null});
      console.log("Deleted Successfully");
    } catch (error) {
      console.log("Error deleting", error);
    }
  }

  useEffect(() => {
    console.log('Fetching data for Kinder...');
  }, [myData]);
  

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Student Name", size: 150 },
      { accessorKey: "age", header: " Age", size: 150 },
      { accessorKey: "sex", header: "Sex", size: 200 },
      { accessorKey: "dateofbirth", header: "Date of Birth", size: 150 },
      { accessorKey: "address", header: "Address", size: 150 },
      { accessorKey: "pregm", header: "Pre GM", size: 150 },
      {
        accessorKey: "presgm",
        header: "PreSGM",
        size: 200,
      },
      {
        accessorKey: "prefm",
        header: "PreFM",
        size: 200,
      },
      { accessorKey: "presfm", header: "Pre SFM", size: 150 },
      { accessorKey: "presh", header: " Pre SH", size: 150 },
      { accessorKey: "pressh", header: "PreSSH", size: 200 },
      { accessorKey: "presrl", header: "Pre SRL", size: 150 },
      { accessorKey: "preel", header: "Pre EL", size: 150 },
      { accessorKey: "presel", header: "Pre SEL", size: 150 },
      {
        accessorKey: "prec",
        header: "Pre C",
        size: 200,
      },
      { accessorKey: "presc", header: "Pre SC", size: 150 },
      { accessorKey: "prescalesum", header: " Pre Scale Sum", size: 150 },
      { accessorKey: "prestandardscore", header: "Pre Standard Score", size: 200 },
      { accessorKey: "prevarbalint", header: "Pre Verbal Int", size: 150 },
      { accessorKey: "postgm", header: "Post GM", size: 150 },
      { accessorKey: "postsgm", header: "PostSGM", size: 150 },
      {
        accessorKey: "postfm",
        header: "Post FM",
        size: 200,
      },
      { accessorKey: "postsfm", header: "PostSFM", size: 150 },
      { accessorKey: "postsh", header: "Post SH", size: 150 },
      { accessorKey: "postssh", header: "PostSSH", size: 150 },
      { accessorKey: "postrl", header: " Post RL", size: 150 },
      { accessorKey: "postsrl", header: "Post SRL", size: 200 },
      { accessorKey: "postel", header: "Post EL", size: 150 },
      { accessorKey: "postsel", header: "PostSEL", size: 150 },
      { accessorKey: "postc", header: "Post C", size: 150 },
      {
        accessorKey: "postsc",
        header: "Post SC",
        size: 200,
      },
      { accessorKey: "postscalesum", header: "Post Scale Sum", size: 150 },
      { accessorKey: "poststandardscore", header: "Post Standard Score", size: 150 },
      { accessorKey: "postverbalint", header: "Post Verbal Int", size: 150 },
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
              onClick={() => setConfirmDelete({open: true, row})}
              table={table}
            />,
          ]}
            />
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
              <DialogTitle>Edit Kinder Form</DialogTitle>
              <DialogContent>
                <Kinder initialData={editData} onClose={handleClose}/>
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

export default KinderTable;
