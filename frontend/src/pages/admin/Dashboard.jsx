import React from "react";
import AdminLayout from "./AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings,
  Group,
  Message,
  NotificationAdd,
  Person,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/style/Styleomponents";
import { DoughnutChart, LineChart } from "../../components/Charts";

const Dashboard = () => {
  const AppBar = () => {
    return (
      <Paper
        elevation={3}
        sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
      >
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <AdminPanelSettings sx={{ fontSize: "3rem" }} />
          <SearchField />
          <CurveButton>Search</CurveButton>
          <Box flexGrow={1} />
          <Typography>{moment().format("Do MMMM YYYY")}</Typography>
          <NotificationAdd />
        </Stack>
      </Paper>
    );
  };
  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={34} Icon={<Person />} />
      <Widget title={"Chats"} value={34} Icon={<Group />} />
      <Widget title={"Messages"} value={34} Icon={<Message />} />
    </Stack>
  );
  return (
    <AdminLayout>
      <Container>
        {AppBar()}
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          flexWrap={"nowrap"}
          justifyContent={"center"}
          spacing={"2rem"}
          alignItems={{
            xs: "center",
            lg: "stretch",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last Message
            </Typography>
            <LineChart />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: { xs: "100%", sm: "50%" },
              position: "relative",
              maxWidth: "25rem",
              height: "25rem",
            }}
          >
            <DoughnutChart />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"1rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group />
              <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};
const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      sx={{
        padding: "2rem",
        borderRadius: "1rem",
        width: "20rem",
        margin: "2rem 0",
      }}
      elevation={3}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0, 0, 0, 0.8)",
            borderRadius: "50%",
            border: "5px solid rgba(0, 0, 0, 0.8)",
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {Icon && Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
export default Dashboard;
