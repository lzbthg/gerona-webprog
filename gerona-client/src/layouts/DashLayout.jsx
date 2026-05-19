import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme} from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";

import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";

import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArticleIcon from "@mui/icons-material/Article";

const drawerWidth = 240;

const dashboardNavItems = [
  {
    label: "Dashboard",
    title: "Dashboard",
    to: "/dashboard",
    icon: DashboardIcon,
  },
  {
    label: "Reports",
    title: "Reports",
    to: "/dashboard/reports",
    icon: AssessmentIcon,
  },
  {
    label: "Users",
    title: "Users",
    to: "/dashboard/users",
    icon: PeopleIcon,
  },
  {
    label: "Articles",
    title: "Articles",
    to: "/dashboard/articles",
    icon: ArticleIcon,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "999px",
  backgroundColor: "#FFF8F0",
  border: "1px solid #E5D3B8",

  "&:hover": {
    backgroundColor: "#FFFDF9",
  },

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getPageTitle = (pathname) =>
  dashboardNavItems.find(({ to }) => to === pathname)?.title ?? "Welcome";

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userType = storedUser?.type;

  useEffect(() => {
    if (!storedUser) {
      navigate("/auth/signin");
    }
  }, [navigate, storedUser]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    navigate("/auth/signin");
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        {/* App Bar */}
        {/* <AppBar position="fixed" open={open}> */}
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "#FFFDF9",
            color: "#3E2C23",
            borderBottom: "1px solid #E5D3B8",
            boxShadow: "0 4px 20px rgba(139,94,60,0.06)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              // onClick={!open}
              onClick={open ? handleDrawerClose : handleDrawerOpen}
              edge="start"
              // sx={{ marginRight: 5, ...(open && { display: 'none' }) }}
              sx={{ marginRight: 5, ...open }}
            >
              {open ? <MenuOpenIcon /> : <MenuIcon />}
            </IconButton>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              {pageTitle}
            </Typography>

            {/* Search */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{
                borderRadius: "12px",
                textTransform: "none",
                fontWeight: 700,
                bgcolor: "#8B5E3C",
                color: "#FFFDF9",
                boxShadow: "none",

                "&:hover": {
                  bgcolor: "#6F472D",
                  boxShadow: "none",
                },
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            "& .MuiDrawer-paper": {
              bgcolor: "#FFF3E6",
              borderRight: "1px solid #E5D3B8",
              color: "#3E2C23",
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>

          <Divider />

          {/* Drawer List */}
          <List>
            {dashboardNavItems
              .filter((item) => {
                // HIDE USERS PAGE FOR EDITORS
                if (userType === "editor" && item.to === "/dashboard/users") {
                  return false;
                }

                return true;
              })
              .map(({ label, to, icon: Icon }) => (
                <ListItem key={to} disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    component={Link}
                    to={to}
                    selected={location.pathname === to}
                    sx={{
                      minHeight: 48,
                      px: 2.5,
                      justifyContent: open ? "initial" : "center",
                      borderRadius: "14px",
                      mx: 1,
                      my: 0.5,
                      color: location.pathname === to ? "#8B5E3C" : "#5A4B3A",
                      bgcolor: location.pathname === to ? "#F2E4D5" : "transparent",

                      "&:hover": {
                        bgcolor: "#F7EBDD",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        color: location.pathname === to ? "#8B5E3C" : "#7C9A6D",
                        justifyContent: "center",
                      }}
                    >
                      {Icon && <Icon />}
                    </ListItemIcon>

                    <ListItemText
                      primary={label}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
          </List>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            bgcolor: "#FFF8F0",
            minHeight: "100vh",
          }}
        >
          <DrawerHeader />

          {/* Content */}
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default DashLayout;
