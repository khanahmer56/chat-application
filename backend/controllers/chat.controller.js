import e from "express";
import { ALERT, NEW_ATTACHEMENT, REFETCH_CHAT } from "../constants/events.js";
import { getOtherMembers } from "../lib/helper.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";
import { deleteFilesFromCloudinary, emitEvent } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";
import { Message } from "../models/message.model.js";

const newGroupChat = TryCatch(async (req, res) => {
  const { name, members } = req.body;
  if (members.length < 2) {
    return next(new ErrorHandler("Please add members to the group chat", 400));
  }
  const allMembers = [...members, req.user._id];
  const chat = await Chat.create({
    name,
    groupChat: true,
    creator: req.user,
    members: allMembers,
  });
  emitEvent(req, ALERT, allMembers, `${req.user.name} created a group chat`);
  emitEvent(req, REFETCH_CHAT, members);
  res.status(200).json({
    success: true,
    message: "Group chat created successfully",
    chat,
  });
});
const getMyChat = TryCatch(async (req, res) => {
  const chats = await Chat.find({ members: req.user._id }).populate(
    "members",
    "name username avatar"
  );
  const transFormedChat = chats.map((chat) => {
    const otherMember = getOtherMembers(chat.members, req.user);
    return {
      _id: chat._id,
      name: chat?.groupChat ? chat.name : otherMember.name,
      members: chat.members.reduce((acc, member) => {
        if (member._id.toString() !== req.user.toString()) {
          acc.push(member._id);
        }
        return acc;
      }, []),
      groupChat: chat.groupChat,
      creator: chat.creator,
      avatar: chat.groupChat
        ? chat.members.slice(0, 3).map((member) => member.avatar.url)
        : [otherMember.avatar.url],
    };
  });
  return res.status(200).json({
    success: true,
    chats: transFormedChat,
  });
});
const getMyGroup = async (req, res) => {
  const chats = await Chat.find({
    members: req.user,
    groupChat: true,
    creator: req.user,
  }).populate("members", "name avatar");
  const groups = chats.map((chat) => {
    return {
      _id: chat._id,
      name: chat.name,
      groupChat: chat.groupChat,
      avatar: chat.members.slice(0, 3).map((member) => member.avatar.url),
    };
  });
  return res.status(200).json({
    success: true,
    groups,
  });
};
const addMembers = async (req, res, next) => {
  const { chatId, members } = req.body;
  if (members.length < 1) {
    return next(new ErrorHandler("Please add members to the group chat", 400));
  }
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (chat.creator.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You are not authorized to add members", 403));
  }
  const allNewMembersPromie = members.map((i) => User.findById(i, "name"));
  const allNewMembers = await Promise.all(allNewMembersPromie);
  console.log("hiii", allNewMembers);
  const uniqueMembers = allNewMembers.filter(
    (i) => !chat.members.includes(i._id.toString())
  );
  chat.members.push(...uniqueMembers.map((i) => i));
  if (chat.members.length > 100) {
    return next(
      new ErrorHandler("Group chat can't have more than 100 members", 400)
    );
  }
  const allusername = allNewMembers.map((i) => i.name).join(", ");
  emitEvent(
    req,
    ALERT,
    chat.members,
    `${req.user.name} added ${allusername} to the group chat`
  );
  await chat.save();
  return res.status(200).json({
    success: true,
    message: "Members added successfully",
  });
};

const removeMembers = TryCatch(async (req, res, next) => {
  const { userId, chatId } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (chat.creator.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to remove members", 403)
    );
  }
  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (chat.members.length < 4) {
    return next(
      new ErrorHandler("Group chat must have at least 3 members", 400)
    );
  }
  if (!chat.members.includes(userId)) {
    return next(new ErrorHandler("User not a member of the chat", 400));
  }
  chat.members = chat.members.filter((i) => i.toString() !== userId.toString());
  await chat.save();
  emitEvent(req, ALERT, chat.members, `${user.name} has been removed`);
  emitEvent(req, REFETCH_CHAT, chat.members);
  return res.status(200).json({
    success: true,
    message: "Member removed successfully",
  });
});
const leaveGroup = TryCatch(async (req, res, next) => {
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (chat.creator.toString() === req.user._id.toString()) {
    return next(new ErrorHandler("Creator can't leave the group", 400));
  }
  if (!chat.members.includes(req.user._id)) {
    return next(new ErrorHandler("You are not a member of the group", 400));
  }
  chat.members = chat.members.filter(
    (i) => i.toString() !== req.user._id.toString()
  );
  await chat.save();
  emitEvent(req, ALERT, chat.members, `${req.user.name} has left the group`);
  emitEvent(req, REFETCH_CHAT, chat.members);
  return res.status(200).json({
    success: true,
    message: "You have left the group",
  });
});
const sendAttachement = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const files = req.files || [];
  if (files.length < 1) {
    return next(new ErrorHandler("Please upload files", 400));
  }
  if (files.length > 5) {
    return next(new ErrorHandler("You can't upload more than 5 files", 400));
  }

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  const user = await User.findById(req.user._id, "name");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  if (files.length < 1) {
    return next(new ErrorHandler("Please upload files", 400));
  }
  const attachments = ["lol", "lol"];
  const messageForRealTime = {
    content: "",
    attachments,
    sender: {
      _id: user._id,
      name: user.name,
    },
    chat: chatId,
  };
  const messageForDB = {
    content: "",
    attachments,
    sender: req.user._id,
    chat: chatId,
  };
  const message = await Message.create(messageForDB);
  emitEvent(req, NEW_ATTACHEMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });
  // const attachments = files.map((file) => {
  //   return {
  //     url: file.path,
  //     filename: file.filename,
  //   };
  // });
  // chat.messages.push({
  //   sender: req.user._id,
  //   attachments,
  // });
  // await chat.save();
  return res.status(200).json({
    success: true,
    message: "Attachment sent successfully",
    message,
  });
});
const getChat = TryCatch(async (req, res) => {
  if (req.query.populate == "true") {
    const chat = await Chat.findById(req.params.id)
      .populate("members", "name avatar")
      .lean();
    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }
    chat.members = chat.members.map((member) => {
      return {
        _id: member._id,
        name: member.name,
        avatar: member.avatar.url,
      };
    });
    return res.status(200).json({
      success: true,
      chat,
    });
  } else {
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      return next(new ErrorHandler("Chat not found", 404));
    }
    return res.status(200).json({
      success: true,
      chat,
    });
  }
});
const renameGroup = TryCatch(async (req, res, next) => {
  const { name } = req.body;
  const chatId = req.params.id;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (!chat.groupChat) {
    return next(new ErrorHandler("Chat is not a group chat", 400));
  }
  if (chat.creator.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to rename the group", 403)
    );
  }
  chat.name = name;
  await chat.save();

  return res.status(200).json({
    success: true,
    message: "Group renamed successfully",
  });
});
const deleteChat = TryCatch(async (req, res, next) => {
  const { chatId } = req.body;
  const chat = await Chat.findById(chatId);
  if (!chat) {
    return next(new ErrorHandler("Chat not found", 404));
  }
  if (chat.groupChat && chat.creator.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to delete the group", 403)
    );
  }
  const messageWithAttachment = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });
  const public_id = [];
  messageWithAttachment.forEach((message) => {
    message.attachments.forEach((attachment) => {
      public_id.push(attachment.public_id);
    });
  });
  await Promise.all(
    deleteFilesFromCloudinary(public_id),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId })
  );
  emitEvent(req, REFETCH_CHAT, chat.members);
  // await chat.remove();
  return res.status(200).json({
    success: true,
    message: "Group deleted successfully",
  });
});
const getMessages = TryCatch(async (req, res) => {
  const { id } = req.params;
  const { page = 1 } = req.query;
  const limit = 20;
  const [messages, totalMessageCount] = await Promise.all([
    Message.find({ chat: id })
      .populate("sender", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Message.countDocuments({ chat: id }),
  ]);
  const totalPage = Math.ceil(totalMessageCount / limit);

  return res.status(200).json({
    success: true,
    messages,
    totalPage,
  });
});

export {
  newGroupChat,
  getMyChat,
  getMyGroup,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachement,
  getChat,
  renameGroup,
  deleteChat,
  getMessages,
};
