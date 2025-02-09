import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import { Link, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import NotesIcon from "@mui/icons-material/Notes";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem, useMediaQuery } from "@mui/material";
import file from "./images/file.png";  // Assuming file.png is the logo image

const NavBarStudent = React.memo((props) => {
  const { drawerWidth = 260, content } = props;
  const location = useLocation();
  const path = location.pathname;

  const [profileMenuAnchor, setProfileMenuAnchor] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false); // For toggling mobile sidebar
  const [selectedItem, setSelectedItem] = React.useState(path); // Track selected menu item

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("sr_code");
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("middlename");
    localStorage.removeItem("section");
    localStorage.removeItem("year");
    
    window.location.href = "/";
    handleProfileMenuClose();
  };

  const menuItems = [
    { text: "Schedule", icon: <NotesIcon />, link: "/student/studentappointment", sx: { marginTop: "20px" } }, // Added margin-top to Appointment
    { text: "Evaluation", icon: <DashboardIcon />, link: "/student/evaluation" }, // No extra margin needed here
    { text: "Profile", icon: <AssignmentIcon />, link: "/student/individualrecordform" },
  ];

  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if screen width is less than 768px

  // Handle menu item click to update the selected item
  const handleMenuItemClick = (link) => {
    setSelectedItem(link);
    if (isMobile && mobileOpen) {
      setMobileOpen(false); // Close the sidebar on mobile when an item is clicked
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen); // Toggle sidebar visibility on mobile
  };

  const myDrawer = (
      <Box
          sx={{
            backgroundColor: "rgba(5, 21, 54, 255)",
            height: "100vh",
            width: "100%",
            color: "#ffffff",
            position: "relative",
            padding: "0 20px",
          }}
        >
      <Toolbar>
        <img src={file} alt="logo" style={{ width: 60, height: 60, margin: "10px auto 0" }} />
      </Toolbar>
      <Typography
              variant="h6"
              component="div"
              sx={{ 
                color: "#FFFFFF",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontFamily: "'Rozha One'",
                marginTop: "20px",
                marginBottom: "20px",
                fontSize: "0.8rem",
                "&:hover": {
                  color: "#1E90FF",
                  cursor: "pointer",
                  onClick: "/counselor/dashboard"
                },
              }}
            >
              Student Center for Life and Career Management
            </Typography>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              to={item.link}
              selected={item.link === selectedItem}
              onClick={() => handleMenuItemClick(item.link)}
              sx={{
                padding: "10px", // Add padding to selected item
                "&.Mui-selected": {
                  backgroundColor: "#ffffff", // White background for selected item
                  borderTopLeftRadius: "20px", // Round only the left side
                  borderBottomLeftRadius: "20px", // Round only the left side
                  borderTopRighttRadius: "20px", // Round only the left side
                  borderBottomRightRadius: "20px", // Round only the left side
                  color: "#000", // Change text color to black when selected

                  "& .MuiListItemIcon-root": {
                    color: "#000", // Change icon color to black for selected item
                  },
                },
                ...(item.text === "Appointment" && { marginTop: "20px" }), // Apply marginTop only to Appointment
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
                  visibility: item.link === selectedItem ? "visible" : "hidden",
                  borderTopRightRadius: "5px",
                  borderBottomRightRadius: "5px",
                }}
              />
              <ListItemIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} primaryTypographyProps={{ sx: { fontWeight: "bold", fontFamily: "'Rozha One'", fontSize: ".9rem" } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          backgroundColor: "#ffffff",
          boxShadow: "none",
          borderBottom: "1px solid #E0E0E0",
          color: "rgba(5, 21, 54, 255)",
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
                <MenuIcon sx={{ color: "rgba(5, 21, 54, 255)" }} />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "rgba(5, 21, 54, 255)",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontFamily: "'Rozha One'",
                fontSize: "1.25rem",
                "&:hover": {
                  color: "#1E90FF",
                  cursor: "pointer",
                },
              }}
            >
              Student Center for Life and Career Management
            </Typography>
          </Box>
          <Box>
            <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ color: "rgba(5, 21, 54, 255)" }}>
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgba(5, 21, 54, 255)",
            borderRight: "2px solid #ffffff",
          },
        }}
      >
        {myDrawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#ffffff", p: 3, minHeight: "100vh", height: "100%", overflow: "auto" }}>
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
});

export default NavBarStudent;
