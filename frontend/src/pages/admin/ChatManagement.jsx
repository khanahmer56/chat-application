import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import Table from "../../components/Table";
import { Avatar, Stack } from "@mui/material";
import AvatarCard from "../../components/shared/AvatarCard";

const dummyData = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150",
    name: "John Doe",
    totalMembers: 10,
    members: [
      "https://i.pravatar.cc/150",
      "https://i.pravatar.cc/151",
      "https://i.pravatar.cc/152",
      "https://i.pravatar.cc/153",
      "https://i.pravatar.cc/154",
      "https://i.pravatar.cc/155",
      "https://i.pravatar.cc/156",
      "https://i.pravatar.cc/157",
      "https://i.pravatar.cc/158",
      "https://i.pravatar.cc/159",
    ],
    totalmessage: 100,
    creator: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150",
    },
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/151",
    name: "Jane Doe",
    totalMembers: 20,
    members: [
      "https://i.pravatar.cc/150",
      "https://i.pravatar.cc/151",
      "https://i.pravatar.cc/152",
      "https://i.pravatar.cc/153",
      "https://i.pravatar.cc/154",
      "https://i.pravatar.cc/155",
      "https://i.pravatar.cc/156",
      "https://i.pravatar.cc/157",
      "https://i.pravatar.cc/158",
      "https://i.pravatar.cc/159",
    ],
    totalmessage: 100,
    creator: {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150",
    },
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
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      return <Avatar src={params.row.avatar} alt={params.row.name} />;
    },
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => {
      return <AvatarCard max={100} avatar={params.row.members} />;
    },
  },
  {
    field: "totalmessage",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => {
      return (
        <Stack direction="row" spacing={"1rem"} alignItems={"center"}>
          <Avatar
            src={params.row.creator.avatar}
            alt={params.row.creator.name}
          />
          <span>{params.row.creator.name}</span>
        </Stack>
      );
    },
  },
];
const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(dummyData);
  }, []);
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading="All Chats" />
    </AdminLayout>
  );
};

export default ChatManagement;
