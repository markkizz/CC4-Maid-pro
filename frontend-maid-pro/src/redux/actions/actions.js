import { user } from "./types";

const TOKEN = "ACCESS_TOKEN";

export const login = (userData, token) => {
  localStorage.setItem(TOKEN, token);
  return {
    type: user.USER_LOGIN,
    ...userData
  };
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
  return {
    type: user.USER_LOGOUT
  };
};
