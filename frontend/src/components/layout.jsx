import React from "react";
import Header from "./shared/Header";
import Title from "./shared/Title";
import { Grid } from "@mui/material";
import ChatList from "./ChatList";
import { sampleData } from "../constants/sampleData";
import Profile from "./Profile";
const layout = () => (Wrappedomponent) => {
  return (props) => (
    <>
      <Title />
      <Header />
      <Grid container height={"calc(100vh - 4rem)"}>
        <Grid
          sm={4}
          md={3}
          sx={{ display: { xs: "none", sm: "block" } }}
          item
          height={"100%"}
        >
          <ChatList
            chats={sampleData}
            chatId={"21"}
            newMesssageAlerts={[
              {
                chatId: "1",
                count: 4,
              },
            ]}
            onLineUsers={["1", "2"]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          lg={6}
          height={"100%"}
          bgcolor={"primary.main"}
        >
          <Wrappedomponent {...props} />
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            padding: "2rem",
            bgcolor: "rgba(0,0,0,0.85)",
          }}
          height={"100%"}
        >
          <Profile />
        </Grid>
      </Grid>
      <div>footer</div>
    </>
  );
};

export default layout;
