import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from './searchReducer'
import maidReducer from './maidReducer'
import maidsReducer from "./maidsReducer";
import bookingBadgeReducer from "./bookingReducer"
const reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  maid: maidReducer,
  maids: maidsReducer,
  badge: bookingBadgeReducer
});

export default reducer;

