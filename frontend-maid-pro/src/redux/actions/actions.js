import { userTypes } from "./types";

const TOKEN = "ACCESS_TOKEN";

export const login = (user, token) => {
  localStorage.setItem(TOKEN, token);
  return {
    type: userTypes.USER_LOGIN,
    ...user
  };
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
  return {
    type: userTypes.USER_LOGOUT
  };
};
