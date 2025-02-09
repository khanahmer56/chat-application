import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIdIcon,
} from "@mui/icons-material";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"I am a web developer"} Icon={""} />
      <ProfileCard
        heading={"UserName"}
        text={"ahmer"}
        Icon={<UserNameIcon />}
      />
      <ProfileCard heading={"Name"} text={"Ahmer Khan"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={"12/15/2009"}
        Icon={<CalendarIdIcon />}
      />
    </Stack>
  );
};

export default Profile;

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}
    >
      {Icon && Icon}
      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color="#fff" variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};
