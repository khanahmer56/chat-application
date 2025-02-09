import React from "react";
import { transformImage } from "../libs/feauture";
import { FileOpen } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "image":
      return (
        <img
          src={transformImage(url)}
          alt="attachements"
          width={"200px"}
          height={"200px"}
        />
      );
    case "video":
      return <video src={url} preload="none" width={"200px"} controls />;
    case "audio":
      return <audio src={url} />;
    case "file":
      return <a href={url} target="_blank" download></a>;
    default:
      return <FileOpen />;
  }
};

export default RenderAttachment;
