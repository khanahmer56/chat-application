import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import { connectDb } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import adminRoute from "./routes/admin.route.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { NEW_MESSAGE } from "./constants/events.js";
import { getSocket } from "./lib/helper.js";
dotenv.config();
const mongoUri = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const userids = new Map();
connectDb(mongoUri);
// createUsers(10);
const app = express();
const server = createServer(app);
const io = new Server(server, {});
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/chat", chatRoute);
app.use("/admin", adminRoute);
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      }
      socket.user = decoded;
      next();
    });
  } else {
    next(new Error("Authentication error"));
  }
});
io.on("connection", (socket) => {
  socket.on(NEW_MESSAGE, async ({ chatId, members, message, user }) => {
    userids.set(user._id.toString(), socket.id);

    const messageForRealTime = {
      content: message,
      id: new Date().getTime(),
      sender: {
        _id: user._id,
        name: user.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };
    const messageForDB = {
      content: message,
      sender: user._id,
      chat: chatId,
    };
    const userSocket = getSocket(members);
    io.to(userSocket).emit(NEW_MESSAGE, messageForRealTime);
  });
  console.log("Connected to socket.io", socket.id);
  socket.on("disconnect", () => {
    userids.delete(user._id.toString());
    console.log("Disconnected from socket.io", socket.id);
  });
});
app.use(errorMiddleware);
server.listen(PORT, () => {
  console.log("Server is running on port 5000");
});
