import { isValidUsername, useStrongPassword } from "6pp";
export const userNameValidator = (username) => {
  if (!isValidUsername(username))
    return { isValid: false, errorMessage: "Username is not valid" };
};
export const passwordValidator = (password) => {
  if (!useStrongPassword(password))
    return { isValid: false, errorMessage: "Password is not valid" };
};
