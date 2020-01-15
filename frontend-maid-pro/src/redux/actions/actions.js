import { userTypes } from "./types";

const TOKEN = "ACCESS_TOKEN";

export const login = (user, token) => {
  localStorage.setItem(TOKEN, token);
  const { iat, ...userData } = user;
  return {
    type: userTypes.USER_LOGIN,
    payload: userData
  };
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
  return {
    type: userTypes.USER_LOGOUT
  };
};
