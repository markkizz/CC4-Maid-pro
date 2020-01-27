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
      const user = action.payload
      const {type} = user
      const role = type==='MAID' ? 'maid' : 'user'
      return {
        ...user,
        role
      };
    case userTypes.USER_LOGOUT:
      window.appHistory.push('/login')
      return {
        role: "guest"
      };
    default:
      return currentUser;
  }
}

export default userReducer;

