import React, { useMemo } from "react";
import { MaterialReactTable } from "material-react-table";

const StudentApplicationTable = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "lastname", header: "Last Name", size: 150 },
      { accessorKey: "auxilliaryname", header: "Auxillary Name", size: 150 },
      { accessorKey: "firstname", header: "FirstName", size: 200 },
      { accessorKey: "middlename", header: "MiddleN Name", size: 150 },
      { accessorKey: "streetnumber", header: "Street Number", size: 150 },
      { accessorKey: "street", header: "Street", size: 150 },
      {
        accessorKey: "subdivision/village",
        header: "Subdivision/Village",
        size: 200,
      },
      { accessorKey: "town", header: "Town", size: 200 },
      { accessorKey: "dateofbirth", header: "Date of Birth", size: 200 },
      { accessorKey: "placeofbirth", header: "Place of Birth", size: 200 },
      { accessorKey: "age", header: "Age", size: 200 },
      { accessorKey: "religion", header: "Religion", size: 200 },
      { accessorKey: "citizenship", header: "Citizenship", size: 200 },
      { accessorKey: "gender", header: "Gender", size: 200 },
      { accessorKey: "nameofschool", header: "Name of School", size: 200 },
      { accessorKey: "schooladdress", header: "School Address", size: 200 },
      { accessorKey: "year/gradelevel", header: "Year/Grade Level", size: 200 },
      {
        accessorKey: "yearofgraduation",
        header: "Year of Graduation",
        size: 200,
      },
      {
        accessorKey: "father'sname",
        header: "Father's Name",
        size: 200,
      },
      {
        accessorKey: "father'soccupation",
        header: "Father's Occupation",
        size: 200,
      },
      {
        accessorKey: "father'stelephonenumber",
        header: "Father's Telephone Number",
        size: 200,
      },
      {
        accessorKey: "father'smobilenumber",
        header: "Father's Mobile Number",
        size: 200,
      },
      {
        accessorKey: "father'semailaddress",
        header: "Father's Email Address",
        size: 200,
      },
      {
        accessorKey: "father'sreligion",
        header: "Father's Religion",
        size: 200,
      },
      {
        accessorKey: "mothers'sname",
        header: "Mother's Name",
        size: 200,
      },
      {
        accessorKey: "mother'soccupation",
        header: "Mother's Occupation",
        size: 200,
      },
      {
        accessorKey: "mother'stelephonenumber",
        header: "Mother's Telephone Number",
        size: 200,
      },
      {
        accessorKey: "mother'smobilenumber",
        header: "Mother's Mobile Number",
        size: 200,
      },
      {
        accessorKey: "mother'semailaddress",
        header: "Mother's Email Address",
        size: 200,
      },
      {
        accessorKey: "mother'sreligion",
        header: "Mother'sReligion",
        size: 200,
      },
      { accessorKey: "name", header: "Name", size: 200 },
      { accessorKey: "relationship", header: "Relationship", size: 200 },
      {
        accessorKey: "landline/mobilephone",
        header: "Landline/ Mobile Phone",
        size: 200,
      },
      { accessorKey: "grade/year", header: "Grade/Year", size: 200 },
      { accessorKey: "school/attended", header: "School/Attended", size: 200 },
      { accessorKey: "location", header: "Location", size: 200 },
      { accessorKey: "academichonors", header: "Academic Honors", size: 200 },
      {
        accessorKey: "clubs/organization",
        header: "Clubs/Organization",
        size: 200,
      },
      { accessorKey: "positionheld", header: "Position Held", size: 200 },
      { accessorKey: "year", header: "Year", size: 200 },
      { accessorKey: "grade/yearlevel", header: "Grade/YearLevel", size: 200 },
      { accessorKey: "nameoftest", header: "Name of Test", size: 200 },
      { accessorKey: "rawscore", header: "Rawscore", size: 200 },
      { accessorKey: "percentilerank", header: "Percentile Rank", size: 200 },
      { accessorKey: "stanine", header: "Stanine", size: 200 },
      {
        accessorKey: "verbalinterpretation",
        header: "Verbal Interpretation",
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

export default StudentApplicationTable;
