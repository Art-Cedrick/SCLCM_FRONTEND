import React, { useMemo, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { useQuery, useQueryClient } from "react-query";
import { View } from "lucide-react";
import SCLCMGUIDANCECLASSEVALUATION from "../SCLCMGUIDANCECLASSEVALUATION";
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";

const fetchData = async () => {
  const response = await AxiosInstance.get(`/guidance_class_evaluation/`);
  console.log(response.data);
  return response.data;
};

const SCLCMGuidanceClassTable = () => {
  const queryClient = useQueryClient();
  const { data: myData = [], isLoading, error, isFetching } = useQuery(
    "guidanceClassEvaluationData",
    fetchData
  );

  const [viewData, setViewData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleView = (row) => {
    setViewData(row.original);
    setOpen(true);
  };

  const handleClose = () => {
    setViewData(null);
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name", size: 200},
      { accessorKey: "grade", header: "Grade", size: 150},
      { accessorKey: "section", header: "Section", size: 200},
      { accessorKey: "question_1", header: "Question 1", size: 150},
      { accessorKey: "question_2", header: "Question 2", size: 150},
      { accessorKey: "question_3", header: "Question 3", size: 150},
      { accessorKey: "question_4", header: "Question 4", size: 200},
      { accessorKey: "question_5", header: "Question 5", size: 150},
      { accessorKey: "question_6", header: "Question 6", size: 150},
      { accessorKey: "question_7", header: "Question 7", size: 150},
      { accessorKey: "question_8", header: "Question 8", size: 150},
      { accessorKey: "question_9", header: "Question 9" , size: 150},
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
          enableColumnResizing
          enableRowActions
          renderRowActionMenuItems={({ row, table }) => [
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={
              <IconButton>
              <View />
              </IconButton>
            }
              key="edit"
              label="View"
              onClick={() => handleView(row)}
              table={table}
            />,
          ]}
        />
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>View Guidance Class Evaluation Form</DialogTitle>
        <DialogContent>
          <SCLCMGUIDANCECLASSEVALUATION initialData={viewData} onClose={handleClose}/>
        </DialogContent>
      </Dialog>
  </>
  );
};

export default SCLCMGuidanceClassTable;
