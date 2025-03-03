import express from "express";
import {
  acceptFriendRequest,
  getMyFriends,
  getMyProfile,
  login,
  logout,
  registerUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.controller.js";
import { multerUpload } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validate,
} from "../lib/validator.js";

const app = express.Router();

app.post(
  "/register",
  multerUpload.single("avatar"),
  registerValidator(),
  validate,
  registerUser
);
app.post("/login", loginValidator(), validate, login);

app.get("/me", isAuthenticated, getMyProfile);
app.get("/logout", logout);

app.get("/search", isAuthenticated, searchUser);
app.get(
  "/send-friend-request",
  sendRequestValidator(),
  validate,
  sendFriendRequest
);

app.get("/accept-friend-request", acceptFriendRequest);
app.get("/friends", getMyFriends);

export default app;
