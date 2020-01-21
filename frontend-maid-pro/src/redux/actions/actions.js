import { userTypes, maidTypes, searchTypes } from "./types";

const TOKEN = "ACCESS_TOKEN";

export const USER_LOGOUT = 'USER_LOGOUT';

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


export const selectedMaid = maidId => {
  return {
    type: maidTypes.SELECTED_MAID,
    payload: maidId
  }
}

export const quickSearchType = serviceType => {
  return {
    type: searchTypes.QUICK_SEARCH_TYPE,
    payload: serviceType
  }
}

export const filterSearch = data => {
  return {
    type: searchTypes.FILTER_SEARCH,
    payload: data
  }
}
