import React, { useContext, useState } from "react";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { ActiveFormContext, formOptions } from "../context/SelectedFormProvider";

const ActiveRecordDropdown = ({ pathname }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { setActiveForm } = useContext(ActiveFormContext);

  const handleToggle = () => {
    setOpen((prev) => !prev);
    // Optionally, you can navigate to the records page immediately on toggle:
    // navigate("/psychometrician/psychometrician_records");
  };

  const handleMenuItemClick = (form) => {
    setActiveForm(form);
    setOpen(false); // Close the dropdown after selection
    navigate("/psychometrician/psychometrician_records");
  };

  return (
    <>
      <ListItemButton
        onClick={handleToggle}
        selected={pathname === "/psychometrician/psychometrician_records"}
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
              pathname === "/psychometrician/psychometrician_records"
                ? "visible"
                : "hidden",
            borderTopRightRadius: "5px",
            borderBottomRightRadius: "5px",
          }}
        />
        <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
          <FileCopyIcon />
        </ListItemIcon>
        <ListItemText
          primary="Records"
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
          {formOptions.map((option) => (
            <ListItemButton
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)}
              sx={{
                pl: 4, // Indentation for sub-items
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

export default ActiveRecordDropdown;