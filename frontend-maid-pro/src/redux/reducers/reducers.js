import { combineReducers } from "redux";
import userReducer from "./userReducer";
import searchReducer from './searchReducer'
import maidReducer from './maidReducer'

const reducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  maid: maidReducer
});

export default reducer;

