
import React, { useContext, useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { ActiveFormContext, formOptions } from "../context/SelectedFormProvider";

const DropdownMenu = ({ pathname }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setActiveForm, filteredFormOptions } = useContext(ActiveFormContext);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleMenuItemClick = (form) => {
    // Set the active form and navigate as needed.
    setActiveForm(form);
    setOpen(false); // Optionally close the dropdown after selection
    navigate(`/psychometrician/psychometrician_forms`);
  };

  // Define your custom order
  const customOrder = [
    "kinder",
    "grade_one",
    "grade_two",
    "grade_three",
    "grade_four",
    "grade_five",
    "grade_six",
    "grade_seven",
    "grade_eight",
    "grade_nine",
    "grade_ten",
    "grade_eleven",
    "grade_twelve",
    "first_year",
    "second_year",
    "third_year",
    "fourth_year",
    // "MS_ImpactEvaluation",
    // "MSCounselingServiceEvaluation",
    // "SCLCMGUIDANCECLASSEVALUATION",
  ];

  const sortedOptions = Array.isArray(filteredFormOptions)
    ? [...filteredFormOptions].sort(
        (a, b) => customOrder.indexOf(a.value) - customOrder.indexOf(b.value)
      )
    : [];

  return (
    <>
      <ListItemButton
        onClick={handleToggle}
        selected={pathname === "/psychometrician/psychometrician_forms"}
        sx={{
          padding: "10px",
          "&.Mui-selected": {
            backgroundColor: "#ffffff",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            color: "#000",
            "& .MuiListItemIcon-root": {
              color: "#000",
            },
          },
        }}
      >
        {/* Side indicator */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: -25,
            width: 8,
            height: "100%",
            backgroundColor: "#1E90FF",
            visibility:
              pathname === "/psychometrician/psychometrician_forms"
                ? "visible"
                : "hidden",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        />
        <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText
          primary="Forms"
          primaryTypographyProps={{
            sx: {
              fontWeight: "bold",
              fontFamily: "'Rozha One'",
              fontSize: "1rem",
            },
          }}
        />
        {open ? (
          <ExpandLess sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
        ) : (
          <ExpandMore sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sortedOptions.map((option) => (
            <ListItemButton
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)}
              sx={{
                pl: 4, // indent the dropdown items
                "&.Mui-selected": {
                  backgroundColor: "#ffffff",
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  color: "#000",
                  "& .MuiListItemIcon-root": {
                    color: "#000",
                  },
                },
              }}
            >
              <span style={{ fontSize: "12px" }}>{option.label}</span>
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default DropdownMenu;