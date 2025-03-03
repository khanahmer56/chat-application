import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import Table from "../../components/Table";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { fileFormat } from "../../libs/feauture";
import RenderAttachment from "../../components/RenderAttachment";

const dummyData = [
  {
    id: 1,
    attachment: ["https://i.pravatar.cc/150"],
    content: "Hello",
    sender: "https://i.pravatar.cc/151",
    name: "John Doe",
    chat: "https://i.pravatar.cc/152",
    groupsChat: "https://i.pravatar.cc/153",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-01",
  },
];
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachment",
    headerName: "Attachement",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachment } = params.row;
      if (attachment?.length > 0) {
        return (
          attachment &&
          attachment?.map((url) => {
            const urls = url.url;
            const file = fileFormat(urls);
            return (
              <Box>
                <a href={urls} target="_blank" download={file} color="black">
                  {RenderAttachment(file, urls)}
                </a>
              </Box>
            );
          })
        );
      }
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      return (
        <Stack>
          <Avatar src={params.row.avatar} alt={params.row.name} />
          <Typography>{params.row.name}</Typography>
        </Stack>
      );
    },
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupsChat",
    headerName: "Groups Chat",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 200,
  },
];
const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(dummyData);
  }, []);

  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading={"All Messages"} />
    </AdminLayout>
  );
};

export default MessageManagement;
