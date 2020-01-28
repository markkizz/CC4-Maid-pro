import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from './searchReducer'
import maidReducer from './maidReducer'
import maidsReducer from "./maidsReducer";
import bookingReducer from "./bookingReducer"
const reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  maid: maidReducer,
  maids: maidsReducer,
  badge: bookingReducer
});

export default reducer;

