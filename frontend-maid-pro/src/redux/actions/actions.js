// import { userTypes, maidTypes, searchTypes, maidsTypes, badgeBookingTypes, } from "./types";
import * as type from './types'
import Axios from '../../config/api.service';

const TOKEN = "ACCESS_TOKEN";

export const USER_LOGOUT = 'USER_LOGOUT';

export const login = (user, token) => {
  localStorage.setItem(TOKEN, token);
  const { iat, exp, ...userData } = user;
  return {
    type: type.userTypes.USER_LOGIN,
    payload: userData
  };
};

export const logout = () => {
  localStorage.removeItem(TOKEN);
  localStorage.removeItem('store');
  return {
    type: type.userTypes.USER_LOGOUT
  };
};

export const selectedMaid = maidId => {
  return {
    type: type.maidTypes.SELECTED_MAID,
    payload: maidId
  }
};

export const fetchMaids = async () => {
  return {
    type: type.maidsTypes.FETCH_MAIDS,
    maids: (await Axios.get('/users/maids?limit=6')).data
  }
};

export const quickSearchType = serviceType => {
  return {
    type: type.searchTypes.QUICK_SEARCH_TYPE,
    payload: serviceType
  }
};

export const filterSearch = data => {
  return {
    type: type.searchTypes.FILTER_SEARCH,
    payload: data
  }
};

export const increaseNewBookingCounter = numberOfBooking => {
  return {
    type: type.bookingTypes.INCREASE_NEW_BOOKING_BADGE,
    payload: numberOfBooking
  }
};

export const decreaseNewBookingCounter = () => {
  return {
    type: type.bookingTypes.DECREASE_NEW_BOOKING_BADGE,
  }
};

export const recieveMyBookingData = (upcomming, history) => {
  return {
    type: type.bookingTypes.MYBOOKING,
    payload: {
      upcomming,
      history
    }
  }
}




// * THUNK ACTION

export const thunk_action_mybooking = userType => (dispatch, getState) => {
  console.log('inside thunk action')
  const employersBookingPath = "/bookings/employers"
  const maidBookingPath = "/bookings/maids/"
  let path;
  if (userType === "EMPLOYER") {
    path = employersBookingPath
  } else if (userType === "MAID") {
    path = maidBookingPath
  }
  try {
    const { data } = await axios.get(path);
    const {upcomming, history} = filterUserStatus(data)
    dispatch(recieveMyBookingData(upcomming, history))
  } catch (err) {
    console.error(err);
  }
}


// * UTILS

function filterUserStatus(user) {
  let filterData = {
    upcomming: [],
    history: []
  }
  users.forEach(user => {
    if (
      user.status === "REJECT" ||
      user.status === "CANCEL" ||
      user.status === "FINISHED"
    ) {
      filterData.history.push(user);
    } else {
      filterData.upcomming.push(user);
    }
  });
  return filterData
}
