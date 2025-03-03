import { body, validationResult, check } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const registerValidator = () => [
  body("name").notEmpty().withMessage("Name is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("Password is required"),
  check("avatar").notEmpty().withMessage("Please upload an avatar"),
];

const loginValidator = () => [
  body("username", "Username is required").notEmpty(),
  body("password", "Password is required").notEmpty(),
];

const newGroupChatValidator = () => [
  body("name").notEmpty().withMessage("Name is required"),
  body("members")
    .notEmpty()
    .isArray({ min: 2, max: 100 })
    .withMessage("Please add members to the group chat"),
];
const sendRequestValidator = () => [
  body("receiver").notEmpty().withMessage("Please enter userId"),
];
const validate = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(", ");

  if (errors.isEmpty()) {
    return next();
  } else {
    next(new ErrorHandler(errorMessages, 400));
  }
};
const adminLoginValidator = () => [
  body("secretkey").notEmpty().withMessage("Please enter secretkey"),
];
export {
  registerValidator,
  validate,
  loginValidator,
  newGroupChatValidator,
  sendRequestValidator,
  adminLoginValidator,
};
