import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addMembers,
  deleteChat,
  getChat,
  getMessages,
  getMyChat,
  getMyGroup,
  leaveGroup,
  newGroupChat,
  removeMembers,
  renameGroup,
  sendAttachement,
} from "../controllers/chat.controller.js";
import { attachementMulter } from "../middlewares/multer.js";
import { newGroupChatValidator, validate } from "../lib/validator.js";

const app = express.Router();

app.use(isAuthenticated);
app.post("/new", newGroupChatValidator(), validate, newGroupChat);
app.get("/my", getMyChat);
app.get("/my/groups", getMyGroup);
app.put("/addmembers", addMembers);
app.put("/removemembers", removeMembers);
app.delete("/leave/:id", leaveGroup);
app.post("/message", attachementMulter, sendAttachement);
app.get("/messages/:id", getMessages);
app.route("/:id").get(getChat).put(renameGroup).delete(deleteChat);

export default app;
