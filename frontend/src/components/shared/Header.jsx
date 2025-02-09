import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  NotificationAdd,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const SearchDialog = lazy(() => import("../Search"));
const NotificationDialog = lazy(() => import("../Notification"));
const NewGroupDialog = lazy(() => import("../NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isGroup, setIsGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const handleClick = () => {
    setIsMobile((prev) => !prev);
  };
  const openSearch = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsGroup((prev) => !prev);
  };
  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };
  const logout = () => {};
  const navigateToGroup = () => navigate("/groups");
  return (
    <>
      <Box sx={{ flexGrow: 1, height: "4rem" }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              ChatApp
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "none",
                  justifyContent: "space-between",
                },
                width: "100%",
              }}
            >
              <Tooltip title="Menu">
                <IconButton color="inherit" onClick={handleClick}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Tooltip title="Search">
                <IconButton color="inherit" onClick={openSearch}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="New Group">
                <IconButton color="inherit" onClick={openNewGroup}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage Group">
                <IconButton color="inherit" onClick={() => navigateToGroup()}>
                  <GroupIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notification">
                <IconButton color="inherit" onClick={openNotification}>
                  <NotificationAdd />
                </IconButton>
              </Tooltip>
              <Tooltip title="Logout">
                <IconButton color="inherit" onClick={logout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch ? (
        <Suspense fallback={<div>Loading..</div>}>
          <SearchDialog />
        </Suspense>
      ) : null}
      {isNotification ? (
        <Suspense fallback={<div>Loading..</div>}>
          <NotificationDialog />
        </Suspense>
      ) : null}

      {isGroup ? (
        <Suspense fallback={<div>Loading..</div>}>
          <NewGroupDialog />
        </Suspense>
      ) : null}
    </>
  );
};
export default Header;
