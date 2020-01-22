import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from './searchReducer'
import maidReducer from './maidReducer'
import maidsReducer from "./maidsReducer";

const reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  maid: maidReducer,
  maids: maidsReducer
});

export default reducer;

