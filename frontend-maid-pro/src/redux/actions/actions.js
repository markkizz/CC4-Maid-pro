import { userTypes } from "./types";
import { searchQuickTypes } from "./types"
import { maidIdTypes } from "./types"

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

export const searchHome = () => {
  return {
    type: searchQuickTypes.SEARCH_HOME,
  }
};
export const searchCondo = () => {
  return {
    type: searchQuickTypes.SEARCH_CONDO,
  };
};
export const maidId = (maidId) => {
  return {
    type: maidIdTypes.MAID_ID,
    payload: maidId
  };
};
