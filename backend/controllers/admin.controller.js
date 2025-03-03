import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";

const adminLogin = TryCatch(async (req, res) => {
  const { secretkey } = req.body;
  if (secretkey !== process.env.ADMIN_SECRET_KEY) {
    return next(new ErrorHandler("Invalid secret key", 401));
  }
  const token = jwt.sign(secretkey, process.env.JWT_SECRET);
  res
    .status(200)
    .cookie("admin-token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Admin logged in successfully",
    });
});
const adminLogout = TryCatch(async (req, res) => {
  res.cookie("admin-token", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Admin logged out successfully",
  });
});
const allusers = TryCatch(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    success: true,
    users,
  });
  const transformedUsers = await Promise.all(
    users.map(async (user) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: user._id }),
        Chat.countDocuments({ groupChat: false, members: user._id }),
      ]);
      return {
        _id: user._id,
        name: user.name,
        username: user.username,
        avatar: user.avatar.url,
        groups,
        friends,
      };
    })
  );
});
const allChats = TryCatch(async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async (chat) => {
      return {
        _id,
        name: chat.name,
        creator: {
          name: chat.creator.name || "No name",
          avatar: chat.creator.avatar.url || "",
        },
        avatar: chat.members.slice(0, 3).map((member) => member.avatar.url),
        members: chat.members.map((member) => {
          return {
            _id: member._id,
            name: member.name,
            avatar: member.avatar.url,
          };
        }),
      };
    })
  );
  res.status(200).json({
    success: true,
    transformedChats,
  });
});
const getAllMessage = TryCatch(async (req, res) => {
  const messages = await Message.find
    .populate("sender", "name avatar")
    .populate("chat", "name members");
  const transFormedMessages = messages.map((message) => {
    return {
      _id: message._id,
      attachements: message.attachements,
      content: message.content,
      createdAt: message.createdAt,
      chat: message.chat._id,
      groupChat: message.chat.groupChat,
      sender: {
        _id: message.sender._id,
        name: message.sender.name,
        avatar: message.sender.avatar.url,
      },
    };
  });
  res.status(200).json({
    success: true,
    transFormedMessages,
  });
});
const getDashBoarddata = TryCatch(async (req, res) => {
  const [groupCount, userCount, messageCount, totalchatCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);
  const today = new Date();
  const lastSevenDay = new Date(today.setDate(today.getDate() - 7));
  const lastSevenDayMessage = await Message.find({
    createdAt: { $gte: lastSevenDay, $lte: today },
  }).select("createdAt");
  const messages = new Array(7).fill(0);
  const dayInMilliseconds = 1000 * 60 * 60 * 24;
  lastSevenDayMessage.forEach((message) => {
    const day =
      (today.getTime() - message.createdAt.getTime()) / dayInMilliseconds;
    const index = Math.floor(day);

    messages[6 - index]++;
  });
  res.status(200).json({
    success: true,
    groupCount,
    userCount,
    messageCount,
    totalchatCount,
  });
});
const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});
export {
  allusers,
  allChats,
  getAllMessage,
  adminLogin,
  adminLogout,
  getDashBoarddata,
  getAdminData,
};
