import { User } from "../models/user.model.js";
import { ErrorHandler } from "../utils/utility.js";
import { TryCatch } from "./error.js";
import jwt from "jsonwebtoken";

const isAuthenticated = TryCatch(async (req, res, next) => {
  const token = req.cookies["chat-token"];

  if (!token) {
    return next(new ErrorHandler("Please login to access this route", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  req.user = user;
  next();
});
const isAdmin = TryCatch(async (req, res, next) => {
  const token = req.cookies["admin-token"];

  if (!token) {
    return next(new ErrorHandler("Only admin can access", 401));
  }
  const decoded = jwt.verify(token, process.env.ADMIN_SECRET_KEY);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  req.user = user;
  next();
});
export { isAuthenticated, isAdmin };
