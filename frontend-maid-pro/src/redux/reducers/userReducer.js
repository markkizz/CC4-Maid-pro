import { userTypes } from "../actions/types";
import jwtDecode from "jwt-decode";

const initialState = () => {
  const token = localStorage.getItem("ACCESS_TOKEN");
  if (token) {
    return jwtDecode(token);
  } else {
    return {
      role: "guest"
    };
  }
};

function userReducer(currentUser = initialState(), action) {
  switch (action.type) {
    case userTypes.USER_LOGIN:
      return {
        ...action.payload
      };
    case userTypes.USER_LOGOUT:
      return {
        role: "guest"
      };
    default:
      return currentUser;
  }
}

export default userReducer;
