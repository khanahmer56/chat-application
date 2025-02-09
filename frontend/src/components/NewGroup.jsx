import { useInputValidation } from "6pp";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "./shared/UserItem";

const NewGroup = () => {
  const groupName = useInputValidation("");
  const users = [];
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev?.filter((item) => item !== id) : [...prev, id]
    );
  };
  const submitHandler = () => {};
  return (
    <Dialog open>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        direction={"column"}
        width={"25rem"}
      >
        <DialogTitle textAlign={"center"}>New Group</DialogTitle>
        <TextField
          value={groupName.value}
          onChange={groupName.changeHandler}
          label="Group Name"
        />
        <Typography variant="body1">Members</Typography>
      </Stack>
      {members?.map((data, index) => (
        <UserItem
          key={index}
          user={data}
          handler={handler}
          handlerIsloading={false}
          isAdded={selectedMembers.includes(data._id)}
        />
      ))}
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
        <Button onClick={submitHandler} variant="text">
          Create
        </Button>
        <Button onClick={handler} variant="text" color="error">
          Cancel
        </Button>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
