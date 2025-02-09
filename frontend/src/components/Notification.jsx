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
import React from "react";

const Notification = () => {
  const sampleNotification = [];
  const handler = () => {};
  return (
    <Dialog open>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        direction={"column"}
        width={"25rem"}
      >
        <DialogTitle textAlign={"center"}>Notification</DialogTitle>
        {sampleNotification.length > 0 ? (
          sampleNotification.map((data, index) => (
            <NotificationItem
              key={index}
              sender={data.sender}
              _id={data._id}
              handler={handler}
            />
          ))
        ) : (
          <Typography> No notification</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default Notification;

const NotificationItem = ({ sender, _id, handler }) => {
  const { avatar, name } = sender;
  return (
    <ListItem>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        width={"100%"}
        spacing={"1rem"}
      >
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            overflow: "hidden",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack
          spacing={"1rem"}
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button size="small" onClick={() => handler({ _id, accept: true })}>
            Accept
          </Button>
          <Button
            color="error"
            size="small"
            onClick={() => handler({ _id, accept: false })}
          >
            Decline
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
};
