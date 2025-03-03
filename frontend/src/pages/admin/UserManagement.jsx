import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import Table from "../../components/Table";
import { Avatar } from "@mui/material";

const dummyData = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150",
    name: "John Doe",
    username: "johndoe",
    friends: ["Jane Doe", "Alice Smith"],
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/151",
    name: "Jane Doe",
    username: "janedoe",
    friends: ["John Doe", "Alice Smith"],
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/152",
    name: "Alice Smith",
    username: "alicesmith",
    friends: ["John Doe", "Jane Doe"],
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
    width: 150,
  },
  {
    field: "username",
    headerName: "Username",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 150,
  },
];
const UserManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(dummyData);
  }, []);
  return (
    <AdminLayout>
      <Table rows={rows} columns={columns} heading="User Management" />
    </AdminLayout>
  );
};

export default UserManagement;
