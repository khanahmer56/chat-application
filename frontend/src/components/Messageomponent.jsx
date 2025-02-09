import React, { memo } from "react";
import { lightBlue } from "../constants/color";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { fileFormat } from "../libs/feauture";
import RenderAttachment from "./RenderAttachment";

const Messageomponent = ({ message = {}, user }) => {
  const { sender, content, attachement = [], createdAt } = message;
  const sameSender = user?._id === sender?._id;
  const timeAgo = moment(createdAt).fromNow();
  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: "white",
        color: "black",
        borderRadius: "5px",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography variant="caption" color={lightBlue}>
          {sender.name}
        </Typography>
      )}
      {content && <Typography>{content}</Typography>}
      {attachement?.length > 0 &&
        attachement.map((data, index) => {
          const url = data.url;
          const file = fileFormat(url);
          return (
            <Box key={index}>
              <a href={url} target="_blank" download={file} color="black">
                {RenderAttachment(file, url)}
              </a>
            </Box>
          );
        })}
      <Typography variant="caption" color="gray">
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(Messageomponent);
