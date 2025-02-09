import React, { useRef } from "react";
import layout from "../components/layout";
import { IconButton, Stack } from "@mui/material";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/style/Styleomponents";
import FileMenu from "../components/FileMenu";
import Messageomponent from "../components/Messageomponent";

const Chat = () => {
  const containerRef = useRef(null);
  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        direction={"column"}
        bgcolor={"gray"}
        height={"90%"}
        sx={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Messageomponent />
      </Stack>
      <form style={{ height: "10%", backgroundColor: "gray" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton>
            <AttachFile />
          </IconButton>
          <InputBox placeholder="Type a message" />
          <IconButton>
            <Send />
          </IconButton>
        </Stack>
      </form>
      <FileMenu />
    </>
  );
};

export default layout()(Chat);
