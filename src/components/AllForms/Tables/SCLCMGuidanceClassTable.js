import React, { useMemo, useState } from "react";
import { MaterialReactTable, MRT_ActionMenuItem } from "material-react-table";
import AxiosInstance from "../Axios";
import { IconButton, Dialog, DialogContent, DialogTitle, Button } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { View } from "lucide-react";
import SCLCMGUIDANCECLASSEVALUATION from "../SCLCMGUIDANCECLASSEVALUATION";

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
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "grade", header: "Grade", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
      { accessorKey: "question_1", header: "Question 1", size: 150 },
      { accessorKey: "question_2", header: "Question 2", size: 150 },
      { accessorKey: "question_3", header: "Question 3", size: 150 },
      { accessorKey: "question_4", header: "Question 4", size: 200 },
      { accessorKey: "question_5", header: "Question 5", size: 200 },
      { accessorKey: "question_6", header: "Question 6", size: 200 },
      { accessorKey: "question_7", header: "Question 7", size: 200 },
      { accessorKey: "question_8", header: "Question 8", size: 200 },
      { accessorKey: "question_9", header: "Question 9", size: 200 },
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
              <DialogTitle>View Counseling Service Evaluation Form</DialogTitle>
              <DialogContent>
                <SCLCMGUIDANCECLASSEVALUATION initialData={viewData} onClose={handleClose}/>
              </DialogContent>
            </Dialog>
      </div>
    </div>
  );
};

export default SCLCMGuidanceClassTable;
