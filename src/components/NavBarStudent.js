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
import file from "./images/file.png"; // Assuming file.png is your logo image

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
    window.location.href = "/";
    handleProfileMenuClose();
  };

  const menuItems = [
    {
      text: "Schedule",
      icon: <NotesIcon />,
      link: "/student/studentappointment",
      sx: { marginTop: "20px" },
    },
    {
      text: "Evaluation",
      icon: <DashboardIcon />,
      link: "/student/evaluation",
    },
    {
      text: "Profile",
      icon: <AssignmentIcon />,
      link: "/student/individualrecordform",
    },
  ];

  const isMobile = useMediaQuery("(max-width: 768px)"); // Check if screen width is less than 768px

  // Update the selected item and close mobile sidebar if needed
  const handleMenuItemClick = (link) => {
    setSelectedItem(link);
    if (isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const myDrawer = (
    <Box
      sx={{
        backgroundColor: "rgba(5, 21, 54, 1)",
        height: "100vh",
        color: "#ffffff",
        position: "relative",
      }}
    >
      <Toolbar>
        <img
          src={file}
          alt="logo"
          style={{ width: 60, height: 60, margin: "10px auto 0" }}
        />
      </Toolbar>
      <Typography
        variant="h6"
        component="div"
        sx={{
          color: "#FFFFFF",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontFamily: "'Rozha One'",
          fontSize: "0.8rem",
          "&:hover": {
            color: "#1E90FF",
            cursor: "pointer",
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
                "&.Mui-selected": {
                  backgroundColor: "#ffffff", // White background for selected item
                  borderTopLeftRadius: "20px",
                  borderBottomLeftRadius: "20px",
                  // borderTopRightRadius: "20px", // Fixed typo here
                  // borderBottomRightRadius: "20px", // Fixed typo here
                  color: "#000", // Black text when selected
                  "& .MuiListItemIcon-root": {
                    color: "#000", // Black icon for selected item
                  },
                },
                ...(item.text === "Schedule" && { marginTop: "20px" }),
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
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  sx: { fontWeight: "bold", fontFamily: "'Rozha One'", fontSize: "1rem" },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const getTitle = () => {
    switch (path) {
      case "/student/studentappointment":
        return "Schedule";
      case "/student/evaluation":
        return "Evaluation";
      case "/student/individualrecordform":
        return "Profile";
      default:
        return "Student Center for Life and Career Management";
    }
  };

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
          color: "rgba(5, 21, 54, 1)",
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                color="inherit"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon sx={{ color: "rgba(5, 21, 54, 1)" }} />
              </IconButton>
            )}
            <Typography
              variant="h6"
              component="div"
              sx={{
                color: "rgba(5, 21, 54, 1)",
                textTransform: "uppercase",
                letterSpacing: 1.5,
                fontFamily: "'Rozha One'",
                fontSize: "1.25rem",
              }}
            >
              {getTitle()}
            </Typography>
          </Box>
          <Box>
            <IconButton
              color="inherit"
              onClick={handleProfileMenuOpen}
              sx={{ color: "rgba(5, 21, 54, 1)" }}
            >
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
            backgroundColor: "rgba(5, 21, 54, 1)",
            borderRight: "2px solid #ffffff",
          },
        }}
      >
        {myDrawer}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#ffffff",
          p: 3,
          minHeight: "100vh",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Toolbar />
        {content}
      </Box>
    </Box>
  );
});

export default NavBarStudent;
