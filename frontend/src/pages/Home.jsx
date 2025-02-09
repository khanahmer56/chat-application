import React from "react";
import layout from "../components/layout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        bgcolor: "rgba(0, 0, 0, 0.1)",
        height: "100%",
      }}
    >
      <Typography variant="h5" p="2rem" textAlign={"center"}>
        Select a Friend to start chatting
      </Typography>
    </Box>
  );
};

export default layout()(Home);
