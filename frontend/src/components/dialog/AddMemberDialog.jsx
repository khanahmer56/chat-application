import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import UserItem from "../shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const handler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev?.filter((item) => item !== id) : [...prev, id]
    );
  };
  const sampleUsers = [];

  const handleSubmit = () => {
    closeHanlder();
  };
  const closeHanlder = () => {
    setSelectedMembers([]);
    setMembers([]);
  };
  return (
    <Dialog open onClose={closeHanlder}>
      <DialogTitle>Add Member</DialogTitle>
      <DialogContent>
        <Stack>
          {members.length > 0 ? (
            members?.map((data, index) => (
              <UserItem
                key={index}
                user={data}
                handler={handler}
                handlerIsloading={isLoadingAddMember}
                isAdded={selectedMembers.includes(data._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Members</Typography>
          )}
        </Stack>
      </DialogContent>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Button color="error" onClick={closeHanlder}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Submit Changes
        </Button>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
