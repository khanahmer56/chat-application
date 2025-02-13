import { Avatar, AvatarGroup, Stack } from "@mui/material";
import React from "react";

const AvatarCard = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup
        max={max}
        sx={{
          position: "relative",
        }}
      >
        {avatar.map((data, index) => (
          <Avatar
            src={data?.src}
            key={index}
            alt={`Avatar ${index}`}
            sx={{
              width: "3rem",
              height: "3rem",
              border: "2px solid white",
              position: "absolute",
              left: {
                xs: `${0.5 + index}rem`,
                sm: `${index}rem`,
              },
            }}
          />
        ))}
      </AvatarGroup>
    </Stack>
  );
};

export default AvatarCard;
