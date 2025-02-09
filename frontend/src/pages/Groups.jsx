import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { memo, useState } from "react";
import { orange } from "../constants/color";
import { KeyboardBackspace, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Link } from "../components/style/Styleomponents";
import AvatarCard from "../components/shared/AvatarCard";

const Groups = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigateback = () => {
    navigate(-1);
  };
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const IconBtns = () => (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            bgcolor: "black",
            color: "#fff",
          }}
          onClick={navigateback}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          bgcolor: "bisque",
        }}
        sm={4}
      >
        <GroupList />{" "}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        <IconBtns />{" "}
      </Grid>
      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <Box>hhbjh</Box>
      </Drawer>
    </Grid>
  );
};

export default Groups;

const GroupList = ({ w = "100%", myGroup = [], chatId }) => {
  return (
    <Stack>
      {myGroup.length > 0 ? (
        myGroup.map((data, index) => (
          <GroupItem group={data} chatId={chatId} key={index} />
        ))
      ) : (
        <Typography textAlign={"center"}>No Group</Typography>
      )}{" "}
    </Stack>
  );
};

const GroupItem = memo(({ group }) => {
  const { name, avatar, chatId, _id } = group;
  return (
    <Link to={`/chat/${_id}`}>
      <Stack>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
