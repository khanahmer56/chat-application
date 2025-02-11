import {
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import {
  Add,
  Delete,
  Done,
  Edit,
  KeyboardBackspace,
  Menu,
} from "@mui/icons-material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../components/style/Styleomponents";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
const AddMemberDialog = lazy(() =>
  import("../components/dialog/AddMemberDialog")
);
const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialog/ConfirmDeleteDialog")
);

const Groups = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const chatId = useSearchParams()[0].get("group");
  const [groupName, setGroupName] = useState("Group Name");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);

  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const navigateback = () => {
    navigate(-1);
  };
  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };
  const upgradeGroupName = () => {
    setIsEdit(false);
  };
  useEffect(() => {
    if (chatId) {
      setGroupName("Group Name");
      setGroupNameUpdatedValue("Group Name");
    }
    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);
  const confirmDelete = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfrimDelete = () => {
    setConfirmDeleteDialog(false);
  };
  const onAddMember = () => {};
  const removeHandler = () => {};
  const deleteHandler = () => {};
  const sampleUsers = [];

  const IconBtns = () => (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "1rem",
          right: "1rem",
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <Menu />
        </IconButton>
      </Box>

      <Tooltip title="back">
        <IconButton
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            bgcolor: "black",
            color: "#fff",
          }}
          onClick={navigateback}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"1rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
          />
          <IconButton onClick={() => upgradeGroupName()}>
            <Done />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">Group name</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <Edit />
          </IconButton>
        </>
      )}
    </Stack>
  );
  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        color="error"
        startIcon={<Delete />}
        onClick={confirmDelete}
      >
        Delete Group
      </Button>
      <Button
        size="large"
        variant="contained"
        startIcon={<Add />}
        onClick={onAddMember}
      >
        Add Member
      </Button>
    </Stack>
  );
  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          bgcolor: "bisque",
        }}
        sm={4}
      >
        <GroupList w="50vw" myGroup={[]} chatId={chatId} />{" "}
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        <IconBtns />{" "}
        {groupName && (
          <>
            {GroupName}
            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              bgcolor={"bisque"}
              height={"50vh"}
              overflow={"auto"}
            >
              {sampleUsers?.map((data, index) => (
                <UserItem
                  key={index}
                  user={data}
                  handler={removeHandler}
                  handlerIsloading={false}
                  isAdded={false}
                  styling={{
                    boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRadius: "1rem",
                  }}
                />
              ))}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<div>Loading...</div>}>
          <AddMemberDialog />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <Suspense fallback={<div>Loading..</div>}>
          <ConfirmDeleteDialog
            open={confirmDeleteDialog}
            handleClose={closeConfrimDelete}
            deleteHandler={deleteHandler}
          />
        </Suspense>
      )}
      <Drawer
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <Box>hhbjh</Box>
      </Drawer>
    </Grid>
  );
};

export default Groups;

const GroupList = ({ w = "100%", myGroup = [], chatId }) => {
  return (
    <Stack width={w}>
      {myGroup.length > 0 ? (
        myGroup.map((data, index) => (
          <GroupItem group={data} chatId={chatId} key={index} />
        ))
      ) : (
        <Typography textAlign={"center"}>No Group</Typography>
      )}{" "}
    </Stack>
  );
};

const GroupItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId == _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});
