import { user } from "../actions/types";
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
    case user.USER_LOGIN:
      return {
        ...restAction
      };
    case user.USER_LOGOUT:
      return {
        role: "guest"
      };
    default:
      return currentUser;
  }
}

export default userReducer;
