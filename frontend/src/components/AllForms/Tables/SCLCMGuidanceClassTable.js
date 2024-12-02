import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const SCLCMGuidanceClassTable = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name", size: 150 },
      { accessorKey: "grade", header: "Grade", size: 150 },
      { accessorKey: "section", header: "Section", size: 150 },
      { accessorKey: "date", header: "Date", size: 200 },
      { accessorKey: "one", header: "Question 1", size: 150 },
      { accessorKey: "two", header: "Question 2", size: 150 },
      { accessorKey: "three", header: "Question 3", size: 150 },
      { accessorKey: "four", header: "Question 4", size: 200 },
      { accessorKey: "five", header: "Question 5", size: 200 },
      { accessorKey: "six", header: "Question 6", size: 200 }, // Corrected accessorKey
    ],
    []
  );

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
        <MaterialReactTable columns={columns} data={[]} />
      </div>
    </div>
  );
};

export default SCLCMGuidanceClassTable;
