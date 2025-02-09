import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "./shared/ChatItem";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onLineUsers = [],
  newMesssageAlerts = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data, index) => {
        const { _id, name, groupChat, members, avatar } = data;
        const alert = newMesssageAlerts?.find((item) => item.chatId === _id);
        const isOnline = members?.some((member) =>
          onLineUsers.includes(member)
        );
        return (
          <ChatItem
            index={index}
            newMesssageAlerts={alert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChatOpen={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
