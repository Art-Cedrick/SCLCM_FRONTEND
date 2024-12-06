import { React, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";
import ConferenceFormTable from "./AllForms/Tables/ConferenceFormTable";
import CareerTrackingTable from "./AllForms/Tables/CareerTrackingTable";
import RoutineInterviewTable from "./AllForms/Tables/RoutineInterviewTable";
import IndividualRecordFormTable from "./AllForms/Tables/IndividualRecordFormTable";
import { ActiveFormContext, councilorFormOptions } from "../context/SelectedFormProvider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const Records = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if screen width is less than 768px

  const handleMenuItemClick = (form) => {
    if (isMobile && mobileOpen) {
      setMobileOpen(false); // Close the sidebar on mobile when an item is clicked
    }
    setCouncilorActiveForm(form)
  };

  const { councilorActiveForm, setCouncilorActiveForm, pathname } =
    useContext(ActiveFormContext);

  useEffect(() => {
    setCouncilorActiveForm("individual_record_form");
  }, [pathname]);

  

  return (
    <div>
      <List
      sx={{
        display: "flex", // Makes the list horizontal
        flexDirection: "row", // Ensures items are in a row
        padding: 0, // Removes default padding
      }}
      >
        {councilorFormOptions.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={""}
              selected={item.value === councilorActiveForm}
              onClick={() => handleMenuItemClick(item.value)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#ADD8E6", // White background for selected item
                  borderTopLeftRadius: "10px", // Round only the left side
                  borderBottomLeftRadius: "10px", // Round only the left side
                  borderTopRightRadius: "10px", // Round only the left side
                  borderBottomRightRadius: "10px", // Round only the left side
                  color: "#000", // Change text color to black when selected
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 0,
                  height: "50%",
                  visibility: item.value === councilorActiveForm ? "visible" : "hidden",
                  
                }}
              />
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    fontWeight: "bold",
                    fontFamily: "'Rozha One'",
                    fontSize: "1rem",
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #D3D3D3",
        }}
      />
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
