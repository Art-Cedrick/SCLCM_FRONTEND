import {
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActiveFormContext,
  formOptions,
} from "../context/SelectedFormProvider";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const ActiveRecordDropdown = ({ pathname }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const { setActiveForm } = useContext(ActiveFormContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    navigate("/psychometrician/psychometrician_records");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (form) => {
    setActiveForm(form);
    setAnchorEl(null);

    navigate("/psychometrician/psychometrician_records");
  };

  return (
    <>
      <ListItemButton
        selected={"/psychometrician/psychometrician_records" === pathname}
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
          ...("Records" === "Dashboard" && { marginTop: "20px" }),
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
          ml: 23,
        }}
      >
        {formOptions.map((option) => {
          return (
            <MenuItem
              key={option.value}
              onClick={() => handleMenuItemClick(option.value)}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ActiveRecordDropdown;
