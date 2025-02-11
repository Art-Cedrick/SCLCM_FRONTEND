import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  ActiveFormContext,
  formOptions,
} from "../context/SelectedFormProvider";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

const DropdownMenu = ({ pathname }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { setActiveForm } = useContext(ActiveFormContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate(`/psychometrician/psychometrician_forms`);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (form) => {
    setActiveForm(form);
    setAnchorEl(null);

    navigate(`/psychometrician/psychometrician_forms`);
  };


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
    "MS_ImpactEvaluation",
    "MSCounselingServiceEvaluation",
    "SCLCMGUIDANCECLASSEVALUATION"
    
  ];

  const sortedOptions = Array.isArray(formOptions)
    ? [...formOptions].sort(
        (a, b) => customOrder.indexOf(a.value) - customOrder.indexOf(b.value)
      )
    : []; // Fallback if formOptions is not an array

  return (
    <>
      <ListItemButton
        selected={"/psychometrician/psychometrician_forms" === pathname}
        onClick={handleClick}
        sx={{
          width: "100%",
          "&.Mui-selected": {
            backgroundColor: "#ffffff",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            color: "#000",
            "& .MuiListItemIcon-root": {
              color: "#000",
            },
          },
          ...("Forms" === "Dashboard" && { marginTop: "20px" }),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: -25,
            width: 8,
            height: "100%",
            backgroundColor: "#1E90FF",
            visibility: "Forms" === pathname ? "visible" : "hidden",
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
      </ListItemButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          sx: {
            display: "block",
            backgroundColor: "#ffffff",
            color: "#000000",
            width: anchorEl ? anchorEl.offsetWidth : "auto",
          },
        }}
        sx={{
          ml: 15,
        }}
      >
        
        {sortedOptions
          .filter((option) => !["MS_ImpactEvaluationTable", "MSCounselingServiceTable", "SCLCMGCETable"].includes(option.value))
          .map((option) => (
            <MenuItem
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
      </Menu>
    </>
  );
};

export default DropdownMenu;
