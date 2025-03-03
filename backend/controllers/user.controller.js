import { TryCatch } from "../middlewares/error.js";
import { User } from "../models/user.model.js";
import { emitEvent, sendToken } from "../utils/features.js";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../utils/utility.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { NEW_MESSAGE_ALERT, REFETCH_CHAT } from "../constants/events.js";
const registerUser = TryCatch(async (req, res) => {
  const { name, username, password, avatar } = req.body;
  console.log(req.body);
  const user = await User.create({
    name: name,
    username: username,
    password: password,
    avatar,
  });
  sendToken(res, user, 200, "User registered successfully");
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid credentials", 401));
  }
  sendToken(res, user, 200, "User logged in successfully");
});

const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});
const logout = (req, res) => {
  res.cookie("chat-token", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
const searchUser = TryCatch(async (req, res) => {
  const { name } = req.query;
  console.log(req.user._id);
  const users = await Chat.find({
    groupChat: false,
    members: req.user._id,
  });
  const allChats = users.map((chat) => chat.members).flat();
  const allUserExceptMyFrience = await User.find({
    _id: { $nin: allChats },
    name: { $regex: name, $options: "i" },
  });
  const allUsers = allUserExceptMyFrience.map((user) => {
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      avatar: user.avatar.url,
    };
  });
  res.status(200).json({
    success: true,
    allUsers,
  });
});
const sendFriendRequest = TryCatch(async (req, res, next) => {
  const { userId } = req.body;
  const request = Request.findOne({
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id },
    ],
  });
  if (request) {
    return next(new ErrorHandler("Request already sent", 400));
  }
  await Request.create({
    sender: req.user._id,
    receiver: userId,
  });
  emitEvent(req, NEW_MESSAGE_ALERT, [userId]);
  res.status(200).json({
    success: true,
    message: "Request sent successfully",
  });
});
const acceptFriendRequest = TryCatch(async (req, res, next) => {
  const { requestId, accept } = req.body;
  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");
  if (!request) {
    return next(new ErrorHandler("Request not found", 404));
  }
  if (request.receiver._id.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized", 401));
  }
  if (!accept) {
    await request.deleteOne();
    return res.status(200).json({
      success: true,
      message: "Request rejected successfully",
    });
  }
  const chat = await Chat.create({
    name: request.sender.name,
    members: [request.sender._id, req.user._id],
  });
  await Request.findByIdAndDelete(requestId);
  emitEvent(req, REFETCH_CHAT, [chat.members]);
  res.status(200).json({
    success: true,
    message: "Request accepted successfully",
    senderId: request.sender._id,
  });
});
const notification = TryCatch(async (req, res) => {
  const requests = await Request.find({ receiver: req.user._id }).populate(
    "sender",
    "name avatar"
  );
  const allRequests = requests.map((request) => {
    return {
      _id: request._id,
      name: request.sender.name,
      avatar: request.sender.avatar.url,
    };
  });
  res.status(200).json({
    success: true,
    allRequests,
  });
});
const getMyFriends = TryCatch(async (req, res) => {
  const chatId = req.query.chatId;
  const chat = await Chat.find({
    members: req.user._id,
    groupChat: false,
  }).populate("members", "name avatar");
  const allFriends = chat.map((chat) => {
    return {
      _id: chat._id,
      name: chat.members.name,
      avatar: chat.members.avatar.url,
    };
  });
  if (chatId) {
    const chat = await Chat.findById(chatId);
    const avilableFriends = chat.members.filter(
      (member) => !chat.members.includes(member._id)
    );
    return res.status(200).json({
      success: true,
      allFriends: avilableFriends,
    });
  } else {
    res.status(200).json({
      success: true,
      allFriends,
    });
  }
});
export {
  registerUser,
  login,
  getMyProfile,
  logout,
  searchUser,
  sendFriendRequest,
  acceptFriendRequest,
  notification,
  getMyFriends,
};
