import { React, useContext, useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import ConferenceFormTable from "./AllForms/Tables/ConferenceFormTable";
import CareerTrackingTable from "./AllForms/Tables/CareerTrackingTable";
import RoutineInterviewTable from "./AllForms/Tables/RoutineInterviewTable";
import IndividualRecordFormTable from "./AllForms/Tables/IndividualRecordFormTable";
import { ActiveFormContext } from "../context/SelectedFormProvider";

const Records = () => {
  const { councilorActiveForm, setCouncilorActiveForm, pathname } =
    useContext(ActiveFormContext);

  useEffect(() => {
    setCouncilorActiveForm("individual_record_form");
  }, [pathname]);

  return (
    <div>
      {/* Render forms based on the selected option from the dropdown */}
      {councilorActiveForm === "individual_record_form" && (
        <IndividualRecordFormTable />
      )}
      {councilorActiveForm === "routine_interview" && <RoutineInterviewTable />}
      {councilorActiveForm === "careertracking" && <CareerTrackingTable />}
      {councilorActiveForm === "conferenceform" && <ConferenceFormTable />}
    </div>
  );
};

export default Records;
