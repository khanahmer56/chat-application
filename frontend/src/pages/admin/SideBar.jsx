import { Stack, styled, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { adminTabs } from "../../constants/routes";
import { Logout } from "@mui/icons-material";

const SideBar = ({ w = "100%" }) => {
  const location = useLocation();
  const CustomLink = styled(Link)`
    text-decoration: none;
    color: black;
    padding: 1rem;
    border-radius: 1rem;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  `;
  const logoutHandler = () => {};
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"}>
        ChatApp
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((data, index) => (
          <CustomLink
            key={index}
            to={data.path}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              cursor: "pointer",
              backgroundColor:
                location.pathname == data.path ? "rgba(0, 0, 0, 0.8)" : "",
              color: location.pathname == data.path ? "#fff" : "",
            }}
          >
            {<data.icon />}
            <Typography>{data.name}</Typography>
          </CustomLink>
        ))}
        <CustomLink
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            cursor: "pointer",
          }}
          onClick={logoutHandler}
        >
          <Logout />
          <Typography>Logout</Typography>
        </CustomLink>
      </Stack>
    </Stack>
  );
};

export default SideBar;
