import { userTypes, maidTypes, searchTypes, maidsTypes, badgeBookingTypes } from "./types";
import Axios from '../../config/api.service';

const TOKEN = "ACCESS_TOKEN";

export const USER_LOGOUT = 'USER_LOGOUT';

export const login = (user, token) => {
  localStorage.setItem(TOKEN, token);
  const { iat, exp, ...userData } = user;
  return {
    type: userTypes.USER_LOGIN,
    payload: userData
  };
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem('store');
  return {
    type: userTypes.USER_LOGOUT
  };
};

export const selectedMaid = maidId => {
  return {
    type: maidTypes.SELECTED_MAID,
    payload: maidId
  }
};

export const fetchMaids = async () => {
  return {
    type: maidsTypes.FETCH_MAIDS,
    maids: (await Axios.get('/users/maids?limit=6')).data
  }
};

export const quickSearchType = serviceType => {
  return {
    type: searchTypes.QUICK_SEARCH_TYPE,
    payload: serviceType
  }
};

export const filterSearch = data => {
  return {
    type: searchTypes.FILTER_SEARCH,
    payload: data
  }
};
export const increaseNewBookingCouter = () => {
  return {
    type: badgeBookingTypes.INCREASE_NEW_BOOKING_BADGE,
  }
};
export const decreaseNewBookingCouter = () => {
  return {
    type: badgeBookingTypes.DECREASE_NEW_BOOKING_BADGE,
  }
};
