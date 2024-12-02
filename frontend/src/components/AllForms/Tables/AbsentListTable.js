import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const AbsentListTable = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "grade",
        header: "Grade",
        size: 150,
      },
      {
        accessorKey: "section", // Changed "Section" to "section" for consistency
        header: "Section",
        size: 200,
      },
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

export default AbsentListTable;
